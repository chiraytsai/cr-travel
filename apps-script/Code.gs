/**
 * 北海道家庭旅遊共用工具（Apps Script）
 * Google Sheets 已建立於個人雲端硬碟。
 * 使用前請從 Google 試算表「擴充功能 → Apps Script」建立專案。
 * 部署：網頁應用程式、以自己身分執行。
 *
 * 注意：若設定為「所有人」可存取，知道此 Web App 網址的人都可操作資料。
 * 不可於工作表中放置護照、密碼或完整保單資料。
 */
const SPREADSHEET_ID = '1Bt8Tyz0pdofJpRpIIRUFvhhC8IQxT2GDHbISiAUTfXk';
const MAX_ROWS = 1000;
const MAX_WRITES_PER_MINUTE = 50;
const TABLES = Object.freeze({
  expenses: {name: 'Expenses', width: 9, deletedIndex: 8},
  wishlist: {name: 'Wishlist', width: 6, deletedIndex: 5},
  checklist: {name: 'Checklist', width: 6, deletedIndex: 5}
});

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('北海道家庭共用工具')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function getSharedData() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  return {
    expenses: readTable_(ss.getSheetByName('Expenses'), TABLES.expenses).map(function (r) {
      return {id: String(r[0]), date: String(r[1]), name: String(r[2]),
        yen: Number(r[3]), buyer: String(r[4]), rate: Number(r[5]),
        twd: Number(r[6]), updatedAt: String(r[7])};
    }),
    wishes: readTable_(ss.getSheetByName('Wishlist'), TABLES.wishlist).map(function (r) {
      return {id: String(r[0]), name: String(r[1]), buyer: String(r[2]),
        purchased: isTrue_(r[3]), updatedAt: String(r[4])};
    }),
    checks: readTable_(ss.getSheetByName('Checklist'), TABLES.checklist).map(function (r) {
      return {id: String(r[0]), text: String(r[1]), owner: String(r[2]),
        done: isTrue_(r[3]), updatedAt: String(r[4])};
    }),
    fetchedAt: new Date().toISOString()
  };
}

function saveExpense(payload) {
  return withWriteLock_(function (ss) {
    const name = safeText_(payload && payload.name, 80, '商品名稱');
    const yen = Number(payload && payload.yen);
    const rate = Number(payload && payload.rate);
    const buyer = validBuyer_(payload && payload.buyer, false);
    if (!Number.isInteger(yen) || yen < 1 || yen > 10000000) {
      throw new Error('日圓金額必須為 1～10,000,000 的整數。');
    }
    if (!Number.isFinite(rate) || rate < 0.001 || rate > 2) {
      throw new Error('請先設定有效的日圓匯率。');
    }
    const inputId = validId_(payload && payload.id);
    const sheet = ss.getSheetByName('Expenses');
    const existing = inputId ? findRow_(sheet, inputId) : -1;
    if (inputId && existing < 0) throw new Error('找不到原始紀錄，請重新整理。');
    const oldDate = existing > 0 ? sheet.getRange(existing, 2).getDisplayValue() : '';
    const id = inputId || Utilities.getUuid();
    const date = oldDate || Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy-MM-dd');
    const values = [id, date, name, yen, buyer, rate, Math.round(yen * rate),
      new Date().toISOString(), false];
    writeRow_(sheet, existing, values);
    logChange_(ss, 'Expenses', id, inputId ? 'update' : 'create');
    return {id: id, success: true};
  });
}

function saveWish(payload) {
  return withWriteLock_(function (ss) {
    const name = safeText_(payload && payload.name, 80, '伴手禮名稱');
    const buyer = validBuyer_(payload && payload.buyer, true);
    const id = validId_(payload && payload.id) || Utilities.getUuid();
    const sheet = ss.getSheetByName('Wishlist');
    const existing = payload && payload.id ? findRow_(sheet, id) : -1;
    if (payload && payload.id && existing < 0) throw new Error('找不到原始紀錄，請重新整理。');
    const values = [id, name, buyer, payload && payload.purchased === true,
      new Date().toISOString(), false];
    writeRow_(sheet, existing, values);
    logChange_(ss, 'Wishlist', id, existing > 0 ? 'update' : 'create');
    return {id: id, success: true};
  });
}

function saveCheck(payload) {
  return withWriteLock_(function (ss) {
    const task = safeText_(payload && payload.text, 100, '待辦事項');
    const owner = validBuyer_(payload && payload.owner, true);
    const id = validId_(payload && payload.id) || Utilities.getUuid();
    const sheet = ss.getSheetByName('Checklist');
    const existing = payload && payload.id ? findRow_(sheet, id) : -1;
    if (payload && payload.id && existing < 0) throw new Error('找不到原始紀錄，請重新整理。');
    const values = [id, task, owner, payload && payload.done === true,
      new Date().toISOString(), false];
    writeRow_(sheet, existing, values);
    logChange_(ss, 'Checklist', id, existing > 0 ? 'update' : 'create');
    return {id: id, success: true};
  });
}

function removeItem(type, id) {
  return withWriteLock_(function (ss) {
    const table = TABLES[type];
    if (!table) throw new Error('不支援此類資料操作。');
    const safeId = validId_(id);
    if (!safeId) throw new Error('紀錄編號不正確。');
    const sheet = ss.getSheetByName(table.name);
    const rowIndex = findRow_(sheet, safeId);
    if (rowIndex < 0) throw new Error('找不到紀錄，請重新整理。');
    sheet.getRange(rowIndex, table.deletedIndex + 1).setValue(true);
    const updatedColumn = type === 'expenses' ? 8 : 5;
    sheet.getRange(rowIndex, updatedColumn).setValue(new Date().toISOString());
    logChange_(ss, table.name, safeId, 'soft_delete');
    return {id: safeId, success: true};
  });
}

/** 以下為內部輔助函式，結尾底線使其無法由 google.script.run 直接呼叫。 */
function readTable_(sheet, config) {
  if (!sheet) throw new Error('找不到工作表：' + config.name);
  const n = sheet.getLastRow() - 1;
  if (n > MAX_ROWS) throw new Error('資料筆數已超過網站上限。');
  if (n <= 0) return [];
  return sheet.getRange(2, 1, n, config.width).getValues().filter(function (r) {
    return String(r[0]).trim() !== '' && !isTrue_(r[config.deletedIndex]);
  });
}

function withWriteLock_(callback) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) throw new Error('目前有其他家人正在儲存，請稍後重試。');
  try {
    throttle_();
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    return callback(ss);
  } finally {
    lock.releaseLock();
  }
}

function throttle_() {
  const cache = CacheService.getScriptCache();
  const key = 'write-' + Math.floor(Date.now() / 60000);
  const count = Number(cache.get(key) || 0);
  if (count >= MAX_WRITES_PER_MINUTE) throw new Error('短時間操作過多，請稍後再試。');
  cache.put(key, String(count + 1), 75);
}

function findRow_(sheet, id) {
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return -1;
  if (lastRow - 1 > MAX_ROWS) throw new Error('資料筆數超出限制。');
  const ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  for (let i = 0; i < ids.length; i++) {
    if (String(ids[i][0]) === id) return i + 2;
  }
  return -1;
}

function writeRow_(sheet, existing, row) {
  if (existing > 0) {
    sheet.getRange(existing, 1, 1, row.length).setValues([row]);
    return;
  }
  if (sheet.getLastRow() - 1 >= MAX_ROWS) throw new Error('儲存筆數已達上限。');
  sheet.appendRow(row);
}

function logChange_(ss, table, recordId, action) {
  // 審計紀錄不保存商品內容，避免在日誌留下不必要的個人資料。
  try {
    const sheet = ss.getSheetByName('ChangeLog');
    if (!sheet) return;
    sheet.appendRow([Utilities.getUuid(), new Date().toISOString(),
      table, recordId, action, '']);
  } catch (e) {
    console.warn('寫入變更日誌失敗：' + e.message);
  }
}

function isTrue_(v) {
  return v === true || String(v).toLowerCase() === 'true';
}

function validBuyer_(value, allowEmpty) {
  const buyer = String(value === undefined || value === null ? '' : value);
  if (allowEmpty && buyer === '') return '';
  if (['dad', 'mom', 'child'].indexOf(buyer) === -1) {
    throw new Error('請選擇正確的家庭成員。');
  }
  return buyer;
}

function validId_(value) {
  if (value === undefined || value === null || value === '') return '';
  const id = String(value);
  if (!/^[A-Za-z0-9-]{3,90}$/.test(id)) throw new Error('紀錄編號不正確。');
  return id;
}

function safeText_(value, maxLength, label) {
  const text = String(value === undefined || value === null ? '' : value).trim();
  if (!text || text.length > maxLength || /[\u0000-\u001f\u007f]/.test(text)) {
    throw new Error(label + '不可空白，且不得超過 ' + maxLength + ' 字。');
  }
  // 防止表單內容被 Google Sheets 視為公式。
  if (/^[=+\-@]/.test(text)) {
    throw new Error(label + '不可用公式符號開頭。');
  }
  return text;
}
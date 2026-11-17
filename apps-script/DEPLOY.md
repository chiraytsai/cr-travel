# Google Sheets 家庭共用功能：部署與驗收

## 目前狀態

- 網站主體：GitHub Pages（`index.html` / `app.js` / `styles.css`）。
- 共用資料庫：[北海道家庭旅遊共用資料庫](https://docs.google.com/spreadsheets/d/1Bt8Tyz0pdofJpRpIIRUFvhhC8IQxT2GDHbISiAUTfXk/edit)。
- 已準備 Apps Script 源碼：[`Code.gs`](./Code.gs)、[`Index.html`](./Index.html)。
- **Apps Script 尚未由 Google 帳號擁有者部署；主網站目前仍為本機版購物／清單。**

## 一次性部署操作（由 Google 帳號本人操作）

1. 開啟上述 Google 試算表。
2. 選取上方 **擴充功能 → Apps Script**，開啟與試算表綁定的 Apps Script 編輯器。
3. 將專案命名為「北海道家庭旅遊共用工具」。
4. 打開 `Code.gs`；刪除預設示範內容，貼上本儲存庫 `apps-script/Code.gs` 的**完整原始碼**。
   - 若在 GitHub 複製，先按 **Raw**，再全選複製。
5. 在左側「檔案」旁按 **＋ → HTML**，檔名輸入 **Index**。
6. 將本儲存庫 `apps-script/Index.html` 的**完整原始碼**貼到此 HTML 檔，取代預設內容。
7. **儲存專案**。選擇上方函式 `getSharedData` → 按 **執行**，完成 Google 授權。
   - 授權前請檢查所要求的 Google 權限；這是你自行建立的 Apps Script，不要將密碼貼給任何人。
   - 成功返回資料代表已能存取這份試算表（不代表手機端已通過驗收）。
8. 點右上角 **部署 → 新增部署作業 → 網頁應用程式**。
9. 設定：
   - **執行身分：我（擁有者）**。
   - **誰可以存取：任何人（Anyone）**；此設定讓家人免登入，但**任何取得網址的人也可讀寫這份共用資料**。請勿在試算表存放證件、密碼或其他敏感資訊。
10. 按 **部署**，複製產生的 **網頁應用程式 /exec 網址**。

> 若 Google Workspace 管理員不允許對「任何人」公開發布，請不要硬繞過管理政策。可改為登入式方案，並告知我實際可選的存取權限。

## 建議的實際驗收

| 步驟 | 預期結果 |
| --- | --- |
| 1. 手機 A 打開 /exec 網址 | 三個功能分頁成功顯示；原有 11 項出發前待辦可以讀取 |
| 2. 手機 A 新增購物品項「測試音樂盒」、價格 ¥500，選爸爸 | 顯示已儲存，Google Sheets `Expenses` 新增一行 |
| 3. 手機 B 開同一 /exec 網址並按重新整理 | 可以看到「測試音樂盒」與台幣換算 |
| 4. 手機 B 勾選一項出發清單 | 手機 A 重新整理後出現相同狀態 |
| 5. 編輯與移除測試紀錄 | 可修改；移除後介面消失，但 Sheets `deleted` 欄為 TRUE |
| 6. 中斷網路嘗試儲存 | 顯示儲存失敗，不誤報成功 |
| 7. 開啟 Google Sheets | `Expenses`、`Wishlist`、`Checklist` 欄位順序不變 |

請刪除測試商品或改用測試命名；不要把測試記帳留在正式消費總額內。

## 部署成功後的下一步

**僅提供 /exec 公開網址即可，不提供帳號密碼。** 我會將 GitHub Pages 既有「購物」及「清單」頁面改為前往共用工具，並保留 GitHub 主網站作為每日行程與景點導覽的主要入口。

這是現階段最簡單、且可實際測試的做法：`google.script.run` 必須在 Apps Script HTML Service 網頁內使用，不能直接搬到 GitHub Pages 內執行。

若未來修改 Code.gs 或 Index.html，需在 Apps Script「管理部署作業 → 編輯 → 新版本」再部署，不能只修改 GitHub 檔案就期待 Apps Script 自動更新。

## 安全與資料說明

- 不要求個人 Google 帳號密碼。
- 前端不提供任意指定試算表 ID、工作表名稱或任意範圍的寫入 API。
- 僅允許三種資料操作：購物、想買清單與待辦。
- 寫入有長度／金額驗證、簡易頻率限制、多人寫入鎖定，刪除為軟刪除。
- **以上不是認證機制。** 開放存取代表取得網址的人可讀寫資料。僅靠保密網址無法確保安全。
- 若發現非預期內容，可至 Apps Script「管理部署作業」暫停或取消部署，再利用 Sheets 版本記錄及 ChangeLog 排查。

## 技術限制

Google Apps Script 的 `google.script.run` 只存在於其 HTML Service 頁面；GitHub Pages 的 JavaScript 無法直接使用。故這版以 GitHub 作為旅遊資訊首頁、Apps Script 作為購物／清單頁面。等完成實際驗收後，再決定是否需要更深度的同頁整合。

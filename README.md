# 北海道家庭白色聖誕旅遊網站

五福旅行團：`CTS05IT26D22K01`  
日期：2026-12-22 至 2026-12-26  
狀態：**GitHub Pages 主站已串接 Apps Script 共用工具入口；跨裝置同步尚待實機驗收**

## 網站內容

- 今日：旅行倒數、當日重點、快速入口。
- 行程：五天景點、背景故事、旅遊提醒、Google Maps 導航。
- 購物：JPY/TWD 換算（Frankfurter 參考匯率）、購物記錄、想買清單。
- 清單：出發前準備與家庭待辦。
- 資訊：虎航航班、行李額度、飯店與領隊待確認項、日語小卡。

### 重要限制
- 主選單「購物」與「清單」現在開啟 Google Apps Script 雲端共用工具；主站原本的瀏覽器 `localStorage` 試用紀錄不會自動搬到 Google Sheets，也不會自動刪除。
- 讀取不到 Frankfurter 匯率時可以手動輸入，請確認資料日期。參考匯率不是銀行實際成交價。
- 飯店、領隊、集合時刻尚未確定。函館聖誕點燈、洞爺湖燈光隧道與札幌聖誕市集屬自由前往，不能當成旅行社保證項目。
- Google Drive 相簿連結尚未設定。
- 旅遊網站是**公開靜態頁面**，請勿上傳帳號密碼、護照號碼、完整保單等敏感資訊。

## GitHub Pages 發布

1. 進入此儲存庫的 **Settings → Pages**。
2. 在 **Build and deployment** 設為 **Deploy from a branch**。
3. 選擇 **main**、**/(root)**，按 **Save**。
4. GitHub 建置成功後，從 Pages 設定頁面的實際網址開啟網站。

## 下一階段

- 實機檢查行程與手機版介面。
- 驗證 Google Apps Script 網頁實際存取及跨裝置購物／待辦同步，排除任何權限或部署錯誤。
- 設定 Drive 相簿及領隊／飯店資訊。
- 加入最小限度的輸入驗證與資料備份。

詳見 [PROJECT_SPEC.md](PROJECT_SPEC.md)。


## 已完成的 Google Sheets 共用模組（尚待本人部署）

- 後端：[`apps-script/Code.gs`](apps-script/Code.gs)
- 共用網頁：[`apps-script/Index.html`](apps-script/Index.html)
- **安裝步驟與雙手機測試：[`apps-script/DEPLOY.md`](apps-script/DEPLOY.md)**

以上程式已提交 GitHub，使用既有的 Google Sheets 資料庫：
[北海道家庭旅遊共用資料庫](https://docs.google.com/spreadsheets/d/1Bt8Tyz0pdofJpRpIIRUFvhhC8IQxT2GDHbISiAUTfXk/edit)。

已通過程式語法與模擬資料讀寫測試，使用者已提供 /exec 網址，GitHub 主站的「購物／清單」入口已改至雲端頁面；**尚未在兩支手機完成真實同步驗收**。雲端頁面的初始分頁是「購物紀錄」，若要查看待辦請再選「家庭待辦」。

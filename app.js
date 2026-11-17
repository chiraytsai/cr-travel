'use strict';
/* 白色聖誕・溫暖旅程｜純靜態旅行網站，行前清單與匯率偏好僅存本機。 */
const DAYS = [
  {date:'2026-12-22',weekday:'週二',label:'登別・溫泉',subtitle:'高雄飛往新千歲，走進火山與溫泉鄉',stops:[
    {name:'高雄小港機場 → 新千歲機場',status:'安排',brief:'台灣虎航 IT260，08:00 起飛、12:55 抵達（各地當地時間）。',story:'台灣與日本時差一小時，日本時間比台灣快一小時。',map:'新千歲機場'},
    {name:'登別地獄谷',status:'安排',brief:'感受火山地熱、蒸氣與溫泉湧出的景觀；冬季步道可能結冰。',story:'地獄谷是火山活動留下的爆裂火口遺跡，周圍噴氣孔與熱泉構成登別溫泉的自然源頭。',map:'登別地獄谷'},
    {name:'登別溫泉',status:'安排',brief:'入住溫泉區飯店；極樂通商店街、閻王變臉秀可視時間自由前往。',story:'登別的「鬼」文化源自地獄谷意象，鬼雕像已成為當地的象徵。',map:'登別溫泉'}
  ]},
  {date:'2026-12-23',weekday:'週三',label:'函館・夜景',subtitle:'海洋公園、歐風街道、聖誕燈飾與百萬夜景',stops:[
    {name:'登別尼克斯海洋公園',status:'安排',brief:'北歐風城堡與海洋動物；實際表演場次依園方公告。',story:'園區以北歐城堡外觀打造水族館，企鵝遊行是深受家庭旅客喜愛的體驗。',map:'登別尼克斯海洋公園'},
    {name:'函館元町教會群',status:'安排',brief:'沿著有坡道的街區欣賞異國建築，冬天路面濕滑。',story:'函館是日本早期對外開放的港口之一，西方文化留下教堂、領事館與歷史街景。',map:'函館元町教會群'},
    {name:'金森紅磚倉庫群',status:'安排',brief:'函館港邊的歷史倉庫與商店；聖誕嘉年華及霓虹彩燈僅在時間許可時自由前往。',story:'老倉庫見證函館港的貿易年代。海上巨型聖誕樹是當地冬季的重要象徵。',map:'金森紅磚倉庫',extra:'聖誕活動非保證停留；如希望看18:00煙火，須先與領隊確認。'},
    {name:'函館山纜車夜景',status:'天候影響',brief:'欣賞兩側海灣與城市燈火；強風或纜車停駛可能取消。',story:'函館的城市地形狹長，從山頂可看到左右海灣夾著燈火的經典構圖。',map:'函館山纜車'}
  ]},
  {date:'2026-12-24',weekday:'週四',label:'大沼・洞爺湖',subtitle:'平安夜的湖泊、火山與冬季光影',stops:[
    {name:'函館朝市',status:'安排',brief:'海鮮、昆布與地方美食；集合時間內選購即可。',story:'朝市在戰後逐步成為函館重要的海鮮與農產品集散地。',map:'函館朝市'},
    {name:'五稜郭公園',status:'不上塔',brief:'參觀星形城郭地面園區，不包含展望塔門票。',story:'五稜郭採西洋式星形防禦設計，也是幕末箱館戰爭的重要史蹟。',map:'五稜郭公園'},
    {name:'大沼國定公園',status:'安排',brief:'欣賞駒岳、湖泊與雪景；不可自行踏上結冰湖面。',story:'火山活動塑造了湖泊與眾多小島，形成北海道人氣自然景觀。',map:'大沼國定公園'},
    {name:'昭和新山熊牧場',status:'安排',brief:'含熊餅乾或蘋果餵食體驗，依園方規則操作。',story:'北海道棕熊是島上具有代表性的野生動物；此處為圈養展示園區。',map:'昭和新山熊牧場'},
    {name:'昭和新山',status:'安排',brief:'觀察近代形成的火山山體，勿跨越安全界線。',story:'昭和新山在1940年代由地面隆起形成，是有目擊紀錄的年輕火山。',map:'昭和新山'},
    {name:'洞爺湖溫泉',status:'安排',brief:'夜宿溫泉區；冬季夢幻燈光隧道是自由前往活動。',story:'洞爺湖是火山活動形成的湖泊，周邊有溫泉與火山地形。',map:'洞爺湖溫泉',extra:'燈光隧道不屬於保證帶隊景點；需確認實際飯店位置。'}
  ]},
  {date:'2026-12-25',weekday:'週五',label:'小樽・札幌',subtitle:'聖誕節逛小樽與札幌，晚餐自由安排',stops:[
    {name:'SAIRO 展望台',status:'安排',brief:'俯瞰洞爺湖與中島；雪霧可能影響能見度。',story:'這裡可從高處觀察洞爺湖的火山地形與湖心島嶼。',map:'洞爺湖 SAIRO 展望台'},
    {name:'免稅店',status:'安排',brief:'團體安排的自由購物站，可依需要購物。',story:'比價時可先用工具頁換算日圓與台幣。',map:'北海道免稅店'},
    {name:'小樽運河',status:'僅途經',brief:'旅行社行程寫「途經」，未保證下車拍照。',story:'小樽曾是北海道的重要商港，沿岸老倉庫保留了昔日的港口風貌。',map:'小樽運河'},
    {name:'小樽音樂盒堂・北一硝子館',status:'安排',brief:'挑選音樂盒與玻璃工藝品，易碎物品應妥善包裝。',story:'小樽因港口貿易與工藝發展而聞名，音樂盒與玻璃製品如今是地方紀念品代表。',map:'小樽音樂盒堂'},
    {name:'小樽甜點巡禮',status:'安排',brief:'北菓樓泡芙、六花亭、LeTAO；泡芙缺貨時改贈等值甜點。',story:'北海道乳製品資源與甜點工藝讓小樽成為知名甜點城市。',map:'小樽 LeTAO'},
    {name:'札幌購物與自由晚餐',status:'安排',brief:'百貨公司或狸小路散策。白色燈節與慕尼黑聖誕市集須自行掌握時間前往。',story:'札幌與德國慕尼黑有姊妹市交流，因而有冬季慕尼黑聖誕市集。',map:'札幌大通公園',extra:'12/25 為聖誕節，先確認晚間是否有時間到市集；自由活動請遵守團體集合規範。'}
  ]},
  {date:'2026-12-26',weekday:'週六',label:'札幌・返台',subtitle:'北海道神宮與回程航班',stops:[
    {name:'大通公園',status:'安排',brief:'札幌市區散策；依實際集合安排停留。',story:'大通公園貫穿札幌市中心，是城市主要公共空間之一。',map:'札幌大通公園'},
    {name:'北海道神宮',status:'可能替代',brief:'若遇年末交通管制無法進入，旅行社可能改走札幌二条市場。',story:'北海道神宮與北海道近代開拓史密切相關。',map:'北海道神宮'},
    {name:'新千歲機場 → 高雄小港機場',status:'安排',brief:'台灣虎航 IT261，13:55 起飛、18:05 抵達（各地當地時間）。',story:'托運行李每人每程20公斤，若要加購重量應依旅行社及航空公司規定辦理。',map:'新千歲機場'}
  ]}
];
// 以下為北海道及日本官方觀光／歷史資料補充，與旅行社行程安排分開呈現。
const HISTORY_NOTES = {
  "高雄小港機場 → 新千歲機場": {
    "topic": "北海道的空中門戶如何誕生",
    "paragraphs": [
      "千歲與航空的緣分可追溯至1926年。當地居民出力整建降落場，迎接飛機飛抵千歲；這是北海道航空史的重要起點。之後航空運輸逐步取代部分長途海陸交通，讓日本各地與北海道之間的往來更便利。",
      "今日使用的新千歲機場於1988年啟用，1992年啟用新的航廈大樓。旅程從這裡展開，也可把它視為北海道從交通邊陲逐漸走向國際觀光的重要象徵。"
    ],
    "source": "https://www.hokkaido-airports.com/en/new-chitose/business/airport/about/"
  },
  "登別地獄谷": {
    "topic": "火山地形與「地獄」想像",
    "paragraphs": [
      "地獄谷是日和山火山活動留下的爆裂火口，岩壁與地表不斷湧出水蒸氣和硫磺氣息。這種不斷冒煙、地熱翻湧的景觀，在日本民間想像中容易與佛教地獄圖像及鬼神故事連結，因此有了「地獄谷」的名稱與登別的鬼文化。",
      "這座約450公尺寬的火口，每日可供應約一萬噸溫泉水。它不只是拍照景點，更是登別溫泉旅館能持續使用天然熱泉的地質來源；冬季白雪與蒸氣並存，尤其能看出地底熱能的力量。"
    ],
    "source": "https://www.visit-hokkaido.jp/en/spa/spot/detail_10157.html"
  },
  "登別溫泉": {
    "topic": "一段從私人浴池開始的溫泉故事",
    "paragraphs": [
      "登別溫泉的發展並不是近代才由大型飯店開始。1858年，瀧本金藏為照顧患病的妻子而在當地設置浴池，後來發展出溫泉旅館，並改善通往溫泉的道路。這段故事讓登別的溫泉歷史帶有家庭照護與地方開拓的色彩。",
      "「鬼」則是登別獨特的觀光文化。如今街上的閻魔王、鬼雕像和地獄祭，將地獄谷的火山景觀變成地方傳說。要留意的是，現代的鬼表演和祭典是文化與觀光活動，不能等同於古代真實事件。"
    ],
    "source": "https://noboribetsu-spa.jp/en/history/"
  },
  "登別尼克斯海洋公園": {
    "topic": "一座把北歐建築帶到北海道的水族館",
    "paragraphs": [
      "登別尼克斯海洋公園於1990年開幕，是北海道發展家庭型主題觀光的代表之一。園區以丹麥城堡風格打造「尼克斯城」，形成與北海道溫泉、火山截然不同的歐風景象。",
      "從冷水生物、熱帶海洋展示到企鵝遊行，園區把原本分散在不同海域的自然生態放在同一條參觀動線。欣賞城堡時，可以同時想一想：北海道人們如何藉著國際文化元素，把觀光從自然景點延伸到親子教育和休閒體驗。"
    ],
    "source": "https://www.visit-hokkaido.jp/en/spot/detail_10156.html"
  },
  "函館元町教會群": {
    "topic": "1859年開港，改寫一座城市的風景",
    "paragraphs": [
      "函館在1859年成為日本最早對外開放貿易的港口之一。外國商人、外交機構與傳教士陸續到來，俄羅斯正教、天主教與英國國教等不同信仰也留下教堂。元町因此能在相近的坡道間，看見多種建築語彙與宗教傳統。",
      "例如函館正教會源於1860年建立的教會，現存洋蔥形圓頂建築則建於1916年。值得注意的是，函館曾多次發生大火，部分歷史建築是火災後重建的成果；眼前的「異國風情」，其實也是地方居民一次次重建城市的記憶。"
    ],
    "source": "https://www.japan.travel/en/spot/1902/"
  },
  "金森紅磚倉庫群": {
    "topic": "從國際商港的貨倉，到聖誕海港",
    "paragraphs": [
      "日本開港後，函館成為連接北海道與海外的重要貿易港。金森一帶的紅磚倉庫建於1909年，昔日是貨物進出港口的物流空間；隨著港灣產業轉型，老倉庫才逐步改造成今日的商店與餐飲場所。",
      "函館的聖誕活動也與開港城市的西方文化背景有關。海面上的大型聖誕樹與燈光，讓舊港口成了冬季節慶舞台。但聖誕活動屬自由前往選項，是否有時間欣賞須依當天團體集合安排，不能把活動時間視為保證行程。"
    ],
    "source": "https://www.hakodate.travel/en/sightseeing-spots/historic-building/kanemori-red-brick-warehouse/"
  },
  "函館山纜車夜景": {
    "topic": "「沙洲城市」與近代函館的百萬夜景",
    "paragraphs": [
      "函館山在遠古時期原本是島嶼，之後由海浪與泥沙堆積形成沙洲，逐漸和陸地連接。今日從山頂俯瞰，會看見城市燈光沿著狹窄地帶延伸，兩側則被海灣包圍。這種獨特的地形，才是函館夜景之所以容易辨認的真正原因。",
      "函館山纜車於1958年啟用，象徵戰後函館逐步從港口和漁業城市，轉型成全國知名的觀光城市。看夜景時也能留意道路格局：函館歷史上曾發生重大火災，都市重建留下的較寬道路與綠帶，也塑造了今天的城市紋理。"
    ],
    "source": "https://www.hakodate.travel/en/about/history/"
  },
  "函館朝市": {
    "topic": "戰後復甦，從農產品小攤變成海鮮市場",
    "paragraphs": [
      "函館朝市的發展可追溯到1945年第二次世界大戰結束後，當地農民開始販售蔬菜等生活物資。它起初並不是專為觀光客設計的景點，而是戰後城市重新恢復日常供應與交易的場所。",
      "後來隨著函館漁業和交通發展，朝市逐漸集結螃蟹、鮭魚、烏賊等水產品，成為北海道海鮮文化的代表。逛朝市時除了觀察各式海產，也可感受日本港口城市「從生產現場到餐桌」的飲食連結。"
    ],
    "source": "https://www.visit-hokkaido.jp/en/plan/detail_17.html"
  },
  "五稜郭公園": {
    "topic": "幕府末年，日本最後一場武士時代戰爭的舞台",
    "paragraphs": [
      "五稜郭於1864年完工，是幕府為了保衛開港後的函館而建造的西式星形要塞。五個突出的稜堡能減少防禦死角，設計受到當時歐洲築城技術影響；星形並非為了美觀，而是用來適應火砲時代的軍事需求。",
      "1868年至1869年的戊辰戰爭末期，榎本武揚率領舊幕府勢力進入蝦夷地，五稜郭成為其據點。1869年的箱館戰爭結束後，幕府時代的武裝抵抗也告一段落。園內重建的箱館奉行所，則讓人看見日本傳統木造官署被西式要塞包圍的歷史轉折。",
      "本次團體行程是參觀地面公園，並不包含五稜郭塔展望台；因此可在地面觀察護城河、城牆及稜堡，但不應期待行程保證提供俯視完整星形的視角。"
    ],
    "source": "https://www.hakodate.travel/en/more-about-hakodate/goryokaku/"
  },
  "大沼國定公園": {
    "topic": "1640年駒岳噴發，塑造湖泊與島嶼",
    "paragraphs": [
      "大沼的湖泊景觀與背後的北海道駒岳火山密不可分。1640年的大規模噴發改變了山體及周邊地形，火山活動所引發的地貌變動形成了今日大沼、小沼等水域與眾多小島。",
      "這裡在1958年被指定為國定公園。眼前看似寧靜的湖泊，實際上保存著火山地質的痕跡，和函館的近代港口史形成鮮明對照：同一趟旅行可以看到日本北方的自然演化，也能看到人類建造的城市。"
    ],
    "source": "https://www.visit-hokkaido.jp/en/spot/detail_10299.html"
  },
  "昭和新山熊牧場": {
    "topic": "認識北海道棕熊，而非把牠當成表演動物",
    "paragraphs": [
      "北海道棕熊是當地大型野生動物，在山林生態系中扮演重要角色。昭和新山熊牧場位在有珠山火山地區附近，讓旅客在圈養環境下近距離觀察棕熊的體型、嗅覺反應及覓食行為。",
      "若從北海道地方歷史來看，阿伊努民族長期生活於這片土地，棕熊在其傳統精神文化中也具有特殊意義。這一層文化背景比單純看餵食更值得理解；但圈養展示與阿伊努傳統儀式並不是同一回事，兩者應清楚區分。"
    ],
    "source": "https://www.visit-hokkaido.jp/en/spot/detail_10538.html"
  },
  "昭和新山": {
    "topic": "二戰年代，一位郵局長記下新山誕生",
    "paragraphs": [
      "昭和新山形成於1943年至1945年。原本平坦的農田先逐漸隆起，再因有珠山相關火山活動形成新山。它最特別的地方，在於近代人類曾親眼目睹山體從平地生成的過程，而不是只能靠地層推測幾千年前的火山史。",
      "當地郵局長三松正夫在戰時器材匱乏的環境中，持續從固定位置觀察並繪製山體變化，留下著名的「三松圖表」。這份紀錄成為火山研究的重要史料，也說明科學發現不一定只發生在大學實驗室，細心的地方觀察者同樣可以留下珍貴證據。"
    ],
    "source": "https://www.visit-hokkaido.jp/en/spot/detail_12965.html"
  },
  "洞爺湖溫泉": {
    "topic": "11萬年前的火山湖，與人類共存的活火山",
    "paragraphs": [
      "洞爺湖大約形成於11萬年前的一次大型火山活動，屬於火山口凹陷後形成的破火山口湖。湖中央的中島群與周圍的有珠山、昭和新山共同構成一個能閱讀地質年代的景觀。",
      "有珠山在20世紀曾多次噴發，2000年的火山活動也曾迫使居民撤離。如今洞爺湖—有珠山地區以地質公園形式呈現火山與生活的關係：溫泉是火山的恩惠，災害風險卻也提醒居民必須持續監測。冬季燈光隧道屬自由前往活動，並非團體保證景點。"
    ],
    "source": "https://www.visit-hokkaido.jp/en/spot/detail_10050.html"
  },
  "SAIRO 展望台": {
    "topic": "從高處看懂洞爺湖的火山地形",
    "paragraphs": [
      "SAIRO 展望台的價值不只在拍攝湖景。從高處可以把洞爺湖的湖面、中島群與周圍火山地形連成一幅完整的地質圖，理解為何這裡會形成如此寬闊而近乎圓形的湖盆。",
      "洞爺湖是一座約11萬年前形成的破火山口湖；之後不同時期的火山活動，又塑造中島及鄰近的山體。即使觀景時間有限，也可以用「湖盆—湖心島—外圍火山」三個層次來看，將地景與前一天的昭和新山故事串在一起。"
    ],
    "source": "https://www.visit-hokkaido.jp/en/spot/detail_10050.html"
  },
  "免稅店": {
    "topic": "北海道物產，從港口貿易走到今日",
    "paragraphs": [
      "免稅店本身不是古蹟，較適合用來認識北海道現代地方產業。北海道在明治以後的交通、農業與商業發展中，逐步建立以乳製品、農產加工、海產及地方工藝為特色的商品文化；不同商品背後往往都有產地故事。",
      "這裡可把眼前的紀念品當成一份小型「產業地圖」：觀察原料產地、製造地及商品標示，分辨哪些是真正的北海道製造，哪些只是以北海道為主題的通路商品。這是購物時的觀察角度，不表示所有免稅店商品都具有歷史意義。"
    ],
    "source": "https://www.japan.travel/en/spot/2161/"
  },
  "小樽運河": {
    "topic": "1923年完工的物流水道，曾差點在現代化中消失",
    "paragraphs": [
      "小樽在明治、大正時期是北海道的重要商業港。1923年完成的運河讓小型駁船可以將海上的貨物運往岸邊倉庫，因此沿岸留下許多石造倉庫、銀行和商社建築。眼前浪漫的水道，原本其實是繁忙的物流設施。",
      "二戰後港口設備升級，運河逐漸失去運輸功能，曾面臨填埋與道路開發的爭議。經過市民長期討論，1986年完成部分整治，保留運河景觀並加入散步道。今天的美麗夜景，背後也有「地方文化保存與都市現代化如何取捨」的故事。",
      "本次行程表明確寫的是「途經小樽運河」，並未保證下車參觀；這些背景可作為車上經過時的理解，不代表會有運河漫步行程。"
    ],
    "source": "https://www.visit-hokkaido.jp/en/spot/detail_10040.html"
  },
  "小樽音樂盒堂・北一硝子館": {
    "topic": "1912年洋風商館與玻璃工業的雙重記憶",
    "paragraphs": [
      "小樽音樂盒堂本館所在建築落成於1912年，保留了大正時期商業街的氣息。音樂盒不是日本傳統樂器，而是近代外來機械工藝在觀光商品中的延伸；館內以不同裝置、旋律和造型讓人看見聲音如何被機械保存。",
      "小樽玻璃工藝則有更貼近生活的起源。十九世紀末，當地的煤油燈玻璃罩與鯡魚漁業所需的玻璃浮球帶動製造技術；後來電氣普及、產業變化，玻璃工藝逐漸轉型為燈飾與生活器物。北一硝子館保留煤油燈照明的展示，讓這段技術史變成可以感受的空間。"
    ],
    "source": "https://otaru.gr.jp/guidemap/glass-otaru"
  },
  "小樽甜點巡禮": {
    "topic": "從北海道乳業走向現代甜點品牌",
    "paragraphs": [
      "北海道的乳酪、奶油與鮮乳是當地甜點產業的重要原料特色。甜點店不只是旅遊紀念品商店，也反映地方把農牧資源轉化為加工食品與觀光品牌的過程。",
      "例如 LeTAO 於1998年在小樽開設本店，結合歐式甜點製法與北海道乳製品，逐漸成為城市代表品牌。相較之下，六花亭與北菓樓又有各自不同的發展背景。品嚐甜點時可以比較乳香、口感與產品設計，也能看見近代北海道從產地經濟走向伴手禮文化的變化。"
    ],
    "source": "https://www.visit-hokkaido.jp/en/spot/detail_10018.html"
  },
  "札幌購物與自由晚餐": {
    "topic": "札幌的商店街與德國姊妹市聖誕故事",
    "paragraphs": [
      "札幌狸小路的商業街歷史可追溯至1870年代。當時正逢明治政府推動北海道近代都市建設，商店與餐飲店逐漸沿街聚集，形成札幌市民日常生活的一部分。今天的拱廊式商店街，是百多年城市商業轉變的延續。",
      "札幌與德國慕尼黑締結姊妹市關係，2002年為紀念締盟30週年而開始舉辦慕尼黑聖誕市集，讓德國冬季節慶文化成為札幌觀光的一部分。2026年官方公告市集至12月25日；但能否前往仍取決於當晚團體自由活動時間，不可視為已安排的景點。"
    ],
    "source": "https://www.visit-hokkaido.jp/event/detail_11164.html"
  },
  "大通公園": {
    "topic": "1871年的防火空間，如何成為札幌城市客廳",
    "paragraphs": [
      "大通公園於1871年規劃，最初的重要用途是都市防火隔離帶，而非單純為了休閒散步。這也反映十九世紀的札幌在棋盤式街道、公共設施與都市防災上的規劃思想。",
      "後來大通公園成為札幌各類城市活動的中心，例如1950年起舉辦的札幌雪祭，以及1981年開始的札幌白色燈節。當你走在公園裡，可以把這條綠帶看作一條城市歷史時間軸：從防火工程轉變成冬季節慶的重要舞台。"
    ],
    "source": "https://www.japan.travel/en/spot/1927/"
  },
  "北海道神宮": {
    "topic": "明治維新與「北海道」名稱誕生的時代",
    "paragraphs": [
      "北海道神宮源於1869年明治政府決定祭祀與北海道治理相關的三位神祇，後來又合祀明治天皇。神社建立的時間，恰與原稱「蝦夷地」的地區在1869年被正式命名為「北海道」相近，反映明治政權將北方納入近代國家行政與文化體系的歷史。",
      "理解這段歷史，也需要記得阿伊努民族在明治以前就長期生活於北海道，擁有自己的語言、信仰與地名文化。神社呈現的是明治政府治理與開拓的其中一種敘事，不等於北海道全部的歷史。走入圓山林木間，可以同時思考國家建設與在地原有文化如何交會。"
    ],
    "source": "https://www.sapporo.travel/en/spot/facility/hokkaido_shrine/"
  },
  "新千歲機場 → 高雄小港機場": {
    "topic": "從北方門戶回望北海道的近代交通史",
    "paragraphs": [
      "1926年千歲出現早期飛機起降的場地；1988年新千歲機場啟用，1992年新航廈落成。將近一個世紀的航空發展，使北海道由過去需要長途船舶和鐵路往返的北方島嶼，成為國際旅客容易抵達的目的地。",
      "五天行程從溫泉、火山與開港城市，走到小樽商港與札幌近代都市。回程時若回想這些景點，可以把北海道視為一個同時具有原住民族歷史、火山地貌、明治開拓與現代觀光的地方，而不只是冬天的雪國。"
    ],
    "source": "https://www.hokkaido-airports.com/en/new-chitose/business/airport/about/"
  }
};
const CHECK_DEFAULT = ['確認三人的護照與機票姓名','確認飯店及三人房安排','確認領隊資料與集合位置','準備防滑防水鞋與保暖外套','準備手套、毛帽、保暖襪','確認旅遊保險及常用藥','準備手機網路、充電器、行動電源','辦理 Visit Japan Web','備妥日圓現金與付款卡片','確認 12/23 函館聖誕活動時間','確認 12/25 札幌市集自由活動時間'];
// 只保留本機行前清單與參考匯率；不再存取舊版購物紀錄／伴手禮資料。
const STORE_KEY = 'hokkaido-trip-tools-v2';
const LEGACY_STORE_KEY = 'hokkaido-trip-demo-v1';
function loadStore(){
  try {
    const raw=localStorage.getItem(STORE_KEY)||localStorage.getItem(LEGACY_STORE_KEY);
    const data=raw?JSON.parse(raw):null;
    if(data&&Array.isArray(data.checks)){
      return {
        checks:data.checks.filter(function(x){return x&&typeof x.text==='string';}).map(function(x){return {id:x.id,text:x.text,done:x.done===true};}),
        rate:typeof data.rate==='number'&&Number.isFinite(data.rate)&&data.rate>0?data.rate:null,
        rateDate:String(data.rateDate||'')
      };
    }
  }catch(e){}
  return {checks:CHECK_DEFAULT.map(function(t,i){return {id:i+1,text:t,done:false};}),rate:null,rateDate:''};
}
const state=loadStore();
let activeDay=0;
function persist(){
  try {localStorage.setItem(STORE_KEY,JSON.stringify({checks:state.checks,rate:state.rate,rateDate:state.rateDate}));return true;}
  catch(e){return false;}
}
function el(tag,cls,text){const node=document.createElement(tag);if(cls)node.className=cls;if(text!==undefined)node.textContent=text;return node;}
function fmt(value){return Math.round(Number(value)||0).toLocaleString('zh-TW');}
function todayJapan(){
  const parts=new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Tokyo',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
  const p=Object.fromEntries(parts.map(function(x){return [x.type,x.value];}));
  return p.year+'-'+p.month+'-'+p.day;
}
function dayDiff(a,b){return Math.round((Date.parse(a+'T00:00:00Z')-Date.parse(b+'T00:00:00Z'))/86400000);}
function showView(view){
  ['home','itinerary','tools','checklist','info'].forEach(function(v){
    const selected=v===view;
    const section=document.getElementById('view-'+v);
    section.hidden=!selected;
    section.classList.toggle('active',selected);
    const nav=document.querySelector('[data-nav="'+v+'"]');
    nav.classList.toggle('selected',selected);
    if(selected)nav.setAttribute('aria-current','page');else nav.removeAttribute('aria-current');
  });
  window.scrollTo({top:0,behavior:'instant'});
}
// 五大頁面均在 GitHub Pages 站內切換，不連接任何雲端資料庫。
document.querySelectorAll('[data-nav],[data-goto]').forEach(function(b){
  b.addEventListener('click',function(){
    showView(b.dataset.nav||b.dataset.goto);
    if(b.dataset.tool){
      const section=document.getElementById(b.dataset.tool);
      if(section)requestAnimationFrame(function(){section.scrollIntoView({behavior:'smooth',block:'start'});});
    }
  });
});
function renderHome(){
  const today=todayJapan(),diff=dayDiff('2026-12-22',today),tripIndex=dayDiff(today,'2026-12-22');
  const status=document.getElementById('trip-status'),count=document.getElementById('trip-countdown');
  let idx=0;
  if(diff>0){status.textContent='出發倒數';count.textContent=diff+' 天後出發';}
  else if(tripIndex>=0&&tripIndex<5){idx=tripIndex;status.textContent='旅程第 '+(idx+1)+' 天';count.textContent=DAYS[idx].label;}
  else{idx=4;status.textContent='旅程已結束';count.textContent='保留旅遊回憶';}
  document.getElementById('today-heading').textContent=diff>0?'出發前提醒':(tripIndex<5&&tripIndex>=0?'今天的旅程':'旅程回顧');
  document.getElementById('japan-clock').textContent='日本日期 '+today.slice(5).replace('-','/');
  const root=document.getElementById('today-card');
  root.replaceChildren();
  const wrap=el('div','today-main');
  const num=el('div','today-num');num.append(el('strong','',diff>0?'12':DAYS[idx].date.slice(8)),el('span','',diff>0?'DEC':'DEC'));
  const content=el('div','today-text');
  const headline=el('strong','',diff>0?'準備出發・高雄直飛北海道':DAYS[idx].label);
  const summary=el('p','',diff>0?'別忘了護照、冬季防滑鞋、行李額度與旅遊保險。':DAYS[idx].stops.map(function(x){return x.name;}).join(' → '));
  const link=el('button','',diff>0?'查看完整五日行程 →':'查看當日景點 →');link.type='button';link.addEventListener('click',function(){activeDay=idx;renderItinerary();showView('itinerary');});
  content.append(headline,summary,link);wrap.append(num,content);root.append(wrap);
}
function renderItinerary(){
  const tabs=document.getElementById('day-tabs');
  tabs.replaceChildren();
  DAYS.forEach(function(day,i){
    const b=el('button','day-tab'+(activeDay===i?' active':''),'DAY '+(i+1));
    b.type='button';b.setAttribute('role','tab');b.setAttribute('aria-selected',i===activeDay?'true':'false');
    b.append(el('small','',day.date.slice(5).replace('-','/')+' '+day.weekday));
    b.addEventListener('click',function(){activeDay=i;renderItinerary();});
    tabs.append(b);
  });
  const day=DAYS[activeDay],banner=el('div','day-banner');
  banner.append(el('span','kicker','DAY '+(activeDay+1)+' · '+day.date),el('h2','',day.label),el('p','',day.subtitle));
  document.getElementById('day-overview').replaceChildren(banner);
  const list=document.getElementById('stop-list');
  list.replaceChildren();
  day.stops.forEach(function(stop){
    const card=el('article','stop-card');
    const tags=el('div','tags');
    const special=['僅途經','不上塔','可能替代','天候影響'].includes(stop.status);
    tags.append(el('span','tag'+(stop.status==='僅途經'?' caution':(special?' free':'')),stop.status));
    card.append(tags,el('h3','',stop.name),el('p','',stop.brief));
    if(stop.extra)card.append(el('p','',stop.extra));
    const detail=el('details','details'),summary=el('summary','','景點故事・歷史文化（展開閱讀）');
    detail.append(summary,el('p','history-intro',stop.story));
    const history=HISTORY_NOTES[stop.name];
    if(history){
      detail.append(el('h4','history-title',history.topic));
      history.paragraphs.forEach(function(paragraph){detail.append(el('p','history-paragraph',paragraph));});
      if(history.source){
        const sourceWrap=el('div','history-source');
        const sourceLink=el('a','history-source-link','延伸閱讀：官方歷史／觀光資料 ↗');
        sourceLink.href=history.source;sourceLink.target='_blank';sourceLink.rel='noopener noreferrer';
        sourceWrap.append(sourceLink);detail.append(sourceWrap);
      }
    }
    card.append(detail);
    if(stop.map){
      const row=el('div','stop-actions'),link=el('a','small-link','在 Google Maps 開啟地點 ↗');
      link.href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(stop.map+', 北海道, 日本');
      link.target='_blank';link.rel='noopener noreferrer';
      row.append(link);card.append(row);
    }
    list.append(card);
  });
}
function setFxStatus(msg){document.getElementById('fx-status').textContent=msg;}
function rateNumber(){const value=Number(document.getElementById('fx-rate').value);return Number.isFinite(value)&&value>0?value:0;}
function updateFx(){
  const amount=Number(document.getElementById('fx-amount').value),rate=rateNumber();
  const isJpy=document.getElementById('currency-direction').value==='jpy';
  document.getElementById('fx-output-label').textContent=isJpy?'預估台幣':'預估日圓';
  document.getElementById('fx-output').textContent=(!rate||!Number.isFinite(amount)||amount<0)?'—':(isJpy?'NT$ ':'¥ ')+fmt(isJpy?amount*rate:amount/rate);
}
async function fetchRate(){
  setFxStatus('讀取最新參考匯率中…');
  const button=document.getElementById('rate-refresh');button.disabled=true;
  try{
    const response=await fetch('https://api.frankfurter.dev/v2/rate/jpy/twd');
    if(!response.ok)throw new Error('HTTP '+response.status);
    const result=await response.json();
    const rate=Number(result.rate);
    if(!Number.isFinite(rate)||rate<=0)throw new Error('匯率資料無效');
    state.rate=rate;state.rateDate=String(result.date||'未提供日期');
    document.getElementById('fx-rate').value=rate.toFixed(6);
    setFxStatus('Frankfurter 參考匯率 · '+state.rateDate);
    persist();updateFx();
  }catch(e){
    setFxStatus(state.rate?'目前無法更新，使用上次匯率（'+(state.rateDate||'日期不明')+'）':'匯率更新失敗，請手動輸入有效匯率');
  }finally{button.disabled=false;}
}
document.getElementById('currency-direction').addEventListener('change',updateFx);
document.getElementById('fx-amount').addEventListener('input',updateFx);
document.getElementById('fx-rate').addEventListener('input',function(){
  state.rate=rateNumber()||null;state.rateDate='手動設定';persist();
  setFxStatus('手動設定匯率 · 非即時報價');updateFx();
});
document.getElementById('rate-refresh').addEventListener('click',fetchRate);
// 翻譯卡片只顯示靜態日語，無需第三方翻譯 API 或帳號。
const phraseDialog=document.getElementById('phrase-dialog');
let activePhrase='';
document.querySelectorAll('.phrase-button').forEach(function(button){
  button.addEventListener('click',function(){
    activePhrase=button.dataset.jp||'';
    document.getElementById('phrase-dialog-jp').textContent=activePhrase;
    document.getElementById('phrase-dialog-zh').textContent=button.dataset.zh||'';
    document.getElementById('phrase-copy-status').textContent='';
    if(typeof phraseDialog.showModal==='function')phraseDialog.showModal();
    else phraseDialog.setAttribute('open','');
  });
});
phraseDialog.addEventListener('click',function(event){
  if(event.target===phraseDialog)phraseDialog.close();
});
document.getElementById('phrase-copy').addEventListener('click',async function(){
  const label=document.getElementById('phrase-copy-status');
  try {
    if(!navigator.clipboard||!navigator.clipboard.writeText)throw new Error('clipboard not available');
    await navigator.clipboard.writeText(activePhrase);
    label.textContent='已複製日文';
  }catch(e){
    label.textContent='無法自動複製，請長按上方日文文字進行複製。';
  }
});
// 用裝置時間分別換算日本與台灣時區，不要求定位權限。
function updateClocks(){
  const now=new Date(),timeFormat={hour:'2-digit',minute:'2-digit',hour12:false};
  ['jp','tw'].forEach(function(code){
    const zone=code==='jp'?'Asia/Tokyo':'Asia/Taipei';
    document.getElementById('time-'+code).textContent=new Intl.DateTimeFormat('zh-TW',{...timeFormat,timeZone:zone}).format(now);
    document.getElementById('date-'+code).textContent=new Intl.DateTimeFormat('zh-TW',{timeZone:zone,month:'2-digit',day:'2-digit',weekday:'short'}).format(now);
  });
}
updateClocks();
setInterval(updateClocks,30000);
document.addEventListener('visibilitychange',function(){if(!document.hidden)updateClocks();});
document.getElementById('check-form').addEventListener('submit',function(event){
  event.preventDefault();const input=document.getElementById('check-name'),name=input.value.trim();if(!name)return;
  const old=state.checks.slice();
  state.checks.push({id:Date.now(),text:name,done:false});
  if(!persist()){state.checks=old;alert('無法保存待辦事項。');return;}
  input.value='';renderChecks();
});
function renderChecks(){
  const root=document.getElementById('check-list');root.replaceChildren();
  const count=state.checks.filter(function(item){return item.done;}).length;
  document.getElementById('check-progress').textContent=count+' / '+state.checks.length+' 已完成';
  document.getElementById('progress-bar').style.width=(state.checks.length?count/state.checks.length*100:0)+'%';
  const sorted=state.checks.slice().sort(function(a,b){return Number(a.done)-Number(b.done);});
  sorted.forEach(function(item){
    const row=el('div','check-row'+(item.done?' done':'')),check=el('input');
    check.type='checkbox';check.checked=item.done;check.id='check-'+item.id;
    check.addEventListener('change',function(){item.done=check.checked;persist();renderChecks();});
    const label=el('label','',item.text);label.htmlFor=check.id;
    const del=el('button','','×');del.type='button';del.setAttribute('aria-label','刪除 '+item.text);
    del.addEventListener('click',function(){state.checks=state.checks.filter(function(x){return x.id!==item.id;});persist();renderChecks();});
    row.append(check,label,del);root.append(row);
  });
}
if(state.rate){document.getElementById('fx-rate').value=Number(state.rate).toFixed(6);setFxStatus('上次儲存匯率 · '+(state.rateDate||'日期不明'));}
renderHome();renderItinerary();renderChecks();updateFx();fetchRate();

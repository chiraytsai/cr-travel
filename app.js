'use strict';
/* 北海道家庭旅行網站｜前端試用版。購物與清單僅寫入此裝置 localStorage。 */
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
    {name:'免稅店',status:'安排',brief:'團體安排的自由購物站，可依需要購物。',story:'比價時可先用購物頁換算日圓與台幣。',map:'北海道免稅店'},
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
const CHECK_DEFAULT = ['確認三人的護照與機票姓名','確認飯店及三人房安排','確認領隊資料與集合位置','準備防滑防水鞋與保暖外套','準備手套、毛帽、保暖襪','確認旅遊保險及常用藥','準備手機網路、充電器、行動電源','辦理 Visit Japan Web','備妥日圓現金與付款卡片','確認 12/23 函館聖誕活動時間','確認 12/25 札幌市集自由活動時間'];
const STORE_KEY = 'hokkaido-trip-demo-v1';
function loadStore(){
  try {
    const data=JSON.parse(localStorage.getItem(STORE_KEY)||'null');
    if(data&&Array.isArray(data.expenses)&&Array.isArray(data.wishes)&&Array.isArray(data.checks))return data;
  }catch(e){}
  return {expenses:[],wishes:[],checks:CHECK_DEFAULT.map(function(t,i){return {id:i+1,text:t,done:false};}),rate:null,rateDate:''};
}
const state=loadStore();
let activeDay=0;
function persist(){try{localStorage.setItem(STORE_KEY,JSON.stringify(state));return true;}catch(e){return false;}}
function el(tag,cls,text){const node=document.createElement(tag);if(cls)node.className=cls;if(text!==undefined)node.textContent=text;return node;}
function fmt(value){return Math.round(Number(value)||0).toLocaleString('zh-TW');}
function todayJapan(){
  const parts=new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Tokyo',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
  const p=Object.fromEntries(parts.map(function(x){return [x.type,x.value];}));
  return p.year+'-'+p.month+'-'+p.day;
}
function dayDiff(a,b){return Math.round((Date.parse(a+'T00:00:00Z')-Date.parse(b+'T00:00:00Z'))/86400000);}
function showView(view){
  ['home','itinerary','shopping','checklist','info'].forEach(function(v){
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
document.querySelectorAll('[data-nav],[data-goto]').forEach(function(b){
  b.addEventListener('click',function(){showView(b.dataset.nav||b.dataset.goto);});
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
    const detail=el('details','details'),summary=el('summary','','景點背景故事・展開閱讀');
    detail.append(summary,el('p','',stop.story));card.append(detail);
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
function showExpenseMessage(message){document.getElementById('expense-message').textContent=message;}
document.getElementById('expense-form').addEventListener('submit',function(event){
  event.preventDefault();
  const name=document.getElementById('expense-name').value.trim(),yen=Number(document.getElementById('expense-yen').value),rate=rateNumber();
  const buyer=document.getElementById('expense-buyer').value;
  if(!name||!Number.isInteger(yen)||yen<1||yen>10000000){showExpenseMessage('請輸入商品名稱與有效的整數日圓金額。');return;}
  if(!rate){showExpenseMessage('請先取得或手動輸入有效匯率，才能記錄台幣估算。');return;}
  const old=JSON.stringify(state.expenses);
  state.expenses.unshift({id:Date.now()+'-'+Math.random().toString(36).slice(2,8),name:name,yen:yen,buyer:buyer,rate:rate,twd:Math.round(yen*rate),date:todayJapan()});
  if(!persist()){state.expenses=JSON.parse(old);showExpenseMessage('此裝置無法保存資料，請檢查瀏覽器儲存設定。');return;}
  event.target.reset();renderExpenses();showExpenseMessage('已儲存在此裝置，尚未同步給其他家人。');
});
function renderExpenses(){
  const root=document.getElementById('expense-list');root.replaceChildren();
  const total=state.expenses.reduce(function(sum,item){return sum+(Number(item.twd)||0);},0);
  document.getElementById('expense-total').textContent='NT$'+fmt(total);
  if(!state.expenses.length){root.append(el('p','subtext','尚無購物紀錄。'));return;}
  state.expenses.forEach(function(item){
    const row=el('div','entry'),left=el('div','');
    left.append(el('strong','',item.name),el('small','',item.buyer+' · '+item.date+' · ¥'+fmt(item.yen)));
    const right=el('div','entry-side');
    right.append(el('strong','','NT$'+fmt(item.twd)));
    const btn=el('button','delete-btn','移除');btn.type='button';
    btn.addEventListener('click',function(){
      if(!confirm('確定刪除此裝置上的購物紀錄？'))return;
      const old=state.expenses.slice();state.expenses=state.expenses.filter(function(x){return x.id!==item.id;});
      if(!persist()){state.expenses=old;alert('儲存失敗，沒有刪除紀錄。');return;}
      renderExpenses();
    });
    right.append(btn);row.append(left,right);root.append(row);
  });
}
document.getElementById('wish-form').addEventListener('submit',function(e){
  e.preventDefault();const input=document.getElementById('wish-name'),name=input.value.trim();if(!name)return;
  const old=state.wishes.slice();
  state.wishes.push({id:Date.now()+'-'+Math.random().toString(36).slice(2,5),name:name,done:false});
  if(!persist()){state.wishes=old;alert('無法保存想買清單。');return;}
  input.value='';renderWishes();
});
function renderWishes(){
  const root=document.getElementById('wish-list');root.replaceChildren();
  if(!state.wishes.length){root.append(el('p','subtext','還沒新增想買的伴手禮。'));return;}
  state.wishes.forEach(function(item){
    const row=el('div','entry'),left=el('div','');
    left.append(el('strong','',item.name),el('small','',item.done?'已購買':'尚未購買'));
    const btn=el('button','text-button',item.done?'取消標記':'買好了');
    btn.type='button';btn.addEventListener('click',function(){
      item.done=!item.done;persist();renderWishes();
      if(item.done){
        document.getElementById('expense-name').value=item.name;
        showExpenseMessage('已帶入商品名稱；請輸入日圓金額後另行儲存購物紀錄。');
      }
    });
    const del=el('button','delete-btn','刪除');del.type='button';
    del.addEventListener('click',function(){state.wishes=state.wishes.filter(function(x){return x.id!==item.id;});persist();renderWishes();});
    const actions=el('div','entry-side');actions.append(btn,el('span','',' · '),del);
    row.append(left,actions);root.append(row);
  });
}
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
renderHome();renderItinerary();renderExpenses();renderWishes();renderChecks();updateFx();fetchRate();

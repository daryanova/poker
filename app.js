/* =========================
   Poker Academy - app.js
   Mobile-first + click-fix
   ========================= */

const menuBtn = document.getElementById("menuBtn");
const sideMenu = document.getElementById("sideMenu");
const overlay = document.getElementById("overlay");
const overlayTitle = document.getElementById("overlayTitle");
const overlayBody = document.getElementById("overlayBody");
const closeOverlay = document.getElementById("closeOverlay");

// ====== DATA (content for sections) ======
const pages = {
  rules: {
    title: "قوانین پایه پوکر",
    body: `
    <h3>۱) هدف بازی</h3>
    <p>هدف اینه که یا بهترین دست رو بسازی، یا طوری بازی کنی که بقیه فولد کنن.</p>

    <h3>۲) ترتیب مراحل (Texas Hold’em)</h3>
    <ul>
      <li>Preflop: دو کارت دست هر نفر</li>
      <li>Flop: سه کارت روی زمین</li>
      <li>Turn: کارت چهارم</li>
      <li>River: کارت پنجم</li>
      <li>Showdown: مقایسه دست‌ها</li>
    </ul>

    <h3>۳) مفاهیم مهم</h3>
    <p><b>Position</b> (موقعیت): هرچی دیرتر بازی کنی بهتره چون اطلاعات بیشتری داری.</p>
    `
  },

  hands: {
    title: "دست‌های پوکر از ضعیف تا قوی",
    body: `
    <ul>
      <li>High Card (کارت بالا)</li>
      <li>One Pair (یک جفت)</li>
      <li>Two Pair (دو جفت)</li>
      <li>Three of a Kind (سه‌تا)</li>
      <li>Straight (استریت)</li>
      <li>Flush (فلاش)</li>
      <li>Full House (فول‌هاوس)</li>
      <li>Four of a Kind (چهارتا)</li>
      <li>Straight Flush (استریت فلاش)</li>
      <li>Royal Flush (رویال فلاش)</li>
    </ul>
    `
  },

  glossary: {
    title: "اصطلاحات مهم پوکر (Glossary)",
    body: `
    <h3>Bet</h3><p>شرط بستن</p>
    <h3>Call</h3><p>هم‌اندازه کردن شرط حریف</p>
    <h3>Raise</h3><p>افزایش شرط</p>
    <h3>Fold</h3><p>کنار رفتن از دست</p>
    <h3>Bluff</h3><p>بازی فیک برای ترسوندن حریف</p>
    <h3>C-Bet</h3><p>شرط ادامه بعد از فلاپ توسط کسی که پری‌فلاپ رِیز کرده</p>
    <h3>Pot Odds</h3><p>نسبت پولی که باید کال کنی به پول داخل پات</p>
    `
  },

  beginner: {
    title: "مسیر یادگیری (مبتدی تا حرفه‌ای)",
    body: `
    <h3>مبتدی</h3>
    <ul>
      <li>یادگیری ترتیب دست‌ها</li>
      <li>آشنایی با مراحل بازی</li>
      <li>فقط با دست‌های قوی وارد شو</li>
    </ul>

    <h3>متوسط</h3>
    <ul>
      <li>موقعیت‌ها (BTN, CO, SB, BB)</li>
      <li>شروع Range ها</li>
      <li>Bluff های سبک</li>
    </ul>

    <h3>حرفه‌ای</h3>
    <ul>
      <li>Range vs Range</li>
      <li>Exploit & GTO Thinking</li>
      <li>Multiway Pots</li>
      <li>ICM / Tournament Strategy</li>
    </ul>
    `
  }
};

// ====== helpers ======
function openPage(key){
  const page = pages[key];
  if(!page) return;

  overlayTitle.innerText = page.title;
  overlayBody.innerHTML = page.body;

  overlay.classList.add("show");
  sideMenu.classList.remove("show");
  document.body.style.overflow="hidden";
}

function closePage(){
  overlay.classList.remove("show");
  document.body.style.overflow="hidden";
}

// ====== menu toggle ======
menuBtn.addEventListener("click", ()=>{
  sideMenu.classList.toggle("show");
});

// ====== close overlay ======
closeOverlay.addEventListener("click", closePage);

// ====== button clicks in menu ======
document.querySelectorAll("[data-page]").forEach(btn=>{
  btn.addEventListener("click", (e)=>{
    const key = e.currentTarget.getAttribute("data-page");
    openPage(key);
  });
});

// ====== click fix for mobile ======
document.addEventListener("touchstart", ()=>{}, {passive:true});

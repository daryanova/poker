(() => {
  "use strict";

  // ===== Helpers =====
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

  const toastEl = $("#toast");
  let toastT = null;
  function toast(msg){
    if(!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastT);
    toastT = setTimeout(()=> toastEl.classList.remove("show"), 2200);
  }

  // ===== DOM =====
  const drawer = $("#drawer");
  const backdrop = $("#backdrop");
  const menuBtn = $("#menuBtn");
  const closeDrawer = $("#closeDrawer");
  const searchBtn = $("#searchBtn");
  const q = $("#q");
  const nav = $("#nav");
  const chips = $("#chips");
  const quickGrid = $("#quickGrid");

  const modal = $("#modal");
  const modalTitle = $("#modalTitle");
  const modalSub = $("#modalSub");
  const modalContent = $("#modalContent");
  const modalBack = $("#modalBack");
  const modalClose = $("#modalClose");
  const prevBtn = $("#prevBtn");
  const nextBtn = $("#nextBtn");

  // Hard safety: if IDs missing, don't crash
  if(!drawer || !modal) {
    console.warn("Missing required DOM nodes. Check index.html IDs.");
    return;
  }

  // ===== Data (Modules) =====
  // Each module is a "page" but still single-page app (no new html pages).
  const PAGES = [
    {
      id:"roadmap", icon:"🧭", title:"شروع و نقشه راه",
      sub:"از صفر تا حرفه‌ای، دقیق و مرحله‌ای",
      tags:["شروع","مبتدی","نقشه راه"],
      body: `
        <h2>نقشه راه یادگیری پوکر (هولدم)</h2>
        <p>هدف این آکادمی اینه که تو <b>واقعاً تصمیم‌گیر</b> بشی، نه فقط حفظ‌کار. مسیر پیشنهادی:</p>
        <h3>مرحله ۱ — پایه‌ها</h3>
        <ul>
          <li>قوانین، ترتیب دست‌ها، روند بازی</li>
          <li>مفاهیم: موقعیت (Position)، ارزش دست، برد/باخت</li>
          <li>حساب کتاب ساده: چرا بعضی کال‌ها اشتباهه؟</li>
        </ul>
        <h3>مرحله ۲ — Preflop (قبل فلاپ)</h3>
        <ul>
          <li>موقعیت‌ها: UTG / MP / CO / BTN / SB / BB</li>
          <li>رِنج باز کردن (Open) و دفاع (Defense)</li>
          <li>۳بت و ۴بت و دلیلشون</li>
        </ul>
        <h3>مرحله ۳ — Postflop (بعد فلاپ)</h3>
        <ul>
          <li>Continuation Bet (C-bet): کی بزنیم؟ کی نزنیم؟</li>
          <li>Value vs Bluff: هدف حرکت چیه؟</li>
          <li>انتخاب سایزینگ بت</li>
        </ul>
        <h3>مرحله ۴ — ذهن و مدیریت سرمایه</h3>
        <ul>
          <li>Tilt و کنترل احساس</li>
          <li>Bankroll و Stop-loss</li>
          <li>بررسی دست‌ها و پیشرفت واقعی</li>
        </ul>
        <p><span class="kbd">نکته</span> هر روز فقط ۲۰ دقیقه، اما با نظم. کیفیت مهم‌تر از حجمِ پراکنده است.</p>
      `
    },

    {
      id:"rules", icon:"📘", title:"قوانین در ۱۰ دقیقه",
      sub:"خیلی ساده، بدون اصطلاح‌بازی",
      tags:["قوانین","پایه"],
      body: `
        <h2>قوانین خیلی ساده</h2>
        <p><b>هولدم</b> یعنی هر بازیکن ۲ کارت شخصی دارد و ۵ کارت مشترک روی میز می‌آید.</p>
        <h3>روند دست</h3>
        <ul>
          <li>پخش ۲ کارت</li>
          <li>دور شرط‌بندی ۱ (Preflop)</li>
          <li>۳ کارت مشترک (Flop) + شرط‌بندی</li>
          <li>کارت ۴ (Turn) + شرط‌بندی</li>
          <li>کارت ۵ (River) + شرط‌بندی</li>
          <li>Showdown (رو شدن) اگر کسی فولد نکرده باشد</li>
        </ul>
        <h3>کارهایی که می‌تونی بکنی</h3>
        <ul>
          <li><b>Check</b>: پاس (وقتی بت جلوت نیست)</li>
          <li><b>Bet</b>: شرط اول</li>
          <li><b>Call</b>: هم‌مقدار کردن</li>
          <li><b>Raise</b>: افزایش دادن</li>
          <li><b>Fold</b>: انداختن دست</li>
        </ul>
        <p>هدف: بهترین ۵ کارت ممکن بسازی (از ترکیب کارت‌های خودت + کارت‌های میز).</p>
      `
    },

    {
      id:"hands", icon:"🏆", title:"ترتیب دست‌ها",
      sub:"از High Card تا Royal Flush",
      tags:["دست‌ها","رتبه"],
      body: `
        <h2>ترتیب دست‌ها (از قوی به ضعیف)</h2>
        <ul>
          <li><b>Royal Flush</b>: 10 J Q K A هم‌خال</li>
          <li><b>Straight Flush</b>: ۵ کارت پشت‌سرهم هم‌خال</li>
          <li><b>Four of a Kind</b>: چهارتا مثل هم</li>
          <li><b>Full House</b>: سه‌تا + دو تا</li>
          <li><b>Flush</b>: ۵ کارت هم‌خال</li>
          <li><b>Straight</b>: ۵ کارت پشت‌سرهم</li>
          <li><b>Three of a Kind</b>: سه‌تا مثل هم</li>
          <li><b>Two Pair</b>: دو جفت</li>
          <li><b>One Pair</b>: یک جفت</li>
          <li><b>High Card</b>: هیچکدام، بالاترین کارت</li>
        </ul>
        <p><span class="kbd">تمرین</span> سه دست واقعی بنویس و سعی کن رتبه‌ش رو تشخیص بدی.</p>
      `
    },

    {
      id:"positions", icon:"📍", title:"موقعیت‌ها",
      sub:"چرا Button بهترینه؟",
      tags:["Position","پری‌فلاپ"],
      body: `
        <h2>Position یعنی چی؟</h2>
        <p>موقعیت یعنی <b>آخر حرف زدن</b> یا <b>اول حرف زدن</b>. هرچی دیرتر اقدام کنی، اطلاعات بیشتری داری.</p>
        <h3>موقعیت‌های رایج</h3>
        <ul>
          <li><b>UTG</b>: اول صحبت</li>
          <li><b>MP</b>: وسط</li>
          <li><b>CO</b>: قبل باتن</li>
          <li><b>BTN</b>: باتن (بهترین موقعیت)</li>
          <li><b>SB/BB</b>: بلایندها (بدترین چون اغلب بیرون از پوزیشن می‌شی)</li>
        </ul>
        <p>قانون طلایی: خارج از پوزیشن، محتاط‌تر و ساده‌تر بازی کن.</p>
      `
    },
{
  id:"preflop",
  icon:"🎯",
  title:"پری فلاپ",
  sub:"تصمیم گیری قبل فلاپ",
  tags:["Preflop","مبتدی"],
  body:`
  <h2>پری فلاپ چیست؟</h2>
  <p>مرحله قبل از باز شدن کارت های روی میز است.</p>

  <h3>کارهای اصلی</h3>
  <ul>
    <li>Fold = کنار کشیدن</li>
    <li>Call = هم اندازه شرط</li>
    <li>Raise = افزایش شرط</li>
  </ul>

  <p>بازیکنان حرفه ای بیشتر تصمیم مهم را در این مرحله میگیرند.</p>
  `
},
    {
      id:"terms", icon:"🧠", title:"اصطلاحات مهم",
      sub:"همه بفهمن چی به چیه",
      tags:["اصطلاحات","لغت"],
      body: `
        <h2>اصطلاحات کاربردی (ساده)</h2>
        <ul>
          <li><b>Range</b>: مجموعه دست‌هایی که احتمال میدی طرف داشته باشه.</li>
          <li><b>Value Bet</b>: شرط برای اینکه از دست ضعیف‌تر پول بگیری.</li>
          <li><b>Bluff</b>: شرط برای اینکه دست بهتر رو فولد بدی.</li>
          <li><b>C-bet</b>: کسی که قبل فلاپ ریز داده، روی فلاپ هم بت می‌زنه.</li>
          <li><b>3-bet</b>: ریز دوم (Open → Raise = 3-bet)</li>
          <li><b>Fold Equity</b>: شانس اینکه با بت، حریف فولد بده.</li>
          <li><b>Outs</b>: کارت‌هایی که دستت رو بهتر می‌کنه.</li>
          <li><b>Pot Odds</b>: نسبت پولی که باید بدی به پاتی که می‌تونی ببری.</li>
          <li><b>Tilt</b>: بازی احساسی بعد از بدشانسی/باخت.</li>
          <li><b>Bankroll</b>: سرمایه مخصوص پوکر.</li>
        </ul>
        <p><span class="kbd">نکته</span> اگر فقط همین‌ها رو درست بفهمی، نصف راهی!</p>
      `
    },

    {
      id:"cbets", icon:"🎯", title:"C-bet و مثال‌ها",
      sub:"کی بزنیم؟ کی نزنیم؟",
      tags:["C-bet","مثال"],
      body: `
        <h2>C-bet (Continuation Bet)</h2>
        <p>وقتی قبل فلاپ ریز کردی و فلاپ اومد، خیلی وقت‌ها تو نماینده دست قوی‌تری هستی.</p>

        <h3>چه فلاپ‌هایی برای C-bet خوبه؟</h3>
        <ul>
          <li>فلاپ‌های خشک: A♣ 7♦ 2♠</li>
          <li>وقتی تو مزیت رنج داری (تو بیشتر A و K داری)</li>
        </ul>

        <h3>چه فلاپ‌هایی بدتره؟</h3>
        <ul>
          <li>فلاپ‌های خیس: 9♠ 8♠ 7♦ (دروا زیاد)</li>
          <li>وقتی حریفِ کال‌کننده رنجش به این برد می‌خوره</li>
        </ul>

        <h3>مثال سریع</h3>
        <p>تو BTN ریز کردی، BB کال کرده. فلاپ A-7-2. اینجا C-bet کوچک معمولاً خوبه.</p>
      `
    },

    {
      id:"valueBluff", icon:"⚖️", title:"Value یا Bluff؟",
      sub:"هدف حرکتت رو معلوم کن",
      tags:["Value","Bluff"],
      body: `
        <h2>هر بت باید دلیل داشته باشه</h2>
        <p>سوال اصلی: <b>می‌خوام چی بدست بیارم؟</b></p>
        <h3>Value Bet</h3>
        <ul>
          <li>وقتی دستت خوبه و دست‌های ضعیف‌تر کال می‌کنن</li>
          <li>مثال: Top Pair با کیکر خوب روی برد خشک</li>
        </ul>
        <h3>Bluff</h3>
        <ul>
          <li>وقتی می‌خوای دست بهتر رو فولد بدی</li>
          <li>بلوف خوب معمولاً یا «داستان منطقی» داره یا «دروا» که اگر کال شد هنوز شانس داری</li>
        </ul>
        <p><span class="kbd">قانون</span> بتِ بدون هدف = پول‌سوزی</p>
      `
    },

    {
      id:"tilt", icon:"🔥", title:"Tilt و ذهن",
      sub:"چطور احساسی بازی نکنیم",
      tags:["Tilt","ذهن"],
      body: `
        <h2>Tilt = دشمن شماره ۱</h2>
        <p>وقتی بدشانسی میاد، مغز دنبال جبران سریع می‌ره. اینجا بیشترین اشتباهات رخ می‌ده.</p>
        <h3>۳ قانون ضد تیلْت</h3>
        <ul>
          <li><b>Stop-loss</b>: اگر X بای‌این باختی، قطع کن.</li>
          <li><b>Break</b>: ۵ دقیقه دور شو، آب بخور، نفس عمیق.</li>
          <li><b>Review</b>: بعداً دست‌ها رو نگاه کن، نه وسط عصبانیت.</li>
        </ul>
        <p>حرف آخر: بردهای بزرگ از کنترل ذهن میاد، نه از شانس.</p>
      `
    },

    {
      id:"bankroll", icon:"💼", title:"Bankroll و مدیریت سرمایه",
      sub:"حرفه‌ای‌ها اینجا جدا میشن",
      tags:["Bankroll","پول"],
      body: `
        <h2>مدیریت سرمایه یعنی زنده موندن</h2>
        <p>اگر خوب بازی کنی ولی بد مدیریت کنی، بالاخره می‌بازی.</p>
        <h3>قانون ساده</h3>
        <ul>
          <li>با پولی بازی کن که فشار روانی نداره</li>
          <li>سطح میز رو طوری انتخاب کن که باخت چند جلسه نابودت نکنه</li>
        </ul>
        <p><span class="kbd">هدف</span> نوسان پوکر رو با مدیریت سرمایه خنثی کن.</p>
      `
    },

    // Quick mini-pages (برای اینکه سایت مفید و پُر بشه بدون تکرار بی‌خود)
    ...makeExtraPages()
  ];

  function makeExtraPages(){
    const extras = [];
    const topics = [
      ["preflopBasics","🃏","Preflop پایه","اوپن، کال، 3بت"],
      ["opening","🚪","اوپن رِنج","کی چی اوپن کنیم؟"],
      ["threebet","⚡","3-bet/4-bet","منطق و مثال"],
      ["defense","🛡️","دفاع بلایند","کال/فولد/ری‌ریز"],
      ["flopPlan","🧩","پلان فلاپ","بردشناسی"],
      ["turn","🔁","بازی در ترن","بار دوم تصمیم"],
      ["river","🏁","بازی در ریور","Value/Bluff نهایی"],
      ["sizing","📏","سایزینگ بت","کوچک/بزرگ چرا؟"],
      ["reads","👀","خواندن حریف","الگوها و عادت‌ها"],
      ["notes","📝","نوت‌برداری","چی بنویسیم؟"],
      ["study","📚","روش تمرین","چطور سریع‌تر بهتر شی؟"],
      ["mistakes","🚫","اشتباهات رایج","پول‌سوزی‌های کلاسیک"],
    ];

    for (const [id,icon,title,sub] of topics){
      extras.push({
        id, icon, title, sub,
        tags:["پیشرفته","آموزش"],
        body: `
          <h2>${title}</h2>
          <p>${sub} — این بخش رو می‌تونی کم‌کم کامل‌تر کنی. ساختار پیشنهادی:</p>
          <h3>چی یاد می‌گیری؟</h3>
          <ul>
            <li>تعریف ساده + دلیل اهمیت</li>
            <li>۲ مثال واقعی</li>
            <li>۳ اشتباه رایج</li>
            <li>تمرین کوتاه برای امروز</li>
          </ul>
          <p><span class="kbd">تمرین</span> امروز فقط ۱۰ دست رو بررسی کن و یک نکته بنویس.</p>
        `
      });
    }
    return extras;
  }

  // ===== State =====
  let currentId = "roadmap";
  let filtered = PAGES.slice();

  // ===== Drawer functions =====
  function openDrawer(){
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden","false");
    backdrop.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeDrawerFn(){
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden","true");
    backdrop.hidden = true;
    document.body.style.overflow = "";
  }

  // ===== Modal functions =====
  function openModalById(id){
    const page = PAGES.find(p => p.id === id);
    if(!page){ toast("این بخش پیدا نشد"); return; }

    currentId = id;
    modalTitle.textContent = page.title;
    modalSub.textContent = page.sub || "";
    modalContent.innerHTML = page.body;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden","false");
    document.body.style.overflow = "hidden";

    updatePrevNext();
    closeDrawerFn();
    // scroll modal top
    const body = $(".modalBody", modal);
    if(body) body.scrollTop = 0;
  }

  function closeModal(){
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden","true");
    document.body.style.overflow = "";
  }

  function updatePrevNext(){
    const list = filtered.length ? filtered : PAGES;
    const idx = list.findIndex(p => p.id === currentId);
    const prev = idx > 0 ? list[idx-1] : null;
    const next = idx >= 0 && idx < list.length-1 ? list[idx+1] : null;

    prevBtn.disabled = !prev;
    nextBtn.disabled = !next;

    prevBtn.onclick = () => prev && openModalById(prev.id);
    nextBtn.onclick = () => next && openModalById(next.id);
  }

  // ===== Render =====
  function renderNav(list){
    nav.innerHTML = "";
    for(const p of list){
      const item = document.createElement("div");
      item.className = "navItem";
      item.dataset.open = p.id;
      item.innerHTML = `
        <div class="navIcon">${p.icon}</div>
        <div class="navText">
          <div class="navTitle">${p.title}</div>
          <div class="navSub">${p.sub || ""}</div>
        </div>
        <div aria-hidden="true">›</div>
      `;
      nav.appendChild(item);
    }
  }

  function renderQuick(list){
    // show a curated set
    const picks = ["roadmap","rules","hands","positions","terms","cbets","valueBluff","tilt","bankroll"];
    const quick = picks.map(id => PAGES.find(p => p.id===id)).filter(Boolean);

    quickGrid.innerHTML = "";
    for(const p of quick){
      const card = document.createElement("div");
      card.className = "card";
      card.dataset.open = p.id;
      card.innerHTML = `
        <div class="cardTop">
          <div class="badge">${p.icon}</div>
          <div>
            <div class="cardTitle">${p.title}</div>
            <div class="cardSub">${p.sub || ""}</div>
          </div>
        </div>
        <p class="cardP">برای دیدن محتوا فقط یک بار بزن. صفحه مثل اپ باز میشه ✅</p>
      `;
      quickGrid.appendChild(card);
    }
  }

  function renderChips(){
    const chipList = [
      ["شروع","roadmap"],
      ["قوانین","rules"],
      ["دست‌ها","hands"],
      ["موقعیت","positions"],
      ["اصطلاحات","terms"],
      ["C-bet","cbets"],
      ["Value/Bluff","valueBluff"],
      ["Tilt","tilt"],
      ["Bankroll","bankroll"],
    ];
    chips.innerHTML = "";
    chipList.forEach(([label, id])=>{
      const c = document.createElement("button");
      c.className = "chip";
      c.type = "button";
      c.textContent = label;
      c.onclick = ()=> openModalById(id);
      chips.appendChild(c);
    });
  }

  // ===== Search =====
  function applySearch(text){
    const t = (text||"").trim().toLowerCase();
    if(!t){
      filtered = PAGES.slice();
      renderNav(filtered);
      return;
    }
    filtered = PAGES.filter(p => {
      const hay = (p.title+" "+(p.sub||"")+" "+(p.tags||[]).join(" ")).toLowerCase();
      return hay.includes(t);
    });
    renderNav(filtered);
  }

  // ===== Click Handling (Fix for mobile) =====
  // Use pointer events + event delegation to avoid "buttons not clickable" issue.
  function onAnyClick(e){
    const el = e.target.closest("[data-open]");
    if(!el) return;
    const id = el.getAttribute("data-open");
    if(id) openModalById(id);
  }

  // ===== Init =====
  function init(){
    renderChips();
    renderNav(PAGES);
    renderQuick(PAGES);

    // Drawer events
    menuBtn?.addEventListener("click", openDrawer, {passive:true});
    closeDrawer?.addEventListener("click", closeDrawerFn, {passive:true});
    backdrop?.addEventListener("click", closeDrawerFn, {passive:true});
    searchBtn?.addEventListener("click", () => { openDrawer(); setTimeout(()=> q?.focus(), 150); }, {passive:true});

    // Search typing
    q?.addEventListener("input", (e)=> applySearch(e.target.value), {passive:true});

    // Delegated clicks
    nav.addEventListener("click", onAnyClick);
    quickGrid.addEventListener("click", onAnyClick);
    document.body.addEventListener("click", (e)=>{
      const btn = e.target.closest("button[data-open]");
      if(btn) openModalById(btn.getAttribute("data-open"));
    });

    // Modal controls
    modalBack?.addEventListener("click", closeModal, {passive:true});
    modalClose?.addEventListener("click", closeModal, {passive:true});

    // Esc to close
    document.addEventListener("keydown", (e)=>{
      if(e.key === "Escape"){
        if(modal.classList.contains("open")) closeModal();
        if(drawer.classList.contains("open")) closeDrawerFn();
      }
    });

    // Deep link: #rules etc.
    const hash = (location.hash||"").replace("#","").trim();
    if(hash && PAGES.some(p=>p.id===hash)){
      openModalById(hash);
    } else {
      toast("آماده‌ست ✅ منو رو بزن برای بخش‌ها");
    }
  }

  init();
})();

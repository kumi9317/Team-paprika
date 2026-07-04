/*==================================
　　FAQ
==================================*/
$(function() {
  $('.faq__q').on('click', function() {

    // 自分の開閉
    $(this).next('.faq__a').slideToggle();

    // 自分の＋/−切り替え
    $(this).toggleClass('active');

    // 他を閉じる
    $('.faq__a').not($(this).next()).slideUp();

    // 他のactiveも消す（これ大事）
    $('.faq__q').not($(this)).removeClass('active');
  });
});

/*==================================
　　ハンバーガーメニュー制御
==================================*/
$(function() {
    // 各要素を変数に入れる
    const $hamburger = $('#js-hamburger');
    const $drawer = $('#js-drawer');
    const $overlay = $('#js-overlay');

    // ハンバーガーボタンをクリックした時
    $hamburger.on('click', function() {
        $(this).toggleClass('is-active'); // 三本線を「×」に
        $drawer.toggleClass('is-open');    // メニューを右から出す
        $overlay.toggleClass('is-visible'); // 背景を黒くする
        $('body').toggleClass('nav-open'); // bodyをスクロール禁止に
    });

    // 背景（オーバーレイ）をクリックした時もメニューを閉じる
    $overlay.on('click', function() {
        $hamburger.removeClass('is-active');
        $drawer.removeClass('is-open');
        $(this).removeClass('is-visible');
        $('body').removeClass('nav-open');
    });

    $('.drawer-menu__item a').on('click', function(e) {

        const href = $(this).attr('href');

        // メニューを閉じる（共通処理）
        $hamburger.removeClass('is-active');
        $drawer.removeClass('is-open');
        $overlay.removeClass('is-visible');
        $('body').removeClass('nav-open');

        // #main-event 宛のリンク かつ「今いるページに .main-event が実在する場合」だけ特別扱い
        // （＝index.html上でクリックされた時だけ。他ページからは普通に遷移させる）
        if (href && href.indexOf('#main-event') !== -1 && $('.main-event').length) {
            e.preventDefault();
            setTimeout(function() {
                ScrollTrigger.refresh();
                scrollToMainEvent();
            }, 300);
        }
    });

    
});

/*==================================
　　スマホヘッダー切り替え
==================================*/
$(window).on('scroll', function() {
    const $header = $('.header');
    const headerTop = $header[0].getBoundingClientRect().top;

    // ヘッダーがページ上部にくっついたら（stickyが効いた状態）
    if (headerTop <= 0) {
        $('body').addClass('is-scrolled');
    } else {
        $('body').removeClass('is-scrolled');
    }
});


/*==================================
　　メインイベント背景固定
==================================*/
$(function() {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.matchMedia({
        // 426px以上のとき：背景固定アニメーションを実行
        "(min-width: 426px)": function() {
            const tl = gsap.timeline({
                scrollTrigger: {
                    id: "mainEventPin",
                    trigger: ".main-event",
                    start: "top top",
                    end: "+=2600", 
                    scrub: 1.5, 
                    pin: true,
                    pinSpacing: true, 
                }
            });

            // 演出の中身
            tl.to(".main-event__speed-line", { width: "100%", opacity: 0.6, duration: 4 })
              .to(".js-title", { opacity: 1, duration: 2 }, "-=2")
              .to(".js-event-item:nth-of-type(1)", { opacity: 1, visibility: "visible", duration: 5 })
              .to(".js-event-item:nth-of-type(1)", { opacity: 0, duration: 3, delay: 5 })
              .to(".js-event-item:nth-of-type(2)", { opacity: 1, visibility: "visible", duration: 5 })
              .to(".js-event-item:nth-of-type(2)", { opacity: 0, duration: 3, delay: 5 })
              .to(".js-event-item:nth-of-type(3)", { opacity: 1, visibility: "visible", duration: 5 })
              .to(".js-event-item:nth-of-type(3)", { opacity: 0, duration: 3, delay: 5 })
              .to(".js-event-item:nth-of-type(4)", { opacity: 1, visibility: "visible", duration: 5 })
              .to(".js-event-item:nth-of-type(4)", { opacity: 0, duration: 3, delay: 5 })
              .to(".js-title", { opacity: 0, duration: 2 }, "-=1")
              .to(".main-event__speed-line", { opacity: 0, duration: 2 }, "-=2")
              .to({}, { duration: 5 });
              
            // クリーンアップ処理（画面幅を変えた時にリセットされるようにする）
            return function() {
                tl.kill(); 
            };
        },

        // 425px以下のとき：アニメーションを動かさない
        "(max-width: 425px)": function() {
            // スマホ版では何も記述しなくてOKです。
            // GSAPが自動的にScrollTriggerを無効化してくれます。
        }
    });
});

/*==================================
　　帯画像ズーム（複数対応版）
==================================*/
// 1. すべての .obi 要素を取得
const obiElements = document.querySelectorAll('.obi');

// 要素が存在する場合のみ実行
if (obiElements.length > 0) {
    const observerOptions = {
        root: null,
        rootMargin: "-20% 0px",
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-zoom');
            }
        });
    }, observerOptions);

    // 2. 取得したすべての要素に対して監視を開始する
    obiElements.forEach(el => {
        observer.observe(el);
    });
}

/*==================================
　　ヒーローセクション表示
==================================*/
$(window).on('load', function() {
  // ページ内に .is-home がある場合（トップページの場合）のみ実行
    if ($('.is-home').length > 0) {
    const tl = gsap.timeline();

    tl
    // ① 背景画像をふわっと表示
    .to(".main-visual", { opacity: 1, duration: 1.5, ease: "power2.out" })

    // ② H1テキストが中央にふわっと表示
    .to(".mv-text", { 
        autoAlpha: 1, // opacityとvisibilityを同時に制御
        duration: 1.2, 
        ease: "power2.out" 
    }, "-=0.5") // 背景の終わり際にかぶせる

    // ③ H1テキストが下（55%の位置）に移動
    .to(".mv-text", { 
        top: "65%", 
        duration: 1.0, 
        ease: "power3.inOut" 
    }, "+=0.5") // 表示されてから少し間を置く

    // ④ ロゴが真ん中に「ドーン」と表示（大きくして戻す）
    .fromTo(".mv-logo", 
        { scale: 0, autoAlpha: 0 }, 
        { 
            scale: 1, 
            autoAlpha: 1, 
            top: "40%", // 最終的な位置へ移動
            duration: 1.2, 
            ease: "back.out(1.7)" // 少し行き過ぎて戻る弾むような動き
        }, 
        "-=0.3"
    )

    // ⑤ 最後にヘッダーを表示
    .to(".header", { 
        autoAlpha: 1, 
        duration: 0.8, 
        ease: "power2.out" 
    });
  }
});

/*==================================
　　スマホ用アコーディオン
==================================*/
$('.sp-accordion__btn').on('click', function() {
    const targetId = $(this).data('target');
    const $body = $('#' + targetId);
    const $allBodies = $('.sp-accordion__body');
    const $allBtns = $('.sp-accordion__btn');

    // 他のアコーディオンが開いていたら閉じる（タブ切り替え風）
    if ($body.hasClass('is-open')) {
        // すでに開いていたら閉じる
        $body.removeClass('is-open');
        $(this).removeClass('is-open');
    } else {
        // 全部閉じてから開く
        $allBodies.removeClass('is-open');
        $allBtns.removeClass('is-open');
        $body.addClass('is-open');
        $(this).addClass('is-open');
    }
});

// ヘッダー外をクリックしたら閉じる
$(document).on('click', function(e) {
    if (!$(e.target).closest('.sp-accordion').length) {
        $('.sp-accordion__body').removeClass('is-open');
        $('.sp-accordion__btn').removeClass('is-open');
    }
});


/*==================================
　　pu__tab
==================================*/
/*==================================
　　pu__tab
==================================*/

// タブ切り替え関数
function getHashId(hashIdName) {
    if (!hashIdName) {
        return;
    }

    const $pickupEvent = $('#pickup-event');
    const $targetTab = $pickupEvent.find('.tab a[href="' + hashIdName + '"]');
    const $targetArea = $pickupEvent.find(hashIdName);

    if (!$targetTab.length || !$targetArea.length) {
        return;
    }

    // タブのactive切り替え
    $pickupEvent.find('.tab li').removeClass('active');
    $targetTab.parent('li').addClass('active');

    // コンテンツの表示切り替え
    $pickupEvent.find('.area').removeClass('is-active');
    $targetArea.addClass('is-active');
}


// タブをクリックしたとき
$('.tab a').on('click', function (event) {
    event.preventDefault();

    const idName = $(this).attr('href');
    getHashId(idName);
});


// ページ読み込み時
$(window).on('load', function () {

    console.log('LOAD');
    console.log(location.hash);

    const hashName = location.hash;

    // 治部坂のイベント群
    const jibuzakaIds = [
        '#toyotajibuzaka',
        '#dance',
        '#mokuiku',
        '#kendama'
    ];

    // 平谷のイベント群
    const hirayaIds = [
        '#toyotahiraya',
        '#auction',
        '#yaris300'
    ];

    // 治部坂の個別イベントに飛ぶ場合
    if (jibuzakaIds.includes(hashName)) {
        getHashId('#pu-jibuzaka');
        return;
    }

    // 平谷の個別イベントに飛ぶ場合
    if (hirayaIds.includes(hashName)) {
        getHashId('#pu-hiraya');
        return;
    }

    // 通常のタブ切り替え
    if (hashName) {
        getHashId(hashName);
        return;
    }

    // デフォルト
    getHashId('#pu-botharea');
});



/*==================================
　　pu__slick
==================================*/
$(".pu__slider__items").slick({
  autoplay: true, // 自動再生
  autoplaySpeed: 4000, // 再生速度（ミリ秒設定） 1000ミリ秒=1秒
  infinite: true, // 無限スライド
  arrows: true, // 矢印
  dots: true, // インジケーター
});

/*==================================
  他ページからの遷移時にGSAPのズレを補正するスクロール制御
==================================*/
$(window).on('load', function() {
  // URLに「#」が含まれているかチェック
  if (location.hash) {
    const targetHash = location.hash;
    
    // pu__tab（タブ切り替え）で処理するハッシュ群は除外する
    const tabIds = [
      '#toyotajibuzaka', '#dance', '#mokuiku', '#kendama',
      '#toyotahiraya', '#auction', '#yaris300',
      '#pu-jibuzaka', '#pu-hiraya', '#pu-botharea'
    ];

    if (tabIds.includes(targetHash)) {
      return; // タブ切り替え用のハッシュならここで処理を抜ける
    }

    // ターゲットとなる要素が存在するか確認
    const $targetElement = $(targetHash);
    if ($targetElement.length) {
      setTimeout(function() {
        ScrollTrigger.refresh();

        if (targetHash === '#main-event') {
          scrollToMainEvent();
        } else {
          const targetPosition = $targetElement.offset().top;
          $('html, body').animate({
            scrollTop: targetPosition
          }, 0);
        }
      }, 200);
    }
  }
});

/*==================================

　　main-event へ正確にスクロールする関数

==================================*/
function scrollToMainEvent() {
    const st = ScrollTrigger.getById("mainEventPin");

    if (st) {
        // PC幅（ピン留め有効）→ ScrollTriggerの開始位置へ
        window.scrollTo({ top: st.start, behavior: "auto" });
    } else {
        // スマホ幅（ピン留め無効）→ 通常の要素位置へ
        const target = document.getElementById('main-event');
        if (target) {
            window.scrollTo({
                top: target.getBoundingClientRect().top + window.scrollY,
                behavior: "auto"
            });
        }
    }
}
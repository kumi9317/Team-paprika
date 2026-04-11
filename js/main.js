/*==================================
【slick]】 アフターパーティ　写真スライド
==================================*/
$(function() {
  $('.after-party__slider').slick({
    autoplay: true,        // 自動再生
    autoplaySpeed: 3000,   // 切り替え速度（3秒）
    dots: true,            // 下のドットナビを表示
    arrows: false,         // 左右の矢印を非表示（デザインに合わせる）
    infinite: true,        // ループ再生
    speed: 800,            // アニメーション自体の速度
    slidesToShow: 1,       // 1度に表示する枚数
    adaptiveHeight: true   // 画像の高さに自動調整
  });
});

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

    // メニュー内のリンク（aタグ）をクリックした時も閉じる
    // ページ内リンクで移動した後にメニューが開きっぱなしになるのを防ぎます
    $('.drawer-menu__item a').on('click', function() {
        $hamburger.removeClass('is-active');
        $drawer.removeClass('is-open');
        $overlay.removeClass('is-visible');
        $('body').removeClass('nav-open');
    });
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
                    trigger: ".main-event",
                    start: "top top",
                    end: "+=2000", 
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
});
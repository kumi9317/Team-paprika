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

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".main-event",
            start: "top top",
            // "bottom bottom" の代わりに、固定したい距離（px）を指定します
            // +=1500 などにすると、画面1.5個分くらいスクロールしたら固定が解けます
            end: "+=2000", 
            scrub: 1.5, 
            pin: true,
            // 余計な余白（padding）をGSAPが追加しないように設定
            pinSpacing: true, 
        }
    });s

    // --- 演出の中身はそのまま（durationの合計を意識して微調整） ---
    tl.to(".main-event__speed-line", { width: "100%", opacity: 0.6, duration: 4 })
      .to(".js-title", { opacity: 1, duration: 2 }, "-=2")

    // ② アイテム1の表示・非表示
    .to(".js-event-item:nth-of-type(1)", { opacity: 1, visibility: "visible", duration: 5 })
    .to(".js-event-item:nth-of-type(1)", { opacity: 0, duration: 3, delay: 5 })

    // ③ アイテム2の表示・非表示
    .to(".js-event-item:nth-of-type(2)", { opacity: 1, visibility: "visible", duration: 5 })
    .to(".js-event-item:nth-of-type(2)", { opacity: 0, duration: 3, delay: 5 })

    // ④ アイテム3の表示・★ここから追加：3つ目も消す
    .to(".js-event-item:nth-of-type(3)", { opacity: 1, visibility: "visible", duration: 5 })
    .to(".js-event-item:nth-of-type(3)", { opacity: 0, duration: 3, delay: 5 }) // 3つ目もふわっと消す

    // ⑤ ★締めくくり：タイトルとスピードラインも消して、背景を白に戻す準備
    .to(".js-title", { opacity: 0, duration: 2 }, "-=1")
    .to(".main-event__speed-line", { opacity: 0, duration: 2 }, "-=2")
    
    // ⑥ 最後に少しだけ「間」を置くことで、スクロールの終わりと同期させる
    .to({}, { duration: 5 }); 
});
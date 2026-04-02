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
// Mảng chứa ảnh của phần slider
var sliderArray = ["img/slider.jpg", "img/slider2.jpg"];

// Slider tự thay đổi
var sliderRandomImg;

function changeImgSlider() {
  var i = Math.round(Math.random() * 1); // ramdom trong khoảng từ 0 đến 1
  var sliderImg = document.getElementById("slider-img");
  sliderImg.src = sliderArray[i];
  sliderRandomImg = setTimeout("changeImgSlider()", 1000);
}

// // Khi vừa mở trình duyệt thì gọi hàm changeImgSlider
// window.onload = function() {
//   changeImgSlider();
// };

// Chuyển trang trên slider
var slider_index = 0; // index của mảng chứa slider
// Lùi slider
function sliderPrev() {
  slider_index--;
  if (slider_index < 0) {
    slider_index = sliderArray.length - 1;
  }
  var sliderImg = document.getElementById("slider-img");
  sliderImg.src = sliderArray[slider_index];
  if (slider_index == 0) {
    document.getElementById("sl-dot1").style.opacity = "unset";
    document.getElementById("sl-dot2").style.opacity = "0.3";
  } else {
    document.getElementById("sl-dot2").style.opacity = "unset";
    document.getElementById("sl-dot1").style.opacity = "0.3";
  }
}
// Chuyển slider
function sliderNext() {
  slider_index++;
  if (slider_index >= sliderArray.length) {
    slider_index = 0;
  }
  var sliderImg = document.getElementById("slider-img");
  sliderImg.src = sliderArray[slider_index];
  if (slider_index == 0) {
    document.getElementById("sl-dot1").style.opacity = "unset";
    document.getElementById("sl-dot2").style.opacity = "0.3";
  } else {
    document.getElementById("sl-dot2").style.opacity = "unset";
    document.getElementById("sl-dot1").style.opacity = "0.3";
  }
}

// Nút bấm truyển slider ở dưới slider
function sliderButtom1() {
  if (document.getElementsByClassName("slider-dot-1")) {
    slider_index = 0;
    var sliderImg = document.getElementById("slider-img");
    sliderImg.src = sliderArray[0];
    if (slider_index == 0) {
      document.getElementById("sl-dot1").style.opacity = "unset";
      document.getElementById("sl-dot2").style.opacity = "0.3";
    } else {
      document.getElementById("sl-dot2").style.opacity = "unset";
      document.getElementById("sl-dot1").style.opacity = "0.3";
    }
  }
}

function sliderButtom2() {
  if (document.getElementsByClassName("slider-dot-2")) {
    slider_index = 1;
    var sliderImg = document.getElementById("slider-img");
    sliderImg.src = sliderArray[1];
    if (slider_index == 0) {
      document.getElementById("sl-dot1").style.opacity = "unset";
      document.getElementById("sl-dot2").style.opacity = "0.3";
    } else {
      document.getElementById("sl-dot2").style.opacity = "unset";
      document.getElementById("sl-dot1").style.opacity = "0.3";
    }
  }
}
// import $ from "jquery";
// import { TweenMax } from "gsap";

const cursor = $(".cursor");
const follower = $(".cursor-follower");

let posX = 0,
  posY = 0,
  mouseX = 0,
  mouseY = 0;

TweenMax.to({}, 0.016, {
  repeat: -1,
  onRepeat: function () {
    posX += (mouseX - posX) / 9;
    posY += (mouseY - posY) / 9;

    TweenMax.set(follower, {
      css: {
        left: posX,
        top: posY,
      },
    });

    TweenMax.set(cursor, {
      css: {
        left: mouseX,
        top: mouseY,
      },
    });
  },
});

$(document).on("mousemove", function (e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  clearTimeout(moveTimer);

  cursor.addClass("is-moving");
  let moveTimer = setTimeout(() => {
    cursor.removeClass("is-moving");
  }, 1000);
});

$(document).on("mousedown", (e) => {
  follower.addClass("mousedown");
  console.log("added");
});

$(document).on("mouseup", (e) => {
  follower.removeClass("mousedown");
});

// yellow circle
$(".link").on("mouseenter", function () {
  cursor.addClass("active");
  follower.addClass("active");
});
$(".link").on("mouseleave", function () {
  cursor.removeClass("active");
  follower.removeClass("active");
});

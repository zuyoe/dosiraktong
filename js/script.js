window.onload = function () {
  // 상단 스크롤 기능
  const header = document.querySelector(".header");
  const mbt = document.querySelector(".mbt");
  let scy = 0;
  window.addEventListener("scroll", function () {
    // 스크롤 이동 픽셀값
    scy = this.document.documentElement.scrollTop;
    if (scy > 0) {
      header.classList.add("active");
      mbt.classList.add("active");
    } else {
      header.classList.remove("active");
      mbt.classList.remove("active");
    }
  });

  // 모바일 메뉴 클릭 처리
  const htmlRoot = document.querySelector("html");
  mbt.addEventListener("click", function () {
    // 현재 ani 클래스가 있는지 없는지 파악
    const state = this.classList.contains("ani");
    if (state) {
      this.classList.remove("ani");

      // 윈도우에 스크롤바가 나타난다.
      htmlRoot.classList.remove("active");
    } else {
      this.classList.add("ani");

      // 윈도우에 스크롤바가 없어진다.
      htmlRoot.classList.add("active");
    }
  });

  //  반응형 처리
  //  모바일 모양 초기화
  //  모바일 메뉴 초기화
  let winW = window.innerWidth;
  window.addEventListener("resize", function () {
    //  웹브라우저 안쪽 너비 
    winW = window.innerWidth;
    // mobile ===> PC 전환
    if (winW > 1024) {
      mbt.classList.remove("ani");
      htmlRoot.classList.remove("active");
    }
  });
};

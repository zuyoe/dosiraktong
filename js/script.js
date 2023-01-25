window.onload = function () {
  // 모달창 기능
  let modalWrap = document.querySelector(".modal-wrap");
  let modalClose = document.querySelector(".modal-close");
  modalClose.addEventListener("click", function () {
    modalWrap.classList.add("fadeOut");
    modalWrap.addEventListener("animationend", () => {
      modalWrap.style.display = "none";
    });
  });

  // AOS 셋팅
  AOS.init();

  // 상단 스크롤 기능
  const header = document.querySelector(".header");
  const mbt = document.querySelector(".mbt");
  let scy = 0;
  // 새로 고침 / URL 입력해서 html 출력시
  // 1. 스크롤바의 픽셀 위치값을 파악해서
  scy = window.document.documentElement.scrollTop;
  // 2. class 적용 여부결정
  if (scy > 0) {
    // 스크롤이 된 상태로 새로고침 됨.
    header.classList.add("active");
    mbt.classList.add("active");
  }

  window.addEventListener("scroll", function () {
    // 스크롤 이동 픽셀값
    scy = this.document.documentElement.scrollTop;
    if (scy > 0) {
      // 스크롤이 되었다면
      header.classList.add("active");
      mbt.classList.add("active");
    } else {
      // 스크롤이 되지 않은 상태이면서 !!!!!!
      const state = navMb.classList.contains("active");
      if (state) {
        // 만약에 모바일 메뉴가 펼쳐진 상태라면
        header.classList.add("active");
        mbt.classList.add("active");
      } else {
        // 그렇지 않다면 원래대로 처리하고..
        header.classList.remove("active");
        mbt.classList.remove("active");
      }
    }
  });

  // 모바일 메뉴 클릭 처리
  const htmlRoot = document.querySelector("html");
  const navMb = document.querySelector(".nav-mb");

  mbt.addEventListener("click", function () {
    // 현재 ani 클래스가 있는지 없는지 파악
    const state = this.classList.contains("ani");
    if (state) {
      this.classList.remove("ani");
      // 윈도우에 스크롤바가 나타난다.
      htmlRoot.classList.remove("active");
      // 모바일 메뉴 숨기기
      navMb.classList.remove("active");
      if (scy > 0) {
        // 스크롤이 되었다면
        header.classList.add("active");
        mbt.classList.add("active");
      } else {
        // 스크롤이 안된 상태라면
        header.classList.remove("active");
        mbt.classList.remove("active");
      }
    } else {
      this.classList.add("ani");
      // 윈도우에 스크롤바가 없어진다.
      htmlRoot.classList.add("active");
      // 모바일 메뉴 보이기
      navMb.classList.add("active");
      // 헤더 모양 변경 css 적용
      header.classList.add("active");
      mbt.classList.add("active");
    }
  });

  // 반응형 처리
  // 모바일 버튼 모양 초기화
  // 모바일 메뉴 초기화
  let winW = window.innerWidth;
  window.addEventListener("resize", function () {
    // 웹브라우저 안쪽 너비
    winW = window.innerWidth;
    // mobile ===> pc 전환
    if (winW > 1024) {
      mbt.classList.remove("ani");
      htmlRoot.classList.remove("active");
      navMb.classList.remove("active");

      if (scy > 0) {
        // 스크롤이 된 상태에서 화면 리사이징..
        header.classList.add("active");
        mbt.classList.add("active");
      } else {
        // 스크롤 안됨. 화면 리사이징..
        header.classList.remove("active");
        mbt.classList.remove("active");
      }
    }
  });
  // 비주얼 슬라이드
  // 1. 슬라이드(.swiper-slide) 개수 만큼 li 를 생성하기
  const swSlideCount = document.querySelectorAll(
    ".sw-visual .swiper-slide"
  ).length;

  // 2. li 태그 출력 장소(UL 태그) 저장
  const swSlidePgUl = document.querySelector(".sw-visual-pg-list");

  // 3. li 에 html 로 작성할 글자를 생성한다.
  let swVisualHtml = ``;
  for (let i = 0; i < swSlideCount; i++) {
    swVisualHtml = swVisualHtml + `<li>${i + 1}</li>`;
  }

  // 4. html 을 추가해 준다.
  swSlidePgUl.innerHTML = swVisualHtml;

  // 5. 페이지네이션 관련 (코딩으로 생성한 li 태그 저장)
  const swViusalPgLi = document.querySelectorAll(".sw-visual-pg-list > li");

  // console.log(swViusalPgLi);
  const swiper = new Swiper(".sw-visual", {
    effect: "fade",
    // fadeEffect: {
    //   crossFade: true,
    // },
    loop: true,
    // 슬라이드의 모션 속도를 transition 맞춘다.
    speed: 1500,
    autoplay: {
      delay: 2500,
      // 사용자가 마우스 클릭 드래그로 이동하면
      // 아래 구문이 없으면 autoplya 가 해제되므로
      // 이것을 방지해 주기위한 처리
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".sw-visual-next",
      prevEl: ".sw-visual-prev",
    },
  });

  // Swiper 가 최초 실행될 때
  // 1 번 li 의 흰색 라인이 늘어나는 모션을 실행
  swViusalPgLi[0].classList.add("active");

  // Swiper 가 바뀔 때 마다 실행
  // 슬라이더가 바뀌는 상태를 찾아서
  // 우리가 적용하고자 하는 처리를 하고자.
  // Swiper 의  API 를 참조 해서 작성
  swiper.on("slideChange", function () {
    // realIndex   는 진짜 html 태그의 순서값
    // activeIndex 는 모션이 되는 요소의 순서값
    // loop: true 라면 2개가 추가된다.
    //       자연스러운 모션을 위해서 2개가 추가된다.
    //       realIndex 와 activeIndex 는 개수가 다르다.

    // loop: false 라면
    //       realIndex 와 activeIndex 는 개수가 같다.

    // console.log("slide changed", swiper.realIndex, swiper.activeIndex);
    // LI 태그를 모두 초기화 한다.
    // 현재 모션이 일어나는 슬라이드 번호(realIndex) 클래스 적용
    swViusalPgLi.forEach((item, index) => {
      if (swiper.realIndex === index) {
        // 같은 순서는 모션을 하라
        item.classList.add("active");
      } else {
        // 다른 순서는 모션을 제거하라.
        item.classList.remove("active");
      }
    });
  });

  // li 태그를 클릭을 하면 처리하기
  swViusalPgLi.forEach((item, index) => {
    item.addEventListener("click", function () {
      // slideToLoop를 이용하면 원하는 페이지로 보낼 수 있다.
      // slideToLoop(index, speed, runCallbacks)
      swiper.slideToLoop(index, 500, false);
    });
  });

  // business slide
  const swBusiness = new Swiper(".sw-business", {
    slidesPerView: 1,
    spaceBetween: 0,
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });

  // business-modal 기능
  const businessModal = document.querySelector(".business-modal");
  businessModal.addEventListener("click", function () {
    businessModal.style.display = "none";
  });

  // 위로가기 스크롤바 구현
  const gotop = document.querySelector(".gotop");
  gotop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // footer 의 상단 위치 픽셀값 파악.
  let waypoint_footer = new Waypoint({
    element: document.querySelector(".footer"),
    handler: function (direction) {
      // console.log(direction);
      if (direction === "down") {
        gotop.classList.add("active-footer");
      } else {
        gotop.classList.remove("active-footer");
      }
    },
    offset: "95%",
  });

  let waypoint_service = new Waypoint({
    element: document.querySelector(".service"),
    handler: function (direction) {
      // console.log(direction);
      if (direction === "down") {
        gotop.classList.add("active");
      } else {
        gotop.classList.remove("active");
      }
    },
    offset: "80%",
  });
};

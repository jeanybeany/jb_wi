document.addEventListener('contextmenu', function (e) {
  if (e.target.tagName === 'IMG') {
    e.preventDefault();
  }

  e.preventDefault();
});

document.querySelectorAll('img').forEach(img => {
  img.addEventListener('dragstart', function(e) {
    e.preventDefault();
  });
});

document.addEventListener('dragstart', function(e) {
  e.preventDefault();
});
function toggleGallery() {
  var morePhotos = document.getElementById("morePhotos");
  var btn = document.getElementById("btnMoreGallery");

  // 현재 max-height가 0이면 (숨겨진 상태)
  if (!morePhotos.classList.contains("open")) {
    // open 클래스를 추가하여 슬라이드 다운 효과 적용
    morePhotos.classList.add("open");
    btn.textContent = "감추기";
  } else {
    // open 클래스를 제거하여 슬라이드 업 효과 적용
    morePhotos.classList.remove("open");
    btn.textContent = "더보기";
  }
}
// 갤러리 슬라이더를 위한 popup 객체
var popup = {
  currentIndex: 0,
  galleryImages: [],
  // DOM에서 모든 이미지 경로를 수집
  init: function() {
    var imgs = document.querySelectorAll('.photo_box img');
    this.galleryImages = Array.from(imgs).map(function(img) {
      return img.getAttribute('src');
    });
  },
  // 슬라이더 열기
  openSlider: function(index) {
    this.currentIndex = index;
    this.updateSlider();
    document.getElementById('sliderPopup').classList.add('active');
  },
  // 슬라이더 닫기
  closeSlider: function() {
    document.getElementById('sliderPopup').classList.remove('active');
  },
  // 슬라이더 이미지 업데이트
  updateSlider: function() {
    document.getElementById('sliderImage').src = this.galleryImages[this.currentIndex];
  },
  // 오른쪽(다음) 이미지로 이동
  nextSlider: function(event) {
    event.stopPropagation(); // 부모 클릭 이벤트 전파 방지
    this.currentIndex = (this.currentIndex + 1) % this.galleryImages.length;
    this.updateSlider();
  },
  // 왼쪽(이전) 이미지로 이동
  prevSlider: function(event) {
    event.stopPropagation();
    this.currentIndex = (this.currentIndex - 1 + this.galleryImages.length) % this.galleryImages.length;
    this.updateSlider();
  }
};

document.addEventListener("DOMContentLoaded", function () {

  popup.init();

  const notiTabs = document.querySelectorAll(".noti-tab");
  const notiIndicator = document.querySelector(".noti-indicator");
  const notiContents = document.querySelectorAll(".noti-tab-content");

  // 각 탭 클릭 이벤트 처리
  notiTabs.forEach(tab => {
    tab.addEventListener("click", function() {
      // 활성화 전 모든 탭과 콘텐츠에서 active 제거
      notiTabs.forEach(t => t.classList.remove("active"));
      notiContents.forEach(c => c.classList.remove("active"));

      // 클릭한 탭에 active 추가
      const index = parseInt(this.getAttribute("data-index"), 10);
      this.classList.add("active");

      // 해당 콘텐츠 표시
      const activeContent = document.querySelector(`.noti-tab-content[data-index="${index}"]`);
      if (activeContent) {
        activeContent.classList.add("active");
      }

      // 인디케이터 이동: 각 탭의 너비가 동일할 경우, left를 index * 33.33%로 설정
      notiIndicator.style.left = (index * 33.33) + "%";
    });
  });
  const notiReceptionTabs = document.querySelectorAll(".noti-reception-tab");
  const notiReceptionIndicator = document.querySelector(".noti-reception-indicator");
  const notiReceptionContents = document.querySelectorAll(".noti-reception-tab-content");

  // 각 탭 클릭 이벤트 처리
  notiReceptionTabs.forEach(tab => {
    tab.addEventListener("click", function() {
      // 활성화 전 모든 탭과 콘텐츠에서 active 제거
      notiReceptionTabs.forEach(t => t.classList.remove("active"));
      notiReceptionContents.forEach(c => c.classList.remove("active"));

      // 클릭한 탭에 active 추가
      const Receptionindex = parseInt(this.getAttribute("data-index"), 10);
      this.classList.add("active");

      // 해당 콘텐츠 표시
      const activeContent = document.querySelector(`.noti-reception-tab-content[data-index="${Receptionindex}"]`);
      if (activeContent) {
        activeContent.classList.add("active");
      }

      // 인디케이터 이동: 각 탭의 너비가 동일할 경우, left를 index * 33.33%로 설정
      notiReceptionIndicator.style.left = (Receptionindex * 50) + "%";
    });
  });
  // 음악 재생/일시정지 버튼 동작
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const musicIcon = document.getElementById('musicIcon');
  const bgMusic = document.getElementById('bgMusic');

  musicToggleBtn.addEventListener('click', function() {
    if (bgMusic.paused) {
      bgMusic.play();
      // 재생 상태: play 아이콘 대신 pause 아이콘으로 변경
      musicIcon.src = './images/music_stop.png'
      musicIcon.classList.remove('fa-play');
      musicIcon.classList.add('fa-pause');
    } else {
      bgMusic.pause();
      musicIcon.src = './images/music_start.png'

      musicIcon.classList.remove('fa-pause');
      musicIcon.classList.add('fa-play');
    }
  });

  const detailsSection = document.getElementById('details');
  const header = document.querySelector('header');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // details 섹션이 화면에 거의 보이지 않을 때 (threshold 0.1 이하)
      if (entry.intersectionRatio < 0.1) {
        header.classList.add('visible');
      } else {
        header.classList.remove('visible');
      }
    });
  }, { threshold: [0, 0.1] });

  if(detailsSection) {
    observer.observe(detailsSection);
  }

  const tocToggleBtn = document.getElementById("tocToggleBtn");
  const tocSidebar = document.getElementById("tocSidebar");
  const tocItems = document.querySelectorAll(".toc-item");

  // 헤더 버튼 클릭 시 목차 탭 토글
  tocToggleBtn.addEventListener("click", function() {
    tocSidebar.classList.toggle("open");
  });

  // 목차 항목 클릭 시 목차 탭을 닫고 해당 섹션으로 이동
  tocItems.forEach(item => {
    item.addEventListener("click", function() {
      // 탭을 닫음
      tocSidebar.classList.remove("open");
      // 기본 앵커 동작(해당 섹션으로 이동)은 그대로 유지
    });
  });

  const tocCloseBtn = document.getElementById("tocCloseBtn");

  tocCloseBtn.addEventListener("click", function() {
    tocSidebar.classList.remove("open");
  });

  tocItems.forEach(item => {
    item.addEventListener("click", function() {
      tocSidebar.classList.remove("open");
    });
  });
  // 예식일시 설정 (wedding.html의 내용에 맞춤: 2025년 6월 14일 오후 1시)
  const weddingDate = dayjs("2025-06-14T13:00:00");

  // 달력 영역 요소 확인 후 달력 생성
  const weddingCalendarContainer = document.getElementById("weddingCalendar");
  if (weddingCalendarContainer) {
    const weeks = getweddingCalendarDataset(weddingDate);
    renderweddingCalendar(weeks, weddingCalendarContainer, weddingDate);
  }
  // D-day 카운터 영역 요소 확인 후 즉시 갱신하고 1초마다 업데이트
  const weddingdDayContainer = document.getElementById("weddingdDayCounter");
  if (weddingdDayContainer) {
    updateweddingDDayCounter(weddingDate);
    setInterval(() => updateweddingDDayCounter(weddingDate), 1000);
  }

  // 드롭다운 토글 기능
  const dropdownLabels = document.querySelectorAll('.common-dropdown-label-groom, .common-dropdown-label-bride');

  dropdownLabels.forEach(label => {
    label.addEventListener('click', function() {
      // 레이블 open 클래스 토글
      label.classList.toggle('open');
      // 바로 다음 형제 요소(내용)를 찾아 open 클래스 토글
      const content = label.nextElementSibling;
      if (content) {
        slideToggle(content, 300); // 1초 동안 토글 애니메이션
      }
    });
  });
  // 계좌번호 복사 기능: 버튼에 클래스 .bank-copy 등으로 구분할 수도 있음
  const copyButtons = document.querySelectorAll('button.bank-copy');
  copyButtons.forEach(button => {
    button.addEventListener('click', function() {
      // 버튼이 속한 gift-info-content 영역을 찾습니다.
      const giftInfo = button.closest('.gift-info-content');
      if (!giftInfo) return;
      // 그 영역 내에서 계좌번호가 있는 요소(.bank p.account)를 찾습니다.
      const accountElem = giftInfo.querySelector('.bank p.account');
      if (!accountElem) return;
      const accountText = accountElem.textContent.trim();
      // 클립보드에 복사
      navigator.clipboard.writeText(accountText)
        .then(() => {
          alert("계좌번호가 복사되었습니다: " + accountText);
        })
        .catch(err => {
          console.error("복사 실패:", err);
          alert("복사에 실패했습니다.");
        });
    });
  });

  // T맵 버튼 클릭 이벤트
  document.getElementById("btnOpenTMap").addEventListener("click", function() {
    window.open("tmap://route?rGoName=연세동문회관웨딩홀&rGoX=126.942441&rGoY=37.562772", "_blank");
  });

  // 카카오내비 버튼 클릭 이벤트
  document.getElementById("btnOpenKakaoNavi").addEventListener("click", function() {
    window.open("https://map.kakao.com/link/to/연세대학교동문회관예식장,37.562772,126.942441", "_blank");
  });

  // 네이버지도 버튼 클릭 이벤트
  document.getElementById("btnOpenNaverMap").addEventListener("click", function() {
    window.open("nmap://route/car?dlat=37.562772&dlng=126.942441&dname=%EC%97%B0%EC%84%B8%EB%8F%99%EB%AC%B8%ED%9A%8C%EA%B4%80%EC%98%88%EC%8B%9D%EC%9E%A5", "_blank");
  });



  /**
   * getweddingCalendarDataset(date)
   * ─ 지정한 날짜의 달(월)을 기준으로 한 주 단위(일요일부터 시작)의 달력 데이터를 생성
   * @param {dayjs} date - 기준 날짜 (예식일시)
   * @returns {Array} 각 주가 7칸(문자열 배열)인 달력 데이터
   */
  function getweddingCalendarDataset(date) {
    const year = date.year();
    const month = date.month(); // 0-indexed (0: 1월, 1: 2월, …)
    const firstDayOfMonth = dayjs(new Date(year, month, 1));
    const daysInMonth = firstDayOfMonth.daysInMonth();

    // firstDayOfMonth.day()는 0(일요일) ~ 6(토요일)
    const startDayOfWeek = firstDayOfMonth.day();

    const weeks = [];
    let week = new Array(7).fill("");
    let dayCounter = 1;

    // 첫 주: startDayOfWeek 이전은 빈칸으로, 그 이후 채워줌
    for (let i = startDayOfWeek; i < 7; i++) {
      week[i] = String(dayCounter);
      dayCounter++;
    }
    weeks.push(week);

    // 이후 주들을 채움
    while (dayCounter <= daysInMonth) {
      week = new Array(7).fill("");
      for (let i = 0; i < 7 && dayCounter <= daysInMonth; i++) {
        week[i] = String(dayCounter);
        dayCounter++;
      }
      weeks.push(week);
    }
    return weeks;
  }

  /**
   * renderweddingCalendar(weeks, container, weddingDate)
   * ─ 주 단위 달력 데이터를 HTML 테이블 형태로 렌더링
   * @param {Array} weeks - 각 주가 7칸인 문자열 배열 데이터
   * @param {HTMLElement} container - 달력을 삽입할 요소
   * @param {dayjs} weddingDate - 예식일시 (하이라이트용)
   */
  function renderweddingCalendar(weeks, container, weddingDate) {
    const table = document.createElement("table");

    // 테이블 헤더 생성 (요일 이름: 일, 월, 화, 수, 목, 금, 토)
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    daysOfWeek.forEach(day => {
      const th = document.createElement("th");
      th.textContent = day;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // 테이블 본문 생성: 각 주의 날짜 데이터 삽입
    const tbody = document.createElement("tbody");
    weeks.forEach(week => {
      const tr = document.createElement("tr");
      week.forEach(dayStr => {
        const td = document.createElement("td");
        td.textContent = dayStr;
        // 예식 날짜(숫자)가 일치하면 하이라이트 (CSS에서 .highlight 스타일 정의 필요)
        if (dayStr === String(weddingDate.date())) {
          td.classList.add("highlight");
        }
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    container.innerHTML = "";
    container.appendChild(table);
  }

  /**
   * updateweddingDDayCounter(weddingDate)
   * ─ 예식일시를 기준으로 현재까지 남은(또는 지난) 시간(일, 시간, 분, 초)을 계산하여 표시
   * @param {dayjs} weddingDate - 예식일시
   */
  function updateweddingDDayCounter(weddingDate) {
    const now = dayjs();
    let diff = weddingDate.diff(now); // 밀리초 차이
    let label = diff >= 0 ? "결혼식까지 " : "결혼식이 끝난 지 ";
    let sentence = diff >= 0 ? "남았습니다" : "지났습니다";
    if (diff < 0) diff = Math.abs(diff);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    const counterText = `${label}\n${days}일 ${hours}시간 ${minutes}분 ${seconds}초\n${sentence}`;

    const counterElem = document.getElementById("weddingdDayCounter");
    if (counterElem) {
      counterElem.textContent = counterText;
    }
  }
  /**
   * updatereceptionDDayCounter(receptionDate)
   * ─ 예식일시를 기준으로 현재까지 남은(또는 지난) 시간(일, 시간, 분, 초)을 계산하여 표시
   * @param {dayjs} receptionDate - 예식일시
   */
  function updatereceptionDDayCounter(receptionDate) {
    const now = dayjs();
    let diff = receptionDate.diff(now); // 밀리초 차이
    let label = diff >= 0 ? "피로연까지 " : "피로연이 끝난 지";
    let sentence = diff >= 0 ? "남았습니다" : "지났습니다";
    if (diff < 0) diff = Math.abs(diff);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    const counterText = `${label}\n${days}일 ${hours}시간 ${minutes}분 ${seconds}초\n${sentence}`;

    const counterElem = document.getElementById("receptiondDayCounter");
    if (counterElem) {
      counterElem.textContent = counterText;
    }
  }

  function slideToggle(element, duration = 1000) {
    // 현재 요소의 display 스타일을 확인하여 닫힘 여부 판단
    const computedStyle = window.getComputedStyle(element);
    const isHidden = computedStyle.display === 'none';

    if (isHidden) {
      // 슬라이드 다운: 요소를 보이게 하고 높이를 0에서 목표 높이까지 늘림
      element.style.display = 'block';
      element.style.overflow = 'hidden';
      element.style.height = '0px';
      const targetHeight = element.scrollHeight;
      let startTime = null;

      function slideDown(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        element.style.height = (targetHeight * progress) + 'px';
        if (progress < 1) {
          requestAnimationFrame(slideDown);
        } else {
          // 애니메이션 종료 후 원래 높이로 복원(자동 높이)
          element.style.height = null;
          element.style.overflow = null;
        }
      }
      requestAnimationFrame(slideDown);
    } else {
      // 슬라이드 업: 요소의 현재 높이에서 0으로 줄임
      element.style.overflow = 'hidden';
      const currentHeight = element.scrollHeight;
      let startTime = null;

      function slideUp(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        element.style.height = (currentHeight * (1 - progress)) + 'px';
        if (progress < 1) {
          requestAnimationFrame(slideUp);
        } else {
          element.style.display = 'none';
          element.style.height = null;
          element.style.overflow = null;
        }
      }
      requestAnimationFrame(slideUp);
    }
  }

  // 화살표 버튼 표시 업데이트 (첫 이미지면 왼쪽 숨김, 마지막 이미지면 오른쪽 숨김)
  function updateArrows() {
    if (currentIndex === 0) {
      arrowLeft.style.display = "none";
    } else {
      arrowLeft.style.display = "block";
    }
    if (currentIndex === galleryArray.length - 1) {
      arrowRight.style.display = "none";
    } else {
      arrowRight.style.display = "block";
    }
  }

});

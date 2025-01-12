document.addEventListener("wheel", (event) => {
  if (event.deltaY > 0) {
    // 下にスクロール
    scrollNext();
  } else {
    // 上にスクロール
    scrollPrev();
  }
});

// スワイプの処理を追加
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener("touchstart", (event) => {
  touchStartY = event.changedTouches[0].screenY;
});

document.addEventListener("touchend", (event) => {
  touchEndY = event.changedTouches[0].screenY;
  handleSwipe();
});

function handleSwipe() {
  if (touchStartY - touchEndY > 50) {
    // 上にスワイプ
    scrollNext();
  } else if (touchEndY - touchStartY > 50) {
    // 下にスワイプ
    scrollPrev();
  }
}

let currentSection = 0;
const sections = document.querySelectorAll(".section");

function scrollNext() {
  if (currentSection < sections.length - 1) {
    currentSection++;
    scrollToSection();
  }
}

function scrollPrev() {
  if (currentSection > 0) {
    currentSection--;
    scrollToSection();
  }
}

function scrollToSection() {
  sections[currentSection].scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

window.addEventListener("scroll", () => {
  const threshold = window.innerHeight * 0.5;
  let foundSection = false;

  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    if (!foundSection && rect.top < threshold && rect.bottom > threshold) {
      currentSection = index;
      foundSection = true;
    }
  });
});

document.querySelectorAll(".next-section-btn").forEach((button, index) => {
  button.addEventListener("click", (event) => {
    event.preventDefault(); // デフォルトのリンク動作を無効化
    const sections = document.querySelectorAll(".section");
    const nextIndex = (index + 1) % sections.length; // 次のセクションを取得（最後なら最初に戻る）
    sections[nextIndex].scrollIntoView({ behavior: "smooth" }); // スムーズスクロール
  });
});

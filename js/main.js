document.addEventListener("wheel", (event) => {
  if (event.deltaY > 0) {
    // 下にスクロール
    scrollNext();
  } else {
    // 上にスクロール
    scrollPrev();
  }
});

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

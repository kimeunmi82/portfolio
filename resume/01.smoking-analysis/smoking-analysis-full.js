const slides = Array.from(document.querySelectorAll(".slide"));
const chapterLinks = Array.from(document.querySelectorAll(".slide-index nav a"));
const status = document.querySelector("#page-status");
const progressBar = document.querySelector("#progress-bar");
const previousButton = document.querySelector("#previous-slide");
const nextButton = document.querySelector("#next-slide");

let currentPage = 1;

function updateViewer(page) {
  currentPage = Math.min(Math.max(page, 1), slides.length);
  status.textContent = `${String(currentPage).padStart(2, "0")} / ${slides.length}`;
  progressBar.style.width = `${(currentPage / slides.length) * 100}%`;
  previousButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === slides.length;

  slides.forEach((slide) => {
    slide.classList.toggle("current", Number(slide.dataset.page) === currentPage);
  });

  chapterLinks.forEach((link) => {
    const [start, end] = link.dataset.range.split("-").map(Number);
    link.classList.toggle("active", currentPage >= start && currentPage <= end);
  });
}

function goToPage(page) {
  const target = slides[page - 1];
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible) {
      updateViewer(Number(visible.target.dataset.page));
    }
  },
  { rootMargin: "-18% 0px -58%", threshold: [0.1, 0.3, 0.6] },
);

slides.forEach((slide) => observer.observe(slide));

previousButton.addEventListener("click", () => goToPage(currentPage - 1));
nextButton.addEventListener("click", () => goToPage(currentPage + 1));

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    goToPage(currentPage - 1);
  }
  if (event.key === "ArrowRight") {
    goToPage(currentPage + 1);
  }
});

updateViewer(1);

const header = document.querySelector(".site-header");

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

document.querySelectorAll("[data-scroll-target]").forEach((button) => {
  const gallery = document.getElementById(button.dataset.scrollTarget);
  const frame = gallery?.closest(".scroll-gallery-frame");

  const updateGalleryState = () => {
    frame?.classList.toggle("has-scrolled", (gallery?.scrollLeft || 0) > 8);
  };

  updateGalleryState();
  gallery?.addEventListener("scroll", updateGalleryState, { passive: true });

  button.addEventListener("click", () => {
    if (!gallery) return;

    const direction = Number(button.dataset.scrollDirection || 1);
    const atEnd = gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth - 8;
    const atStart = gallery.scrollLeft <= 8;
    const distance = gallery.clientWidth * 0.85;

    gallery.scrollBy({
      left: direction > 0 && atEnd ? -gallery.scrollWidth : direction < 0 && atStart ? gallery.scrollWidth : distance * direction,
      behavior: "smooth",
    });
  });
});

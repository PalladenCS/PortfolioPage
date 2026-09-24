const sidebarImages = document.querySelectorAll('.sidebar-image');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduceMotion || !('IntersectionObserver' in window)) {
    sidebarImages.forEach((image) => image.classList.add('is-visible'));
} else {
    const revealImage = (image) => {
        image.classList.add('is-pending');
    };

    sidebarImages.forEach(revealImage);

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    sidebarImages.forEach((image) => imageObserver.observe(image));
}

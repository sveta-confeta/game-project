document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    const main = document.querySelector('.main-page');

    const fixedHeaderHeight = 152;

    function handleScroll() {
        if (window.innerWidth < 768) {
            if (window.scrollY > 0) {
                header.classList.add('header--fixed');
                main.style.paddingTop = `${fixedHeaderHeight}px`;
            } else {
                header.classList.remove('header--fixed');
                main.style.paddingTop = `${fixedHeaderHeight}px`;
            }
        } else {
            if (window.scrollY > 0) {
                header.classList.add('shadow');
            } else {
                header.classList.remove('shadow');
            }
            main.style.paddingTop = '0';
        }
    }

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
});

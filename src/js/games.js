document.addEventListener('DOMContentLoaded', function () {
    const nav = document.querySelector('.games__nav');
    const gamesList = document.querySelector('.games__nav-list');
    const gamesListWrap = document.querySelector('.games__list-wrap');
    const navOffsetTop = nav ? nav.getBoundingClientRect().top + window.scrollY - 80 : null;

    const list = document.querySelector('.games__list');
    const cardsContainer = document.querySelector('.games__list-cards');
    const navLinks = document.querySelectorAll('.games__nav-list a');
    const cards = cardsContainer ? cardsContainer.querySelectorAll('.card') : [];
    const filterButtons = document.querySelectorAll('.games__filter-btn');
    let isManualScroll = false;

    if (!nav || !gamesList || !gamesListWrap || !list || !cardsContainer || navLinks.length === 0) {
        return;
    }

    function scrollToCard(letter) {
        let found = false;
        for (const card of cards) {
            const cardTitleElement = card.querySelector('.title');
            if (!cardTitleElement) continue;

            const cardTitle = cardTitleElement.textContent.trim();
            if (cardTitle[0].toUpperCase() === letter) {
                const topOffset = card.getBoundingClientRect().top + window.scrollY - 120;
                window.scrollTo({top: topOffset, behavior: 'smooth'});
                found = true;
                break;
            }
        }

        if (!found) {
            navLinks.forEach(link => {
                const linkText = link.textContent.trim();
                link.classList.toggle('highlighted', linkText === letter);
            });
        }
    }

    function updateNavHighlight() {
        if (isManualScroll) return;

        let firstVisibleCard = null;
        const offsetTop = 90;

        for (const card of cards) {
            const cardRect = card.getBoundingClientRect();
            if (cardRect.top >= offsetTop && cardRect.top < window.innerHeight) {
                firstVisibleCard = card;
                break;
            }
        }

        const firstCharElement = firstVisibleCard ? firstVisibleCard.querySelector('.title') : null;
        const firstChar = firstCharElement ? firstCharElement.textContent.trim()[0].toUpperCase() : null;

        navLinks.forEach(link => {
            const linkText = link.textContent.trim();
            const parentLi = link.parentElement;

            if (firstChar && linkText === firstChar) {
                link.classList.add('highlighted');
                if (parentLi) {
                    if (window.innerWidth < 768) {
                        parentLi.style.paddingTop = '2px';
                        parentLi.style.paddingBottom = '2px';
                    } else {
                        parentLi.style.paddingTop = '15px';
                        parentLi.style.paddingBottom = '19px';
                    }
                }
            } else {
                link.classList.remove('highlighted');
                if (parentLi) {
                    parentLi.style.paddingTop = '';
                    parentLi.style.paddingBottom = '';
                }
            }
        });
    }

    list.addEventListener('scroll', updateNavHighlight);
    window.addEventListener('scroll', updateNavHighlight);

    updateNavHighlight();


    let activeLetter = null;

    nav.addEventListener('touchmove', function (event) {
        if (window.innerWidth > 767) return;

        event.preventDefault();
        const touch = event.touches[0];
        const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);

        if (targetElement && targetElement.tagName === 'A') {
            const targetLetter = targetElement.textContent.trim().toUpperCase();
            if (activeLetter !== targetLetter) {
                activeLetter = targetLetter;
                navLinks.forEach(link => {
                    link.classList.remove('highlighted');
                    const parentLi = link.parentElement;
                    if (parentLi) {
                        parentLi.style.paddingTop = '';
                        parentLi.style.paddingBottom = '';
                    }
                });
                targetElement.classList.add('highlighted');

                const parentLi = targetElement.parentElement;
                if (parentLi) {
                    parentLi.style.paddingTop = '2px';
                    parentLi.style.paddingBottom = '2px';
                }
            }
        }
    }, {passive: false});

    nav.addEventListener('touchend', function (event) {
        if (window.innerWidth > 767) return;

        if (activeLetter) {
            scrollToCard(activeLetter);
            activeLetter = null;
        }
    });


    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            navLinks.forEach(navLink => {
                navLink.classList.remove('highlighted');
                const parentLi = navLink.parentElement;
                if (parentLi) {
                    parentLi.style.paddingTop = '';
                    parentLi.style.paddingBottom = '';
                }
            });

            const targetLetter = link.textContent.trim().toUpperCase();
            scrollToCard(targetLetter);

            link.classList.add('highlighted');
            const parentLi = link.parentElement;
            if (parentLi) {
                if (window.innerWidth < 768) {
                    parentLi.style.paddingTop = '2px';
                    parentLi.style.paddingBottom = '2px';
                } else {
                    parentLi.style.paddingTop = '15px';
                    parentLi.style.paddingBottom = '19px';
                }
            }

            isManualScroll = true;
            setTimeout(() => {
                isManualScroll = false;
            }, 1000);
        });
    });

    function adjustGridColumns() {
        const cards = Array.from(document.querySelectorAll('.game-status-card, .game-card'));

        cards.forEach(card => card.classList.remove('auto-expand'));

        let rowStart = 0;
        let rowEnd = 0;
        let totalColumns = 6;

        while (rowEnd < cards.length) {
            while (rowEnd < cards.length && cards[rowEnd].offsetTop === cards[rowStart].offsetTop) {
                rowEnd++;
            }

            const rowCards = cards.slice(rowStart, rowEnd);
            const hasGameStatus = rowCards.some(card => card.classList.contains('game-status-card'));
            const hasGameCard = rowCards.some(card => card.classList.contains('game-card'));

            if (hasGameStatus && hasGameCard) {
                rowCards.forEach(card => {
                    if (card.classList.contains('game-status-card')) {
                        card.classList.add('auto-expand');
                    }
                });
            }

            rowStart = rowEnd;
        }
    }

    window.addEventListener('load', adjustGridColumns);
    window.addEventListener('resize', adjustGridColumns);

    filterButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

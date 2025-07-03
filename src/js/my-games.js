document.addEventListener('DOMContentLoaded', function() {
    const myGames = document.getElementById('my-games');
    const closeButton = myGames.querySelector('.my-games__btn');
    const popup = document.getElementById('favorites-message-modal-header');

    const myGamesContainer = myGames.querySelector('.my-games__list');
    const items = myGamesContainer.querySelectorAll('.my-games__list-item');

    if (items.length === 3) {
        myGamesContainer.classList.add('three-items');
        myGamesContainer.classList.remove('four-items');
    } else if (items.length === 4) {
        myGamesContainer.classList.add('four-items');
        myGamesContainer.classList.remove('three-items');
    }

    let isFirstClose = true;

    closeButton.addEventListener('click', function() {
        myGames.style.height = myGames.scrollHeight + 'px';
        const paddingTop = window.getComputedStyle(myGames).paddingTop;
        const paddingBottom = window.getComputedStyle(myGames).paddingBottom;
        const marginTop = window.getComputedStyle(myGames).marginTop;
        const marginBottom = window.getComputedStyle(myGames).marginBottom;

        myGames.style.paddingTop = paddingTop;
        myGames.style.paddingBottom = paddingBottom;
        myGames.style.marginTop = marginTop;
        myGames.style.marginBottom = marginBottom;

        myGames.style.transition = 'height 0.8s ease, padding 0.8s ease, margin 0.8s ease';
        myGames.style.overflow = 'hidden';

        requestAnimationFrame(() => {
            myGames.style.height = '0';
            myGames.style.paddingTop = '0';
            myGames.style.paddingBottom = '0';
            myGames.style.marginTop = '0';
            myGames.style.marginBottom = '0';
        });

        if (isFirstClose) {
            popup.classList.remove('visually-hidden');
            isFirstClose = false;
        }
    });
});


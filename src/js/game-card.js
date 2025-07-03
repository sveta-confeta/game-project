document.addEventListener('DOMContentLoaded', function() {
    function handleButtonClick(buttons) {
        return function() {
            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        }
    }

    function addClickHandlers(containerSelector, buttonSelector) {
        const containers = document.querySelectorAll(containerSelector);
        containers.forEach(container => {
            const buttons = container.querySelectorAll(buttonSelector);
            buttons.forEach(button => {
                button.addEventListener('click', handleButtonClick(buttons));
            });
        });
    }

    addClickHandlers('.game-card', '.game-card__item-btn');
    addClickHandlers('.game-status-card', '.game-status-card__item-btn');
});

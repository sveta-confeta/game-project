
document.addEventListener('DOMContentLoaded', () => {
    const favorites = document.querySelector('.favorites');
    const favoriteButtons = document.querySelectorAll('.favorites__btn');
    if(!favorites) {
        return;
     }
    favoriteButtons.forEach(button => {
        const icon = button.querySelector('.icon--heart');

        button.addEventListener('click', () => {
            icon.classList.toggle('active');
        });
    });
});
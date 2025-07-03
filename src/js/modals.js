
document.addEventListener('DOMContentLoaded', () => {
    function handleCloseButton(modalSelector, buttonSelector) {
        const modal = document.querySelector(modalSelector);
        const closeButton = document.querySelector(buttonSelector);

        if (modal && closeButton) {
            closeButton.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }
    }
    handleCloseButton('#favorites-message-modal-header', '.favorites-message-modal-header__close-btn');
    handleCloseButton('#favorites-message-modal', '.favorites-message-modal__close-btn');
    handleCloseButton('#alert-modal', '.alert__btn-close');
    handleCloseButton('#link-email-modal', '.link-email-modal__close-btn');
    handleCloseButton('#link-email-modal', '.link-email-modal__agree');
    handleCloseButton('#activation-letter-modal', '.activation-letter-modal__close-btn');
    handleCloseButton('#activation-letter-modal', '.activation-letter-modal__agree');
    handleCloseButton('#successful-registration-modal', '.successful-registration-modal__close-btn');
    handleCloseButton('#successful-registration-modal', '.successful-registration-modal__agree');

});
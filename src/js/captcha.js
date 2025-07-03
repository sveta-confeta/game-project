
document.addEventListener('DOMContentLoaded', () => {
    const setupCaptcha = () => {
        const captchaCheckboxes = document.querySelectorAll('.captcha-checkbox');
        captchaCheckboxes.forEach(captchaCheckbox => {
            captchaCheckbox.addEventListener('change', function() {
                if (captchaCheckbox.checked) {
                    captchaCheckbox.setAttribute('disabled', 'disabled');
                }
            });
        });
    };
});
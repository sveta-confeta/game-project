document.addEventListener('DOMContentLoaded', function () {
    const inputs = document.querySelectorAll('.input:not([type="password"])');

    if (!inputs) {
        return;
    }
    inputs.forEach(function(input) {
        input.addEventListener('input', function () {
            if (input.value.trim() !== '') {
                input.style.border = '1px solid var(--link-color)';
            } else {
                input.style.border = '';
            }
        });
    });

});


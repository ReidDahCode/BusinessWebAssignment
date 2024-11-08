
document.addEventListener('DOMContentLoaded', function() {
    const MAX_ATTEMPTS = 3;
    const LOCKOUT_TIME = 10000; // 10 seconds
    let failedAttempts = 0;
    let lockoutTimeout;

    const form = document.querySelector('form');
    const usernameInput = form.querySelector('input[type="text"]');
    const passwordInput = form.querySelector('input[type="password"]');
    const loginButton = form.querySelector('button');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (!username || !password) {
            alert('Please fill in both username and password.');
            return;
        }

        if (failedAttempts >= MAX_ATTEMPTS) {
            window.location.href = 'error.html';
            return;
        }

        if (username === 'nextstep@gmail.com' && password === 'Success!') {
            window.location.href = 'home.html';
        } else {
            failedAttempts++;
            alert('Invalid username or password.');

            if (failedAttempts >= MAX_ATTEMPTS) {
                lockoutTimeout = setTimeout(function() {
                    failedAttempts = 0;
                }, LOCKOUT_TIME);
            }
        }
    });

    usernameInput.addEventListener('input', resetLockout);
    passwordInput.addEventListener('input', resetLockout);

    function resetLockout() {
        if (lockoutTimeout) {
            clearTimeout(lockoutTimeout);
            lockoutTimeout = null;
            failedAttempts = 0;
        }
    }
});

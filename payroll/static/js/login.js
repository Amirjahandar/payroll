document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    let isValid = true;

    // Reset errors
    usernameError.style.display = 'none';
    passwordError.style.display = 'none';
    username.classList.remove('shake');
    password.classList.remove('shake');

    // username validation
    const usernameRegex = /^[0-9]{1,8}$/;
    if (!usernameRegex.test(username.value)) {
        usernameError.style.display = 'block';
        username.classList.add('shake');
        isValid = false;
    }

    // Password validation
    if (password.value.length < 8) {
        passwordError.style.display = 'block';
        password.classList.add('shake');
        isValid = false;
    }

    if (isValid) {
        // Here you would typically send the data to your server
        // Simulate successful login
        const btn = document.querySelector('.submit-btn');
        const originalText = btn.textContent;
        btn.textContent = 'در حال ورود...';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            this.submit();

            if(msg){
            alert(msg);
            }
        }, 1500);

        
    }

});

// Remove shake animation after it completes
const inputs = document.querySelectorAll('.form-input');
inputs.forEach(input => {
    input.addEventListener('animationend', () => {
        input.classList.remove('shake');
    });
});

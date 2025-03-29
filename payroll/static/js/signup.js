document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fields = {
        firstName: { value: document.getElementById('firstName').value, error: document.getElementById('firstNameError') },
        lastName: { value: document.getElementById('lastName').value, error: document.getElementById('lastNameError') },
        username: { value: document.getElementById('username').value, error: document.getElementById('usernameError') },
        phone: { value: document.getElementById('phone').value, error: document.getElementById('phoneError') },
        email: { value: document.getElementById('email').value, error: document.getElementById('emailError') },
        password: { value: document.getElementById('password').value, error: document.getElementById('passwordError') },
        confirmPassword: { value: document.getElementById('confirmPassword').value, error: document.getElementById('confirmPasswordError') }
    };

    let isValid = true;

    // Reset all errors
    Object.values(fields).forEach(field => {
        field.error.style.display = 'none';
        document.getElementById(field.error.id.replace('Error', '')).classList.remove('shake');
    });

    // Validate first name
    if (fields.firstName.value.trim() === '') {
        fields.firstName.error.style.display = 'block';
        document.getElementById('firstName').classList.add('shake');
        isValid = false;
    }

    // Validate last name
    if (fields.lastName.value.trim() === '') {
        fields.lastName.error.style.display = 'block';
        document.getElementById('lastName').classList.add('shake');
        isValid = false;
    }

    // Validate username (must be numeric and less than 9 digits)
    const usernameRegex = /^[0-9]{1,8}$/;
    if (!usernameRegex.test(fields.username.value)) {
        fields.username.error.style.display = 'block';
        document.getElementById('username').classList.add('shake');
        isValid = false;
    }

    // Validate phone number
    const phoneRegex = /^0\d{10}$/;
    if (!phoneRegex.test(fields.phone.value)) {
        fields.phone.error.style.display = 'block';
        document.getElementById('phone').classList.add('shake');
        isValid = false;
    }

    // Validate email only if it's not empty
    if (fields.email.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(fields.email.value)) {
            fields.email.error.style.display = 'block';
            document.getElementById('email').classList.add('shake');
            isValid = false;
        }
    }

    // Validate password
    if (fields.password.value.length < 8) {
        fields.password.error.style.display = 'block';
        document.getElementById('password').classList.add('shake');
        isValid = false;
    }

    // Validate password confirmation
    if (fields.password.value !== fields.confirmPassword.value) {
        fields.confirmPassword.error.style.display = 'block';
        document.getElementById('confirmPassword').classList.add('shake');
        isValid = false;
    }

    if (isValid) {
        // Here you would typically send the data to your server
        console.log('Sign up attempted with:', {
            firstName: fields.firstName.value,
            lastName: fields.lastName.value,
            username: fields.username.value,
            phone: fields.phone.value,
            email: fields.email.value || null,
            password: fields.password.value
        });

        // Simulate successful signup
        const btn = document.querySelector('.submit-btn');
        const originalText = btn.textContent;
        btn.textContent = 'در حال ایجاد حساب کاربری ...';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            this.submit()
            if(msg){
                alert(msg);
            }else{
            alert('حساب کاربری شما با موفقیت ایجاد شد!');}
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

// Real-time password confirmation validation
document.getElementById('confirmPassword').addEventListener('input', function() {
    const password = document.getElementById('password').value;
    const confirmPassword = this.value;
    const error = document.getElementById('confirmPasswordError');
    
    if (confirmPassword && password !== confirmPassword) {
        error.style.display = 'block';
    } else {
        error.style.display = 'none';
    }
});

// Real-time phone number validation
document.getElementById('phone').addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9]/g, '').substring(0, 11);
    const error = document.getElementById('phoneError');
    const phoneRegex = /^0\d{10}$/;
    
    if (this.value && !phoneRegex.test(this.value)) {
        error.style.display = 'block';
    } else {
        error.style.display = 'none';
    }
});

// Real-time username validation
document.getElementById('username').addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9]/g, '').substring(0, 8);
    const error = document.getElementById('usernameError');
    const usernameRegex = /^[0-9]{1,8}$/;
    
    if (this.value && !usernameRegex.test(this.value)) {
        error.style.display = 'block';
    } else {
        error.style.display = 'none';
    }
});

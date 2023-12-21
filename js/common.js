const form = document.querySelector('.contact-form');
const name = document.getElementById('name');
const errorName = document.querySelector('.error-name');
const tel = document.getElementById('tel');
const errorTel = document.querySelector('.error-tel');
const email = document.getElementById('email');
const errorEmail = document.querySelector('.error-email');
const popup = document.querySelector('.contact-popup');


form.addEventListener('submit', (event) => {
    event.preventDefault();
    validateInputs();
})

const isValidEmail = (email) => {
    const req = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return req.test(String(email).toLowerCase());
}

const isValidTel = (tel) => {
    const req = /^\+?[0-9\s\(\)-]+$/;
    return req.test(tel);
}

const validateInputs = () => {
    const nameValue = name.value.trim();
    const telValue = tel.value.trim();
    const emailValue = email.value.trim()

    if (nameValue === '') {
        errorName.textContent = 'This field is required';
        errorName.style.visibility = 'visible';
    } else {
        errorName.style.visibility = 'hidden';
    }

    if (telValue === '') {
        errorTel.textContent = 'This field is required';
        errorTel.style.visibility = 'visible';
    } else if (!isValidTel(telValue)) {
        errorTel.textContent = 'Provide a valid phone number';
        errorTel.style.visibility = 'visible';
    } else {
        errorTel.style.visibility = 'hidden';
    }

    if (emailValue === '') {
        errorEmail.textContent = 'This field is required';
        errorEmail.style.visibility = 'visible';
    } else if (!isValidEmail(emailValue)) {
        errorEmail.textContent = 'Provide a valid email address';
        errorEmail.style.visibility = 'visible';
    } else {
        errorEmail.style.visibility = 'hidden';
    }

    if (nameValue !== '' && telValue !== '' && emailValue !== '' && isValidEmail(emailValue) && isValidTel(telValue)) {
        send();
    }
}

const burger = document.querySelector('.header-burger');
const list = document.querySelector('.header-list');
const action = document.querySelector('.header-action');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    list.classList.toggle('visible');
    action.classList.toggle('visible');
})

function send() {
    let formData = new FormData(form);

    fetch('sendmail.php', {
        method: 'POST',
        body: formData
    }).then(
        (res) => {
            console.log(res);
            if (res.ok && res.status === 200) {
                popup.style.visibility = 'visible';
                setTimeout(() => {
                    popup.style.visibility = 'hidden';
                    form.reset();
                }, 2000);
            } else {
                alert("Something went wrong.")
            }
        },
    ).catch(
        (error) => {
            alert(error);
        }
    );
}


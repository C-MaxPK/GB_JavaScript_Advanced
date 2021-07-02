'use strict';

const inputName = document.querySelector('#name');
const inputPhone = document.querySelector('#phone');
const inputMail = document.querySelector('#mail');
const btn = document.querySelector('.btn');

btn.addEventListener('click', check);

function check(event) {
    if (!/^[a-zа-я]+$/i.test(inputName.value) ||
        !/^\+[0-9]{1,2}\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/.test(inputPhone.value) ||
        !/^[a-z\d.-]+@[a-z\d]{2,}.[a-z]{2,}$/i.test(inputMail.value)) {
        event.preventDefault();
    }


    if (!/^[a-zа-я]+$/i.test(inputName.value)) {
        if (!inputName.classList.contains('error')) {
            inputName.classList.add('error');
            inputName.insertAdjacentHTML('afterend', '<span id="errName" class="spanError">invalid name</span>');
        }
    } else {
        if (inputName.classList.contains('error')) {
            const spanEl = document.querySelector('#errName');
            inputName.classList.remove('error');
            inputName.parentNode.removeChild(spanEl);
        }
    }


    if (!/^\+[0-9]{1,2}\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/.test(inputPhone.value)) {
        if (!inputPhone.classList.contains('error')) {
            inputPhone.classList.add('error');
            inputPhone.insertAdjacentHTML('afterend', '<span id="errPhone" class="spanError">invalid phone</span>');
        }
    } else {
        if (inputPhone.classList.contains('error')) {
            const spanEl = document.querySelector('#errPhone');
            inputPhone.classList.remove('error');
            inputPhone.parentNode.removeChild(spanEl);
        }
    }


    if (!/^[a-z\d.-]+@[a-z\d]{2,}\.[a-z]{2,}$/i.test(inputMail.value)) {
        if (!inputMail.classList.contains('error')) {
            inputMail.classList.add('error');
            inputMail.insertAdjacentHTML('afterend', '<span id="errMail" class="spanError">invalid email</span>');
        }
    } else {
        if (inputMail.classList.contains('error')) {
            const spanEl = document.querySelector('#errMail');
            inputMail.classList.remove('error');
            spanEl.parentNode.removeChild(spanEl);
        }   
    }
}

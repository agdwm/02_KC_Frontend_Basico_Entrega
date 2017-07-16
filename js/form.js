var form = document.getElementsByTagName('form')[0];

var inputName = document.getElementById('name');
var inputEmail = document.getElementById('email');
var inputPhone = document.getElementById('phone');
var inputSelect = document.getElementById('select');
var inputKnown = document.getElementById('known');
var inputComment = document.getElementById('comment');
var submitButton = document.getElementById('submit');
var loadingWrap = document.getElementById('loading-wrap');

var initialNamePlaceholder = inputName.placeholder;
var initialEmailPlaceholder = inputEmail.placeholder;
var initialPhonePlaceholder = inputPhone.placeholder;
var initialCommentPlaceholder = inputComment.placeholder;

var loadingIcon = document.createElement('div');
var finishIcon = document.createElement('i');

loadingIcon.classList.add("loader");
//finishIcon.classList.add("fa","fa-check", "icono-finish");
finishIcon.classList.add("icon-check", "icono-finish");

inputComment.addEventListener('keyup', function (event){
    limitWords(this);
});

var boxLimit = document.getElementById('limit-words');
var boxLimitInitialText = boxLimit.innerText;
var lengthOfWords;

function limitWords () {
    var numberOfWords = inputComment.value.trim().replace(/\s\s+/g, ' ');
    lengthOfWords = numberOfWords.split(' ').length;
    var boxLimit = document.getElementById('limit-words');

    if (inputComment.value === ""){
        boxLimit.innerText = boxLimitInitialText;

        if (boxLimit.classList.contains("limit-ok")) {
            boxLimit.classList.remove("limit-ok");
        }else if(boxLimit.classList.contains("limit-error")){
            boxLimit.classList.remove("limit-error");
        }
    }else{
        boxLimit.innerText = lengthOfWords;
        if (lengthOfWords > 150){
            boxLimit.classList.add("limit-error");
            if (boxLimit.classList.contains("limit-ok")) {
                boxLimit.classList.remove("limit-ok");
            }
        }else{
            boxLimit.classList.add("limit-ok");
            if (boxLimit.classList.contains("limit-error")) {
                boxLimit.classList.remove("limit-error");
            }
        }
    }
}

form.addEventListener("submit", function(event){
    event.preventDefault();
    //var listErrors =[];


    /* NAME */
    if (inputName.checkValidity() === false) {
        inputName.placeholder = "Escribe un nombre válido";
        inputName.classList.add("placeholder-error");
        inputName.focus();
        event.preventDefault();
        return false;
    }else{
        if (inputName.classList.contains("placeholder-error")) {
            inputName.placeholder = initialNamePlaceholder;
            inputName.classList.remove("placeholder-error");
        }
    }

    /* EMAIL */
    if (inputEmail.checkValidity() === false) {
        inputEmail.placeholder = "Escribe un email válido";
        inputEmail.classList.add("placeholder-error");
        inputEmail.focus();
        event.preventDefault();
        return false;
    }else{
        if (inputEmail.classList.contains("placeholder-error")) {
            inputEmail.placeholder = initialEmailPlaceholder;
            inputEmail.classList.remove("placeholder-error");
        }
    }

    /* PHONE */
    if (inputPhone.value !== "") {
        var phonePatron = /^((\+?34([ \t|\-])?)?[9|6|7]((\d{1}([ \t|\-])?[0-9]{3})|(\d{2}([ \t|\-])?[0-9]{2}))([ \t|\-])?[0-9]{2}([ \t|\-])?[0-9]{2})$/;
        var phoneValue = inputPhone.value;

        if ( phonePatron.test(phoneValue)) {
            if (inputPhone.classList.contains("placeholder-error")) {
                inputPhone.placeholder = initialPhonePlaceholder;
                inputPhone.classList.remove("placeholder-error");
            }
        }else{
            inputPhone.value = "";
            inputPhone.placeholder = "Escribe un teléfono válido o deja este campo vacío";

            if(!inputPhone.classList.contains("placeholder-error")){
                inputPhone.classList.add("placeholder-error");
            }
            inputPhone.focus();
            event.preventDefault();
            return false;
        }
    }else{
        if (inputPhone.classList.contains("placeholder-error")) {
            inputPhone.placeholder = initialPhonePlaceholder;
            inputPhone.classList.remove("placeholder-error");
        }
    }

    /* COMMENT */
    if(inputComment.checkValidity() === true){

        if (lengthOfWords > 150){
            alert ("Por favor, reduce tu comentario a 150 palabras");
            event.preventDefault();
            return false;
        }else{
            if (inputComment.classList.contains("placeholder-error")) {
                inputComment.placeholder = initialCommentPlaceholder;
                inputComment.classList.remove("placeholder-error");
            }
        }
    }else{
        inputComment.placeholder = "Escribe tu comentario (max 150 palabras)";
        inputComment.classList.add("placeholder-error");
        inputComment.focus();
        event.preventDefault();
        return false;
    }

    submitButton.classList.add("hidden");
    loadingWrap.classList.remove("hidden");
    loadingWrap.appendChild(loadingIcon);
    event.preventDefault();

    setTimeout(function () {
        form.reset();
        dropdownButtonText.textContent = '¿Cómo me has conocido?';
        dropdownButtonText.style.color = "#9b9c9e";

        if (!inputKnown.closest(".contact-line").classList.contains('hidden')) {
            inputKnown.closest(".contact-line").classList.add('hidden');
        }

        loadingIcon.remove();
        loadingWrap.appendChild(finishIcon);
        //sendNotification("Formulario recibido", "Body de ejemplo");
    }, 3000);
    setTimeout(function (){
        finishIcon.remove();
        loadingWrap.classList.add('hidden');
        submitButton.classList.remove('hidden');
    }, 5000)
});

/* ======================
    SELECT DROPDOWN
====================== */
var dropDownButton = document.getElementById('dropdown-button');

dropDownButton.addEventListener('click', toggleSelect);

function toggleSelect () {
    document.getElementById('dropdown-menu').classList.toggle('show');
}

window.addEventListener('click', closeInOutside);

function closeInOutside (event) {
    if (!event.target.matches('.dropdown-button')){

        var dropDownMenu = document.getElementById('dropdown-menu');
        if (dropDownMenu.classList.contains('show')){
            dropDownMenu.classList.remove('show');
        }
    }
}

var optionsDropDown = document.getElementsByClassName('dropdown-option');
var dropdownButtonText = document.getElementById('dropdown-text');

for (var i = 0; i < optionsDropDown.length; i++) {
    optionsDropDown[i].addEventListener('click', function (event) {
        event.preventDefault();

        var dataOptionSelect = this.getAttribute('data-option');
        var idSelected = this.getAttribute('id');
        var liSelected = dropdownButtonText.textContent = dataOptionSelect;

        dropdownButtonText.style.color = "#343434";

        if (idSelected && idSelected === 'others'){
           inputKnown.closest(".contact-line").classList.remove('hidden');
        } else{
            inputKnown.closest(".contact-line").classList.add('hidden');
        }
    });
}




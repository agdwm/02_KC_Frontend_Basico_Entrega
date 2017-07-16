/* ==========================================================================
   SMOOTH SCROLL
   ========================================================================== */
var navbarItems = document.getElementsByClassName('navbar-item');

for(var i = 0; i < navbarItems.length; i++){
    navbarItems[i].addEventListener('click', function (event){
        var sectionToGo = this.getElementsByTagName('a')[0].href.split("#");

        deleteActiveClass();
        this.classList.add('active');

        if(sectionToGo.length === 2) {
            event.preventDefault();
            var goTo = sectionToGo[sectionToGo.length - 1];
            getElementByIdAndScroll(goTo);
        }
    });
}

function getElementByIdAndScroll (id) {
    var elem;
    if (id === '') {
        elem = document.getElementsByClassName('header')[0];
    } else {
        elem = document.getElementById(id);
    }

    scrollToElement(elem);
}

//Función recursiva
function scrollToElement (element) {
    var jump = parseInt((element.getBoundingClientRect().top * 0.3));

    //document.body.scrollTop += jump;

    var scrollingElement = document.scrollingElement || document.documentElement;
    scrollingElement.scrollTop += jump;
    document.body.scrollTop += jump;

    if (!element.lastJump || element.lastJump > Math.abs(jump)) {
        setTimeout(function() {
            element.lastJump = Math.abs(jump);
            scrollToElement(element);
        }, 40);
    } else {
        element.lastJump = null;
    }
}

function deleteActiveClass() {
    for (var i = 0; i < navbarItems.length; i++) {
        navbarItems[i].classList.remove('active');
    }
}

var acumulativeOffset = function (element) {
    var top = 0;

    do {
        top += element.offsetTop || 0;
        element = element.offsetParent;
    } while (element);

    return top;
}

var navBar = document.getElementsByClassName('main-nav')[0];
var offsetAbout = acumulativeOffset(document.getElementById('about')) - 75;
var offsetSkills = acumulativeOffset(document.getElementById('skills')) - 75;
var offsetExperience = acumulativeOffset(document.getElementById('experience')) - 75;
var offsetEducation = acumulativeOffset(document.getElementById('education')) - 75;
var offsetPortfolio = acumulativeOffset(document.getElementById('portfolio')) - 75;
var offsetInterests = acumulativeOffset(document.getElementById('interests')) - 75;
var offsetContact = acumulativeOffset(document.getElementById('contact')) - 75;

window.addEventListener('scroll', changeMenuStyle);

var previous;

function changeMenuStyle (event) {
    var pageOffset = window.pageYOffset;

    if (pageOffset >= 0 && pageOffset < offsetAbout) {
        if (!previous || previous !== 1){
            previous = 1;
        } else if (previous === 1){
            return false;
        }
        deleteActiveClass();
        document.querySelector("a[href='#']").parentNode.classList.add('active');
    } else if(pageOffset >= offsetAbout && pageOffset < offsetSkills) {
        if (!previous || previous !== 2){
            previous = 2;
        } else if (previous === 2){
            return false;
        }
        deleteActiveClass();
        document.querySelector("a[href$='about']").parentNode.classList.add('active');
    } else if(pageOffset >= offsetSkills && pageOffset < offsetExperience) {
        if (!previous || previous !== 3){
            previous = 3;
        } else if (previous === 3){
            return false;
        }
        deleteActiveClass();
        document.querySelector("a[href$='skills']").parentNode.classList.add('active');
    } else if(pageOffset >= offsetExperience && pageOffset < offsetEducation) {
        if (!previous || previous !== 4){
            previous = 4;
        } else if (previous === 4){
            return false;
        }
        deleteActiveClass();
        document.querySelector("a[href$='experience']").parentNode.classList.add('active');
    } else if(pageOffset >= offsetEducation && pageOffset < offsetPortfolio) {
        if (!previous || previous !== 5){
            previous = 5;
        } else if (previous === 5){
            return false;
        }
        deleteActiveClass();
        document.querySelector("a[href$='education']").parentNode.classList.add('active');
    } else if(pageOffset >= offsetPortfolio && pageOffset < offsetInterests) {
        if (!previous || previous !== 6){
            previous = 6;
        } else if (previous === 6){
            return false;
        }
        deleteActiveClass();
        document.querySelector("a[href$='portfolio']").parentNode.classList.add('active');
    } else if(pageOffset >= offsetInterests && pageOffset < offsetContact) {
        if (!previous || previous !== 7){
            previous = 7;
        } else if (previous === 7){
            return false;
        }
        deleteActiveClass();
        document.querySelector("a[href$='interests']").parentNode.classList.add('active');
    } else {
        if (!previous || previous !== 8){
            previous = 8;
        } else if (previous === 8){
            return false;
        }
        deleteActiveClass();
        document.querySelector("a[href$='contact']").parentNode.classList.add('active');
    }
}

/* ==========================================================================
   STICKY NAVBAR
   ========================================================================== */
var offsetNavBar = acumulativeOffset(navBar);

window.addEventListener('scroll', fixNaBar);

function fixNaBar (event) {

    if(window.pageYOffset >= offsetNavBar){
        navBar.classList.add('fix-nav');
    }else{
        navBar.classList.remove('fix-nav');
    }


}


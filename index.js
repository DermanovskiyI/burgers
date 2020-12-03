//SLIDER

// получаем элементы.
let arrowLeft = document.getElementById('prev');
let arrowRight = document.getElementById('next');
let items = document.getElementById('items');
let item = document.querySelector('.burger__item');

let itemWidth = parseInt(window.getComputedStyle(item).width);//получаем ширину одного item для установления максимальных сдвигов.
let itemLength = items.children.length - 1;//получаем общее количество item для установления максимальных сдвигов. т.к. нам нужно будет чтобы всегда был один элемент на странице добавим -1.

//задаем максимальное и минимальное значение для смещения вправо и влево.
let minRight = 0;
let maxRight = itemLength * itemWidth;

// у элемента slider текущее значение right приравниваем к 0. Затем к этому значению будем прибавлять step + 'px'.
let currentRight = 0;
items.style.right = currentRight;

// задаем шаг.
let step = itemWidth;
arrowRight.addEventListener('click', function (e) {
    e.preventDefault();
    // currentRight += step + 'px';
    if (currentRight < maxRight) {
        currentRight += step;
    }
    else {
        currentRight = minRight;
    }
    items.style.right = currentRight + 'px';


})

arrowLeft.addEventListener('click', function (e) {
    e.preventDefault();
    if (currentRight > minRight) {
        currentRight -= step;
    }
    else {
        currentRight = maxRight;
    }
    items.style.right = currentRight + 'px';
})

///////////////////////////////////////////////////////////////////////////////////////

// OVERLAY ПО КНОПКЕ ЗАКАЗАТЬ (делаем через создание разметки в js)

// let openButton = document.querySelector('#openOverlay');
// let body = document.querySelector('body')

// let successOverlay = createOverlay("Сообщение отправлено");

// openButton.addEventListener('click', function(e) {
//     e.preventDefault();
//     document.body.appendChild(successOverlay);
//     body.classList.add("body--active")
// })

// function createOverlay (content) {
//     let overlayElement = document.createElement("div");
//     overlayElement.classList.add("overlay");
//     overlayElement.addEventListener("click", function(e) {
//         if (e.target === overlayElement) {
//           closeElement.click();
//         }
//       });



//     let containerElement = document.createElement("div");
//     containerElement.classList.add("container", "container--overlay");

//     let contentElement = document.createElement("div");
//     contentElement.classList.add("overlay__content");
//     contentElement.innerHTML = content;

//     let closeElement = document.createElement("a");
//     closeElement.classList.add("overlay__close");
//     closeElement.href = "#";
//     closeElement.textContent = "Закрыть";
//     closeElement.addEventListener ('click', function(e){
//         e.preventDefault();
//         document.body.removeChild(overlayElement);
//         body.classList.remove("body--active")
//     });

//     overlayElement.appendChild(containerElement);
//     containerElement.appendChild(contentElement);
//     contentElement.appendChild(closeElement);

//     return overlayElement;
// }


// ФОРМА: ТОЛЬКО ЦИФРЫ В ПОЛЕ "ТЕЛЕФОН" + ВАЛИДАЦИЯ + ОТПРАВКА НА СЕРВЕР + OVERLAY  

//цифры в поле телефон

let phoneNumber = document.querySelector('#phoneNumber');
let textArea = document.querySelector('.form__input-elem--allign')

phoneNumber.addEventListener('keydown', function (event) {
    let isDigit = false;
    let isPlus = false;
    let isControl = false;

    if (event.key >= 0 || event.key <= 9) {
        isDigit = true;
    }
    if (event.key == '+') {
        isPlus = true;
    }
    if (event.key == 'ArrowLeft' || event.key == 'ArrowRight' || event.key == 'Backspace') {
        isControl = true;
    }

    if (!isDigit && !isPlus && !isControl) {
        event.preventDefault();
    }
});


const body = document.querySelector('body')
const orderForm = document.querySelector('#orderForm');
let inputs = document.querySelectorAll('.form__input-elem');

const orderButton = document.querySelector('#orderButton');
const template = document.querySelector('#overlayTemplate').innerHTML;
const overlay = createOverlay(template);

const errorTemplate = document.querySelector('#overlayErrorTemplate').innerHTML;
const errorOverlay = createOverlay(errorTemplate);



orderButton.addEventListener('click', e => {
    e.preventDefault()
    //валидация
    function validateForm(form) {
        let valid = true;

        if (!validateField(form.elements.name)) {
            valid = false;
        }

        if (!validateField(form.elements.phone)) {
            valid = false;
        }

        if (!validateField(form.elements.to)) {
            valid = false;
        }

        if (!validateField(form.elements.comment)) {
            valid = false;
        }
        return valid;
    }

    function validateField(field) {
        field.nextElementSibling.textContent = field.validationMessage;
        return field.checkValidity();
    }

    // server
    if (validateForm(orderForm)) {
        const data = {
            name: orderForm.elements.name.value,
            phone: orderForm.elements.phone.value,
            to: orderForm.elements.to.value,
            comment: orderForm.elements.comment.value
        };
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.send(JSON.stringify(data));
        xhr.addEventListener('load', () => {
            console.log(xhr.response.message);
            responseStatus = xhr.response.status;
            console.log(responseStatus)
            //////////////// overlay
            if (xhr.response.status === 1) {
                overlay.open();
                body.classList.add("body--active");
                overlay.setContent("Заказ принят");
                orderForm.reset();
            }
            else if (xhr.response.status === 0) {
                errorOverlay.open();
                errorOverlay.setContent('Отправить заказ не удалось, повторите запрос позже')
            }
        });

    };

});

function createOverlay(template) {
    let fragment = document.createElement('div');

    fragment.innerHTML = template;

    const overlayElement = fragment.querySelector(".overlay");
    const contentElement = fragment.querySelector(".overlay__content");
    const titleElement = fragment.querySelector(".overlay__title");
    const closeElement = fragment.querySelector(".overlay__close");



    fragment = null;

    overlayElement.addEventListener('click', event => {
        event.preventDefault();
        if (event.target === overlayElement) {
            closeElement.click();
        }
    });



    closeElement.addEventListener('click', e => {
        e.preventDefault();
        body.classList.remove("body--active");

        document.body.removeChild(overlayElement);

    });

    return {
        open() {
            document.body.appendChild(overlayElement);
        },

        close() {
            closeElement.click();
        },

        setContent(content) {
            contentElement.innerHTML = content;

        },
        setTitle(title) {
            titleElement.textContent = title;
        }
    };
}


/////////////////////////////////////////////////////////////

// HAMBURGER OVERLAY

const hamburger = document.getElementById('hamburger');
const closeNavigation = document.querySelector('.hamburger__open');
const navigation = document.querySelector('#navigation');

hamburger.addEventListener('click', function (e) {
    e.preventDefault();
    const isActive = navigation.classList.contains("navigation--active")
    if (isActive) {
        navigation.classList.remove("navigation--active")
        body.classList.remove("body--active")
        closeNavigation.classList.remove("hamburger--active");
    }
    else {
        navigation.classList.add("navigation--active");
        body.classList.add("body--active");
        closeNavigation.classList.add("hamburger--active");
    }
}
)

////////////////////////////////////////////////////////////////

// TEAM DESCRIPTION

// const teamList = document.querySelector('.team__list');
// function team (link) {
//     for (let i = 0; i < link.length; i++) {

//         link[i].addEventListener('click', function(e) {
//             e.preventDefault();
//             if (link[i].classList.contains("team__link--active")) {
//                 link[i].classList.remove("team__link--active");
//             } else {
//                 link[i].classList.add("team__link--active");
//             }

//         }) 
//     }
// }

// team(document.querySelectorAll('.team__link'));


let teamAcco = document.querySelector('#teamAcco');

createTeamAcco(teamAcco);

function createTeamAcco(accordeon) {
    // let activeClass;
    accordeon.addEventListener('click', function (e) {
        if (e.target.classList.contains("team__link")) {
            let links = e.target;
            let isActive = links.classList.contains("team__link--active");
            e.preventDefault();

            if (isActive) {
                links.classList.remove("team__link--active");
            }
            else {
                const activeItem = document.querySelector('.team__link--active');
                if (activeItem) {
                    activeItem.classList.remove('team__link--active');
                }
                links.classList.add("team__link--active");
            }



        }
    })
}


/////////////////////////////////////////////////////////////////


//MENU ACCO

/// 1 способ

// let accoLinks = document.querySelectorAll('.menu-acco__link');
// let accoItems = document.querySelectorAll('.menu-acco__item');

// menu(accoLinks, accoItems)

// function menu (links, items) {
//     for (let i = 0; i < links.length; i++) {
//         let link = links[i];
//         let item = items[i]
//         link.addEventListener('click', function(e) {
//             e.preventDefault();
//             if (item.classList.contains("menu-acco__item--active")) {
//                 item.classList.remove("menu-acco__item--active");
//             } else {
//                 item.classList.add("menu-acco__item--active");
//             }
//         })
//     }
// }


/// 2 способ ДЕЛЕГИРОВАНИЕ


let menuAcco = document.querySelector('#menuAcco');
createMenuAcco(menuAcco);


function createMenuAcco(element) {
    element.addEventListener('click', function (e) {
        const item = e.target.closest('.menu-acco__item')
        const activeClass = item.classList.contains("menu-acco__item--active");
        e.preventDefault()
        if (activeClass) {
            item.classList.remove("menu-acco__item--active");
        }
        else {
            // ищем активный элемент, если он существует
            const activeItem = document.querySelector('.menu-acco__item--active');
            if (activeItem) {
                activeItem.classList.remove('menu-acco__item--active');
            }
            item.classList.add("menu-acco__item--active");
        }

    });
};

//////3 способ, можно закрыть все три
// let menuAcco = document.querySelector('#menuAcco');
// createMenuAcco(menuAcco);


// function createMenuAcco (element) {
//     let activeClass;
//     element.addEventListener('click', function(e) {
//         if(e.target.classList.contains('menu-acco__link')) {

//             const item = e.target;
//             if (activeClass) {
//                 activeClass.classList.remove("menu-acco__item--active");
//                 activeClass="";
//             } 
//             else {
//                 activeClass = item.parentElement;
//                 activeClass.classList.add("menu-acco__item--active");
//             }
//         };
//     });
// };


/////////////////////////// REVIEWS POPUP
let reviewPopup = document.querySelector('#reviewPopup');
const reviewTemplate = document.querySelector('#overlayReviewTemplate').innerHTML;
const reviewOverlay = createOverlay(reviewTemplate);

createReviewPopup(reviewPopup);

function createReviewPopup(element) {
    let reviewContent;
    let reviewTitle;
    element.addEventListener('click', function (e) {
        if (e.target.classList.contains('btn--black')) {
            e.preventDefault();
            let btnReview = e.target;
            reviewContent = btnReview.previousElementSibling;
            reviewTitle = reviewContent.previousElementSibling;
            reviewOverlay.open();
            body.classList.add("body--active");
            reviewOverlay.setContent(reviewContent.textContent);
            reviewOverlay.setTitle(reviewTitle.textContent)

        }
    })
}



///////// ONE PAGE SCROLL

// let sections = document.querySelectorAll('.section');
// // console.log(sections.length)
// let display = document.querySelector('.maincontent')
// let indexActiveSection;
// let toNextSection;
// let toPrevSection;



// function changeClassDown() {
//     let activeSection = document.querySelector('.active');
//     if (activeSection.nextElementSibling.classList.contains('section')) {
//         activeSection.classList.remove('active');
//         activeSection = activeSection.nextElementSibling;
//         activeSection.classList.add('active');
//     }

// };

// function changeClassUp() {

//     let activeSection = document.querySelector('.active');
//     if (activeSection.previousElementSibling != null) {
//         activeSection.classList.remove('active');
//         activeSection = activeSection.previousElementSibling;
//         activeSection.classList.add('active');
//     }

// };
// function scrolling() {
//     // let indexActiveSection;
//     // let toNextSection;
//     // let toPrevSection;

//     for (i = 0; i < sections.length; i++) {
//         if (sections[i].classList.contains('active')) {
//             indexActiveSection = i;
//         }

//     }
//     toNextSection = (indexActiveSection + 1) * -100 + '%';
//     toPrevSection = (indexActiveSection - 1) * -100 + '%';
//     // console.log(indexActiveSection)

//     // return toNextSection;
// }

// document.addEventListener('wheel', function (e) {


//     scrolling();
//     // const deltaY = e.deltaY;
//     const isDirectionDown = e.deltaY > 0;
//     const isDirectionUp = e.deltaY < 0;
//     // console.log(e)
//     if (isDirectionDown && indexActiveSection < sections.length - 1) {

//         display.style.transform = `translateY(${toNextSection})`;
//         changeClassDown();
//     }

//     if (isDirectionUp  && indexActiveSection > 0) {
//         display.style.transform = `translateY(${toPrevSection})`;
//         changeClassUp();
//     };
// })



const sections = document.querySelectorAll('.maincontent > .section');
const display = document.querySelector('.maincontent');


//Добавляем всем секциям индекс
const sectionsLen = sections.length;
const lastIndex = sectionsLen - 1;
for (let i = 0; i < sectionsLen; i++) {
    sections[i].dataset.index = i;
};

// Координаты следующей/предыдущей секции.
let toNextSection = function (index) {
    return `${(index + 1) * -100}%`;
};

let toPrevSection = function (index) {
    return `${(index - 1) * -100}%`;
};

// Смена класса активности (1параметр - текущий активный элемент, 2параметр в какую секцию хотим попасть, 3параметр координаты секции в которую хотим попасть)
function updateClass(activeSection, newSection, coords) {
    if (newSection && newSection.classList.contains("section")) {
        activeSection.classList.remove("active");
        newSection.classList.add("active");
        display.style.transform = `translateY(${coords})`;
    }
};

function updateClassOnPaggination(activePage, newPage) {
    // if (newPage && newPage.classList.contains("page__link")) {
    activePage.classList.remove('pagination__link--active');
    newPage.classList.add('pagination__link--active');
    // }

}

document.addEventListener('wheel', function (e) {

    //убираем скрол при открытом popup во время onepagescroll 
    if (!body.classList.contains("body--active")) {
        //находим активную секцию
        const activeSection = document.querySelector('.section.active');
        const activePage = document.querySelector('.pagination__link.pagination__link--active');
        const activeIndex = parseInt(activeSection.dataset.index);

        //координаты следующей/предыдущей секции
        const nextSection = toNextSection(activeIndex);
        const prevSection = toPrevSection(activeIndex);

        const isDirectionDown = e.deltaY > 0;
        if (isDirectionDown && activeIndex < lastIndex) {
            const nextElement = activeSection.nextElementSibling;
            const nextPage = activePage.nextElementSibling;
            updateClass(activeSection, nextElement, nextSection);
            updateClassOnPaggination(activePage, nextPage);
            // console.log(touchStart)
        }
        if (!isDirectionDown && activeIndex > 0) {
            const prevElement = activeSection.previousElementSibling;
            const prevPage = activePage.previousElementSibling;
            updateClass(activeSection, prevElement, prevSection);
            updateClassOnPaggination(activePage, prevPage);
        }
    }

})

document.addEventListener('keydown', function (e) {

    if (!body.classList.contains("body--active")) {
        const activeSection = document.querySelector('.section.active');
        const activePage = document.querySelector('.pagination__link.pagination__link--active');
        const activeIndex = parseInt(activeSection.dataset.index);
        const nextSection = toNextSection(activeIndex);
        const prevSection = toPrevSection(activeIndex);

        if (e.key == 'ArrowDown' && activeIndex < lastIndex && textArea.value.length < 1) {
            const nextElement = activeSection.nextElementSibling;
            const nextPage = activePage.nextElementSibling;
            updateClass(activeSection, nextElement, nextSection);
            updateClassOnPaggination(activePage, nextPage);
        }
        if (e.key == 'ArrowUp' && activeIndex > 0 && textArea.value.length < 1) {
            const prevElement = activeSection.previousElementSibling;
            const prevPage = activePage.previousElementSibling;
            updateClass(activeSection, prevElement, prevSection);
            updateClassOnPaggination(activePage, prevPage);
        }
    }
});



/////// NAVIGATION BUTTONS
const wrapper = document.querySelector('.wrapper');

const heroSection = document.getElementById('hero');
const orderSection = document.getElementById('order');
const bestSection = document.getElementById('best');
const burgerSection = document.getElementById('burger');
const teamSection = document.getElementById('team');
const menuSection = document.getElementById('menu');
const reviewSection = document.getElementById('review');
const videoSection = document.getElementById('video');
const contactsSection = document.getElementById('contacts');

wrapper.addEventListener('click', function (e) {
    // e.preventDefault();
    let targetBtn = e.target;

    if (e.target.classList.contains('heroBtn')) {
        e.preventDefault();
        const indexHeroSection = parseInt(heroSection.dataset.index);
        const newCoords = toNextSection(indexHeroSection - 1);
        let activeSection = document.querySelector(".section.active");
        let activePage = document.querySelector(".pagination__link.pagination__link--active");
        let nextPage = document.querySelector(".pagination__link.heroBtn");
        updateClass(activeSection, heroSection, newCoords);
        updateClassOnPaggination(activePage, nextPage);
    }
    if (targetBtn.classList.contains('aboutBtn') || targetBtn.classList.contains('arrow__pic--down')) {
        e.preventDefault();
        const indexBestSection = parseInt(bestSection.dataset.index);
        const newCoords = toNextSection(indexBestSection - 1);
        let activeSection = document.querySelector(".section.active");
        let activePage = document.querySelector(".pagination__link.pagination__link--active");
        let nextPage = document.querySelector(".pagination__link.aboutBtn");
        updateClass(activeSection, bestSection, newCoords);
        updateClassOnPaggination(activePage, nextPage);
        navigation.classList.remove("navigation--active");
        closeNavigation.classList.remove("hamburger--active");
        body.classList.remove("body--active");
    }
    if (targetBtn.classList.contains('burgersBtn')) {
        e.preventDefault();
        const indexBurgerSection = parseInt(burgerSection.dataset.index);
        const newCoords = toNextSection(indexBurgerSection - 1);
        let activeSection = document.querySelector(".section.active");
        let activePage = document.querySelector(".pagination__link.pagination__link--active");
        let nextPage = document.querySelector(".pagination__link.burgersBtn");
        updateClass(activeSection, burgerSection, newCoords);
        updateClassOnPaggination(activePage, nextPage);
        navigation.classList.remove("navigation--active");
        closeNavigation.classList.remove("hamburger--active");
        body.classList.remove("body--active");
    }
    if (targetBtn.classList.contains('teamBtn')) {
        e.preventDefault();
        const indexTeamSection = parseInt(teamSection.dataset.index);
        const newCoords = toNextSection(indexTeamSection - 1);
        let activeSection = document.querySelector(".section.active");
        let activePage = document.querySelector(".pagination__link.pagination__link--active");
        let nextPage = document.querySelector(".pagination__link.teamBtn");
        updateClass(activeSection, teamSection, newCoords);
        updateClassOnPaggination(activePage, nextPage);
        navigation.classList.remove("navigation--active");
        closeNavigation.classList.remove("hamburger--active");
        body.classList.remove("body--active");
    }
    if (targetBtn.classList.contains('menuBtn')) {
        e.preventDefault();
        const indexMenuSection = parseInt(menuSection.dataset.index);
        const newCoords = toNextSection(indexMenuSection - 1);
        let activeSection = document.querySelector(".section.active");
        let activePage = document.querySelector(".pagination__link.pagination__link--active");
        let nextPage = document.querySelector(".pagination__link.menuBtn");
        updateClass(activeSection, menuSection, newCoords);
        updateClassOnPaggination(activePage, nextPage);
        navigation.classList.remove("navigation--active");
        closeNavigation.classList.remove("hamburger--active");
        body.classList.remove("body--active");
    }
    if (targetBtn.classList.contains('reviewBtn')) {
        e.preventDefault();
        const indexReviewSection = parseInt(reviewSection.dataset.index);
        const newCoords = toNextSection(indexReviewSection - 1);
        let activeSection = document.querySelector(".section.active");
        let activePage = document.querySelector(".pagination__link.pagination__link--active");
        let nextPage = document.querySelector(".pagination__link.reviewBtn");
        updateClass(activeSection, reviewSection, newCoords);
        updateClassOnPaggination(activePage, nextPage);
        navigation.classList.remove("navigation--active");
        closeNavigation.classList.remove("hamburger--active");
        body.classList.remove("body--active");
    }
    if (targetBtn.classList.contains('videoBtn')) {
        e.preventDefault();
        const indexVideoSection = parseInt(videoSection.dataset.index);
        const newCoords = toNextSection(indexVideoSection - 1);
        let activeSection = document.querySelector(".section.active");
        let activePage = document.querySelector(".pagination__link.pagination__link--active");
        let nextPage = document.querySelector(".pagination__link.videoBtn");
        updateClass(activeSection, videoSection, newCoords);
        updateClassOnPaggination(activePage, nextPage);
        navigation.classList.remove("navigation--active");
        closeNavigation.classList.remove("hamburger--active");
        body.classList.remove("body--active");
    }
    if (e.target.classList.contains('btnToOrder')) {
        e.preventDefault();
        const indexOrderSection = parseInt(orderSection.dataset.index);
        const newCoords = toNextSection(indexOrderSection - 1);
        let activeSection = document.querySelector(".section.active");
        let activePage = document.querySelector(".pagination__link.pagination__link--active");
        let nextPage = document.querySelector(".pagination__link.btnToOrder");
        updateClass(activeSection, orderSection, newCoords);
        updateClassOnPaggination(activePage, nextPage);
        navigation.classList.remove("navigation--active");
        closeNavigation.classList.remove("hamburger--active");
        body.classList.remove("body--active");
    }
    if (targetBtn.classList.contains('contactsBtn')) {
        e.preventDefault();
        const indexContactsSection = parseInt(contactsSection.dataset.index);
        const newCoords = toNextSection(indexContactsSection - 1);
        let activeSection = document.querySelector(".section.active");
        let activePage = document.querySelector(".pagination__link.pagination__link--active");
        let nextPage = document.querySelector(".pagination__link.contactsBtn");
        updateClass(activeSection, contactsSection, newCoords);
        updateClassOnPaggination(activePage, nextPage);
        navigation.classList.remove("navigation--active");
        closeNavigation.classList.remove("hamburger--active");
        body.classList.remove("body--active");
    }

});

// document.addEventListener('touchmove', function(e){
//     let screenY = e.changedTouches[0].screenY
//     let clientY = e.changedTouches[0].clientY;
//     console.log(e)
    
//     console.log('target' + ' '+ e.targetTouches[0].clientY, e.targetTouches[0].screenY, e.targetTouches[0].pageY)
//     console.log('changed' + ' '+  e.changedTouches[0].clientY,e.changedTouches[0].screenY,  e.changedTouches[0].pageY)
//     console.log('touches' + ' '+    e.touches[0].clientY, e.touches[0].screenY, e.touches[0].pageY)

   
// })

let startCoords;
let endCoords;


function swipe(start, end) {
    console.log(start, end)
    if (!body.classList.contains("body--active")) {
        const activeSection = document.querySelector('.section.active');
        const activePage = document.querySelector('.pagination__link.pagination__link--active');
        const activeIndex = parseInt(activeSection.dataset.index);
        const nextSection = toNextSection(activeIndex);
        const prevSection = toPrevSection(activeIndex);
        if (start > end && activeIndex > 0 && textArea.value.length < 1 && start != 0) {
            console.log('листай вверх');
            const prevElement = activeSection.previousElementSibling;
            const prevPage = activePage.previousElementSibling;
            updateClass(activeSection, prevElement, prevSection);
            updateClassOnPaggination(activePage, prevPage);
            startCoords = 0;
            endCoords = 0;
            console.log(startCoords,endCoords)
    
        }
        if (start < end && activeIndex < lastIndex && textArea.value.length < 1 && start != 0) {
            console.log('листай вниз');
    
            const nextElement = activeSection.nextElementSibling;
            const nextPage = activePage.nextElementSibling;
            updateClass(activeSection, nextElement, nextSection);
            updateClassOnPaggination(activePage, nextPage);
            startCoords = 0;
            endCoords = 0;
            console.log(startCoords,endCoords)
        }
    }
    
    
};

document.addEventListener('touchend', function (e) {
    // function trololo () {
    console.log(e.targetTouches)
    // let startCoords;
    // let endCoords;
    // if (e)
    document.ontouchmove = getStartCoord;
    function getStartCoord(e) {
        // console.log(e)
        startCoords = e.changedTouches[0].clientY;
        // console.log(startCoords)
    }

    document.ontouchstart = getEndCoord;
    function getEndCoord(e) {

        endCoords = e.changedTouches[0].clientY;
        // console.log(endCoords)
    }

    swipe(startCoords, endCoords);

})









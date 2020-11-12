//SLIDER

// получаем элементы.
let arrowLeft = document.querySelector('#prev');
let arrowRight = document.querySelector('#next');
let items = document.querySelector('#items');
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

// OVERLAY ПО КНОПКЕ ЗАКАЗАТЬ

let openButton = document.querySelector('#openOverlay');
let body = document.querySelector('body')

let successOverlay = createOverlay("Сообщение отправлено");

openButton.addEventListener('click', function(e) {
    e.preventDefault();
    document.body.appendChild(successOverlay);
    body.classList.add("body--active")
})

function createOverlay (content) {
    let overlayElement = document.createElement("div");
    overlayElement.classList.add("overlay");
    overlayElement.addEventListener("click", function(e) {
        if (e.target === overlayElement) {
          closeElement.click();
        }
      });
   
    

    let containerElement = document.createElement("div");
    containerElement.classList.add("container", "container--overlay");

    let contentElement = document.createElement("div");
    contentElement.classList.add("overlay__content");
    contentElement.innerHTML = content;

    let closeElement = document.createElement("a");
    closeElement.classList.add("overlay__close");
    closeElement.href = "#";
    closeElement.textContent = "Закрыть";
    closeElement.addEventListener ('click', function(e){
        e.preventDefault();
        document.body.removeChild(overlayElement);
        body.classList.remove("body--active")
    });

    overlayElement.appendChild(containerElement);
    containerElement.appendChild(contentElement);
    contentElement.appendChild(closeElement);

    return overlayElement;
}

/////////////////////////////////////////////////////////////

// HAMBURGER OVERLAY

const hamburger = document.querySelector('#hamburger');
const closeNavigation = document.querySelector('.hamburger__open');
const navigation = document.querySelector('#navigation');

hamburger.addEventListener('click', function(e) {
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
function team (link) {
    for (let i = 0; i < link.length; i++) {

        link[i].addEventListener('click', function(e) {
            e.preventDefault();
            if (link[i].classList.contains("team__link--active")) {
                link[i].classList.remove("team__link--active");
            } else {
                link[i].classList.add("team__link--active");
            }
            
        }) 
    }
}

team(document.querySelectorAll('.team__link'));

/////////////////////////////////////////////////////////////////


//MENU ACCO


function menu (link, item) {
    for (let i = 0; i < link.length; i++) {
        link[i].addEventListener('click', function(e) {
            e.preventDefault();
            if (item[i].classList.contains("menu-acco__item--active")) {
                item[i].classList.remove("menu-acco__item--active");
            } else {
                item[i].classList.add("menu-acco__item--active");
            }
        })
    }
}

menu(document.querySelectorAll('.menu-acco__link'), document.querySelectorAll('.menu-acco__item'))

// SCROLL DOWN

// let scrollDown = document.querySelector('#down');

// scrollDown.addEventListener('click', function(e) {
//     e.preventDefault();
    
// })


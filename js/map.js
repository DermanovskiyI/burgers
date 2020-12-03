
var myMap;

// Дождёмся загрузки API и готовности DOM.
ymaps.ready(init);

function init () {
    // Создание экземпляра карты и его привязка к контейнеру с
    // заданным id ("map").
    myMap = new ymaps.Map('map', {
        // При инициализации карты обязательно нужно указать
        // её центр и коэффициент масштабирования.
        center: [59.939095, 30.315868], // Питер
        zoom: 11,
        controls:[]
    }, {
        searchControlProvider: 'yandex#search'
    }),

    myMap.behaviors
        // Отключаем выключенное поведение:
        //  - scrollZoom - зум по скроллу
        .disable(['scrollZoom'])
 
   

     // Создаём макет содержимого.
     MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
    ),

    myPlacemark1 = new ymaps.Placemark([59.945960, 30.365154], {
        hintContent: 'MR.BURGERS',
        balloonContent: 'MR.BURGERS'
    }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: '/picture/icons/map-marker.svg',
        // Размеры метки.
        iconImageSize: [46, 57],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-5, -38]
    }),
    myPlacemark2 = new ymaps.Placemark([59.978701, 30.377138], {
        hintContent: 'MR.BURGERS',
        balloonContent: 'MR.BURGERS'
    }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: '/picture/icons/map-marker.svg',
        // Размеры метки.
        iconImageSize: [46, 57],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-5, -38]
    }),
    myPlacemark3 = new ymaps.Placemark([60.000177, 30.246082], {
        hintContent: 'MR.BURGERS',
        balloonContent: 'MR.BURGERS'
    }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: '/picture/icons/map-marker.svg',
        // Размеры метки.
        iconImageSize: [46, 57],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-5, -38]
    }),
    myMap.geoObjects
    .add(myPlacemark1)
    .add(myPlacemark2)
    .add(myPlacemark3)

}

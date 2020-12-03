const playerSplash = document.querySelector('.player__splash');
const startButton = document.querySelector('.player__start');
const startButtonSplash = document.querySelector('.player__splash-button');
const playBackString = document.querySelector('.player__playback');
const playBackButton = document.querySelector('.player__playback-button');
const durationCompleted = document.querySelector('.player__duration-completed');
const durationEstimate = document.querySelector('.player__duration-estimate');
const muteBtn = document.querySelector('.player__mute-button');
const volumeButton = document.querySelector('.player__volume-button');
const volumeString = document.querySelector('.player__volume');

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;
      function onYouTubeIframeAPIReady() {
          //// вставляем id блока в который вставляем плеер
        player = new YT.Player('yt-player', {
          height: '409',
          width: '660',
          videoId: 'uesdol_cQfA',
          playerVars: {
              controls: 0,
              rel: 0,
              iv_load_policy: 3,
              disablekb: 1,
              modestbranding: 1,
              autoplay: 0,
              showinfo: 0
          },
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

function onPlayerReady() {
    //// делаем движение ползунка
    const duration = player.getDuration();
    let interval;
    updateTimer();

    clearInterval(interval);
    interval = setInterval(() =>{
        ////узнаем сколько прошло от видео
        const completed = player.getCurrentTime();
        ////рассчитаем проценты. делим просмотренное на целое и умножаем на 100.
        const percent = (completed / duration) * 100;

        updateTimer();
        /////сдвигаем кнопку на количество процентов
        changeButtonPosition(percent);
    }, 1000);
}

function updateTimer(){
    durationCompleted.textContent = formatTime(`${player.getCurrentTime()}`);
    durationEstimate.textContent =formatTime(`${player.getDuration()}`);
};

function formatTime(time) {

    //округляем время
    const roundTime = Math.round(time);
    // console.log(roundTime)

    let formattedSeconds;
    //округляем до целого значения
    const minutes = Math.floor(roundTime / 60);
    // console.log(minutes)
    //узнаем количество секунд
    const seconds = roundTime - minutes * 60;
    //в секундах если меньше 10 то первым должен идти 0
    if (seconds < 10) {
        formattedSeconds = `0${seconds}`
    }
    else {
        formattedSeconds = seconds;
    }

    return minutes + ":" + formattedSeconds;
}

function onPlayerStateChange(event) {
    
    switch(event.data) {
        case 1:
            playerSplash.classList.add("player__splash--active");
            startButton.classList.add("player__start--active");
            break;

        case 2:
            playerSplash.classList.remove("player__splash--active");
            startButton.classList.remove("player__start--active");
            break;
    }
}

startButtonSplash.addEventListener('click', function(e){
    e.preventDefault();
    player.playVideo();

});


playerSplash.addEventListener('click', function(){
    player.playVideo();
})

startButton.addEventListener('click', function(e){
    e.preventDefault();
    //-1 – воспроизведение видео не началось
    // 0 – воспроизведение видео завершено
    // 1 – воспроизведение
    // 2 – пауза
    // 3 – буферизация
    // 5 – видео находится в очереди
    
    const playerStatus = player.getPlayerState();
    if(playerStatus != 1) {
        player.playVideo();
        
    } else {
        player.pauseVideo();
    }

})

playBackButton.addEventListener('click', function(e){
    e.preventDefault();

})

playBackString.addEventListener('click', function(e){

    //cохраняем место куда кликнули
    const bar = e.currentTarget;
    //расчитаем  расстояние от края окна ((расстояние клика по оси Х от границы окна) - (расстояние самого ползнука от границы окна))
    const newButtonPosition = e.pageX - bar.getBoundingClientRect().left
    
    const barWidth = parseInt(window.getComputedStyle(bar).width)
    // рассчитываем проценты (часть делим на целое и умножаем на 100)
    const clickedPercent = (newButtonPosition / barWidth) * 100;
    //рассчитаем на сколько секунд хотим прокрутить (возьмем длительность видео поделим на 100 получим значение 1%) и умножим на сколько процентов кликнули
    const newPlayerTime = (player.getDuration() / 100) * clickedPercent;
    changeButtonPosition(clickedPercent);
    player.seekTo(newPlayerTime)
})

function changeButtonPosition(percent) {
    playBackButton.style.left = `${percent}%`;
};

////мут на кнопку
muteBtn.addEventListener('click', function(e){
    if (player.isMuted()) {
        player.unMute();
        muteBtn.classList.remove('player__mute-button-muted');
    } else {
        player.mute();
        muteBtn.classList.add('player__mute-button-muted');
    }
    
});

volumeString.addEventListener('click', function(e) {
    //cохраняем место куда кликнули
    const bar = e.currentTarget;
    //расчитаем  расстояние от края окна ((расстояние клика по оси Х от границы окна) - (расстояние самого ползнука от границы окна))
    const newButtonPosition = e.pageX - bar.getBoundingClientRect().left;
    const barWidth = parseInt(window.getComputedStyle(bar).width);
    
    // рассчитываем проценты (часть делим на целое и умножаем на 100)
    const clickedPercent = (newButtonPosition / barWidth) * 100;
    if (newButtonPosition < 58) {
        changeVolumeBtnPosition(clickedPercent);
    };
    
    // устанавливаем громкость по процентам
    player.setVolume(clickedPercent);
});

volumeButton.addEventListener('click', function(e) {
    e.preventDefault();
});

function changeVolumeBtnPosition(percent) {
    volumeButton.style.left = `${percent}%`;
};



//ДЕЛАЕМ ИЗМЕНЕНИЕ ГРОМКОСТИ ПО НАЖАТИЮ НА БЕГУНОК ГРОМКОСТИ

volumeString.addEventListener('dragover', function(e){
    e.preventDefault();
});


volumeString.addEventListener('drop', function(e) {
    e.preventDefault();
    let bar = volumeString;
    const newVolumeBtnPosition = e.pageX - bar.getBoundingClientRect().left;
    const barWidth = parseInt(window.getComputedStyle(bar).width);
    const clickedPercent = (newVolumeBtnPosition / barWidth) * 100;
    changeVolumeBtnPosition(clickedPercent);
    player.setVolume(clickedPercent);
});

//// ДЕЛАЕМ ИЗМЕНЕНИЕ ТЕКУЩЕГО ВРЕМЕНИ ПО НАЖАТИЮ НА БЕГУНОК ВРЕМЕНИ


playBackString.addEventListener('dragover', function(e){
    e.preventDefault();
});


playBackString.addEventListener('drop', function(e) {
    e.preventDefault();
    let bar = playBackString;
    const newButtonPosition = e.pageX - bar.getBoundingClientRect().left;
    const barWidth = parseInt(window.getComputedStyle(bar).width);
    const clickedPercent = (newButtonPosition / barWidth) * 100;
    const newPlayerTime = (player.getDuration() / 100) * clickedPercent;
    changeButtonPosition(clickedPercent);
    player.seekTo(newPlayerTime)
});
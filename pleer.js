const playerSplash = document.querySelector('.player__splash');
const startButton = document.querySelector('.player__start');
const playBackString = document.querySelector('.player__playback');
const playBackButton = document.querySelector('.player__playback-button');

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;
      function onYouTubeIframeAPIReady() {
          //// вставляем id блока в который вставляем плеер
        player = new YT.Player('yt-player', {
          height: '405',
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
            // 'onStateChange': onPlayerStateChange
          }
        });
      }

function onPlayerReady() {
    //// делаем движение ползунка
    const duration = player.getDuration();
    let interval;

    clearInterval(interval);
    interval = setInterval(() =>{
        ////узнаем сколько прошло от видео
        const completed = player.getCurrentTime();
        ////рассчитаем проценты. делим просмотренное на целое и умножаем на 100.
        const percent = (completed / duration) * 100;
        /////сдвигаем кнопку на количество процентов
        changeButtonPosition(percent);
    }, 1000);
}




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
        changeOnActive (startButton, playerSplash);
        
    } else {
        player.pauseVideo();
        changeOnUnActive (startButton, playerSplash);
    }
    
})

playBackButton.addEventListener('click', function(e){
    e.preventDefault();
    changeOnActive (startButton, playerSplash);
})

playBackString.addEventListener('click', function(e){
    changeOnActive (startButton, playerSplash)
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


function changeOnActive (startButton, playerSplash) {
    playerSplash.classList.add("player__splash--active")
    startButton.classList.add("player__start--active");
}
function changeOnUnActive (startButton, playerSplash) {
    playerSplash.classList.remove("player__splash--active")
    startButton.classList.remove("player__start--active");
}

const piano = document.querySelector('.piano');
const pianoKey = document.querySelectorAll('.piano-key');
const bodyConteiner = document.querySelector('body');
function playAudio(src){
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
} 
//активное состояние при клике мыши и воспроизведение звука
const startSound = (event)=>{
    if(event.target.classList.contains('piano-key')) {
      pianoKey.forEach((el) => {
        if(el.classList.contains('piano-key-active')) {
          el.classList.remove('piano-key-active');
        el.classList.remove('piano-key-active-pseudo');
        }
      });
        const note = event.target.dataset.note;
        const url = `assets/audio/${note}.mp3`;
        playAudio(url);
      event.target.classList.add('piano-key-active');
      event.target.classList.add('piano-key-active-pseudo');
    }
}
const stopSound = (event) => {
  if(event.target.classList.contains('piano-key')) {
    event.target.classList.remove('piano-key-active');
    event.target.classList.remove('piano-key-active-pseudo');
  }
}

// проводим по клавишам нажатой мышкой
const overMouse = (event)=>{
  event.target.classList.add("piano-key-active");
  startSound(event);
   pianoKey.forEach((elem) =>{
    elem.addEventListener("mouseover", startSound);
    elem.addEventListener("mouseout", stopSound);
  });
}

const outMouse = (event) => {
  event.target.classList.remove("piano-key-active");
  pianoKey.forEach((elem) =>{
    elem.removeEventListener("mouseover", startSound);
    elem.removeEventListener("mouseout", stopSound);
  });
}

piano.addEventListener('mousedown', overMouse);
bodyConteiner.addEventListener('mouseup', outMouse);

// звук при нажатии на клавиатуру
window.addEventListener('keydown', (event) => {
 if (event.repeat === true) return;
  const letter = window.event.code;
  pianoKey.forEach((el)=> {
      if (letter ===  el.dataset.code){
      const note = el.dataset.note;
      const url = `assets/audio/${note}.mp3`;
      playAudio(url);
      if(el.classList.contains('piano-key-active')) {
        el.classList.remove('piano-key-active');
      }
      else el.classList.add('piano-key-active');
    }  
  });
}, false);
window.addEventListener('keyup', (event) => {
  pianoKey.forEach((el)=> {
      el.classList.remove('piano-key-active');
  });
});

//меняем кнопки notes/letter
const buttonConteiner = document.querySelector(".btn-container");
const button = document.querySelectorAll(".btn");
const buttonLetters = document.querySelector(".btn-letters");
console.log(buttonConteiner);

const changeLetters = (event) =>{
  if (event.target.classList.contains("btn")){
    button.forEach((el) =>{
      if (el.classList.contains("btn-active")){
        el.classList.remove("btn-active");
      }
   });
  }
  event.target.classList.add("btn-active");

  if (buttonLetters.classList.contains('btn-active')){
    pianoKey.forEach((el)=> {
      el.classList.add('piano-key-letter');
    });
  }
  else {
    pianoKey.forEach((el)=> {
      el.classList.remove('piano-key-letter')
    });
  }
};
buttonConteiner.addEventListener('click', changeLetters)

//полный экран
const buttonFullScreen = document.querySelector(".fullscreen");

const changeScreen = () => {
  if(document.fullscreenElement === null){
    document.documentElement.requestFullscreen();
  }
  else document.exitFullscreen();
}
buttonFullScreen.addEventListener('click', changeScreen);

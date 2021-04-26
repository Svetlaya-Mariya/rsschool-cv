const labels = document.querySelectorAll('.filters input'); 

function handleUpdate(elem){
    const suffix = this.dataset.sizing || ''; 
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

labels.forEach((elem) => {
   elem.addEventListener('input', handleUpdate);
   elem.addEventListener('input', () => {
       elem.nextElementSibling.value = elem.value;
   })
});
// изменение цвета кнопок при  нажатии на них
const buttonConteiner = document.querySelector('.btn-container');
const button = document.querySelectorAll('.btn');

const base = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';
const timesOfDay = ['morning/', 'day/', 'evening/', 'night/'];
const images = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
let i = 0;
let j = 0;
let naw = new Date();
function whatTheTime(){
    if (naw.getHours() >=6 && naw.getHours() <=11){
        j = 0;
    }
    else if (naw.getHours() > 11 && naw.getHours() <=17){
        j = 1;
    }
    else if (naw.getHours() > 17 && naw.getHours() <=23){
        j = 2;
    }
    else {
        j = 3;
    }
    return j;
}
console.log(naw);
console.log(whatTheTime());
const mainImage = document.querySelector('.image');
const btnNext = document.querySelector('.btn-next');

function viewBgImage(src) {  
    const img = new Image();
    img.src = src;
    img.onload = () => {      
      mainImage.src = `${src}`;
    }; 
}

  function getImage() {
    let times = whatTheTime();
    const index = i % images.length;
    const imageSrc = base + timesOfDay[times] + images[index];
    viewBgImage(imageSrc);
    i++;
    btnNext.disabled = true;
    setTimeout(function() { btnNext.disabled = false }, 1000);
  } 

 const changeButton = (event) => {
    //console.log(event.target);
    if (event.target.classList.contains('btn')){
        button.forEach((el) => {
            if (el.classList.contains('btn-active')){
                el.classList.remove('btn-active');
            }
        });
    }
    event.target.classList.add('btn-active');

    if (event.target.classList.contains('btn-reset')){
        labels.forEach((elem) => {
           elem.value = elem.defaultValue;
           elem.nextElementSibling.value = elem.defaultValue;
           document.documentElement.style.cssText = "";
        });
    }
 }
buttonConteiner.addEventListener('click', changeButton);
btnNext.addEventListener('click', getImage);

const fileInput = document.querySelector('.btn-load--input');
console.log(fileInput);

fileInput.addEventListener('change', function(e) {
  const file = fileInput.files[0];
  console.log(file);
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.src = reader.result;
    /*mainImage.innerHTML = "";
    mainImage.append(img);*/
    mainImage.src = `${img.src}`;
  }
  reader.readAsDataURL(file);
});

//Initializing the audio resources

let audio_file = document.getElementById("audio_file");
let reader = new FileReader();
let audio = document.querySelector('audio');
let title = document.getElementById('song_name');
reader.addEventListener('load', () => {
  audio.src = reader.result;
});


audio_file.addEventListener('change', function () {
  reader.readAsDataURL(audio_file.files[0]);
  let Song_name = audio_file.value;
  let length = Song_name.length;
  let SubString = Song_name.substring(12, length+1);
  title.innerHTML = SubString;
});

const container = document.getElementById('bars_container');

// setting up the web audio API variable. means set up our audio source, analyzer and context. 
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

let audioSource = null;
let analyser = null;

audioSource = audioCtx.createMediaElementSource(audio);
analyser = audioCtx.createAnalyser();
audioSource.connect(analyser);
analyser.connect(audioCtx.destination);

// Calculating the visualizer's bar dimensions
analyser.fftSize = 128;

const bufferLength = analyser.frequencyBinCount;

const dataArray = new Uint8Array(bufferLength);
console.log(dataArray);


// creating bars
for(let i = 0; i <= 4; i++){
  const bars = document.createElement('DIV');
  bars.setAttribute("class","bars");
  bars.setAttribute("id","bar" + i);
  container.appendChild(bars);

}
// Animating the bars

function animation(){
  
    analyser.getByteFrequencyData(dataArray);
    for (let i = 0; i <= 4; i++) {
          let index = (i + 12 )*2;
          let index2 = (i + 20)*2;
        
          barHeight = dataArray[index];
          circle_width = dataArray[index2];

          const circle_1 = document.querySelector('.circle');
          const circle_2 = document.querySelector('.circle_2');

          const Bar = document.querySelector("#bar" + i);
          const bar1 = document.querySelector("#bar0");
          const bar2 = document.querySelector("#bar1");
          const bar3 = document.querySelector("#bar2");
          const bar5 = document.querySelector("#bar4");

          let height = Math.max(3, barHeight || 0);
        
          let r = Math.max(50, circle_width + 10 || 0);

          Bar.style.height = height + "px";
          bar1.style.background = "#FF1744";
          bar3.style.background = "#448AFF";
          bar5.style.background = "#FFC400";
          
          circle_1.style.cssText = "height:"+r+"px; width:"+r+"px; ";
          circle_2.style.cssText = "height:"+r+"px; width:"+r+"px; ";
           
    }
    requestAnimationFrame(animation);
}
animation();


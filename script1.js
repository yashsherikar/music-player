const play = document.getElementById("play");
const music = document.querySelector("audio");
const img = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const repeate = document.getElementById("repeate");
let progress = document.getElementById("progress");
let duration_time = document.getElementById("duration_time");
let current_time = document.getElementById("current_time");
const progress_div = document.getElementById("progress_div");
let refresh = document.getElementById("refresh");
let PlayList = document.getElementById("PlayList");
let SongName = document.getElementById("SongName");
let ArtistName = document.getElementById("ArtistName");
let musicList = document.querySelector(".music-list");
let moremusicBtn = document.querySelector("#Musiclist");
let closemoremusic = document.querySelector("#close");
let audio_dur = document.querySelector(".audio-duration");
let backg_image = document.querySelector(".backg_image");

// var li = document.getElementById('main').getElementsByTagName("li");

let songIndex = Math.floor((Math.random() * All_song.length) + 1);

window.addEventListener("load", () => 
{
  Getsong(All_song[songIndex]);
  playingCurrent();
  BG_Color();
})


let player = false;

const playmusic = () => {

  player = true;
  music.play();
  play.innerHTML = '<i class="material-icons" aria-hidden="true">pause</i>';
  img.classList.add('anime');

}

const pausemusic = () => {
  player = false;
  music.pause();
  play.innerHTML = '<i class="material-icons" aria-hidden="true">play_arrow</i>';
  img.classList.remove('anime');
}



play.addEventListener('click', () =>
 {
  if (player == true)
   {
    pausemusic();
  }
  else
   {
    playmusic();

  }

})




///data input and change


const Getsong = (All_song) => {
  title.textContent = All_song.title;
  artist.textContent = All_song.artist;
  music.src = "YASHMUSIC/" + All_song.name + ".mp3"
  img.src = "IMAGES/" + All_song.name + ".jpg"
};

// let songIndex =0;
//  Getsong(All_song[4]);

const nextSong = () => {
  songIndex = (songIndex + 1) % All_song.length;
  // songIndex++;
  Getsong(All_song[songIndex]);
  playmusic();
  playingCurrent();
  BG_Color();
};



const prevSong = () => {
  songIndex = (songIndex - 1 + All_song.length) % All_song.length;
  // songIndex--;
  Getsong(All_song[songIndex]);
  playmusic();
  playingCurrent();
  BG_Color();

};




music.addEventListener("timeupdate", (event) => {
  // console.log(event);

  const { currentTime, duration } = event.srcElement;
  let progress_time = (currentTime / duration) * 100;
  progress.style.width = `${progress_time}%`;

  // music duration update

  let min_duration = Math.floor(duration / 60);
  let sec_duration = Math.floor(duration % 60);

  if (sec_duration < 10) {
    sec_duration = `0${sec_duration}`;
  }
  let total_duration = `${min_duration}:${sec_duration}`;
  if (duration) {
    duration_time.textContent = `${total_duration}`;
  }

  //  current time
  let min_duration1 = Math.floor(currentTime / 60);
  let sec_duration1 = Math.floor(currentTime % 60);

  if (sec_duration1 < 10) {
    sec_duration1 = `0${sec_duration1}`;
  }
  let total_duration1 = `${min_duration1}:${sec_duration1}`;
  current_time.textContent = `${total_duration1}`;

});

// progress on click function

progress_div.addEventListener('click', (event) => {
  // console.log(event);
  const { duration } = music;
  // let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration; ////ass keltr zy veli apn music mage gheto thevha problem yeto
  // music.currentTime =move_progress;
  music.currentTime = ((event.offsetX / progress_div.offsetWidth) * music.duration);

});


let Id_Repeat;
let Id = 1;

const Repeat = () => {
  Id = 1;
  repeate.innerHTML = '<i class="material-icons" aria-hidden="true">repeat</i>';
  Id_Repeat = 0;
}

const Repate_one = () => {
  Id = 2;
  repeate.innerHTML = '<i class="material-icons" aria-hidden="true">repeat_one</i>';
  Id_Repeat = 1;

}
const Shuffle_Song = () => {
  Id = 3;
  repeate.innerHTML = '<i class="fa-solid fa-shuffle" aria-hidden="true"></i>';
  Id_Repeat = 2;
}

repeate.addEventListener('click', () => {
  if (Id == 1) {
    Repate_one();
  }
  else if (Id == 2) {
    Shuffle_Song();
  }
  else if (Id == 3) {
    Repeat();
  }

})

function BG_Color()
{
  for (let s = 0; s < All_song.length; s++) 
  {
    backg_image.style.backgroundImage = `url("IMAGES/${All_song[songIndex].name}.jpg")`;
    
  }
  
}



// next call function autometic
music.addEventListener('ended', () => {
  
  BG_Color();
  if (Id_Repeat == 1) 
  {
    songIndex--;
    
  }
  else if (Id_Repeat == 2) {
    let randIndex = Math.floor((Math.random() * All_song.length) + 1);
    do {
      randIndex = Math.floor((Math.random() * All_song.length) + 1);
    } while (songIndex == randIndex);
    songIndex = randIndex;
    Getsong(All_song[songIndex]);
    playmusic();
    playingCurrent();
    BG_Color();
  }

  nextSong();

});


// refresh.addEventListener('click' , Refresh_player)
next.addEventListener('click', nextSong);
// repeate.addEventListener('click' ,Repeate)
prev.addEventListener('click', prevSong);

moremusicBtn.addEventListener("click" ,() =>
{
  musicList.classList.toggle("show");
});

closemoremusic.addEventListener("click" ,() => {
  moremusicBtn.click();
});


const ulTag = document.querySelector("ul");

// let create li tags according to array lenght for list

for (let i = 0; i < All_song.length; i++) {
    let liTag = `<li li-index="${i}">
    
    <div class="row">
      <span>${All_song[i].title}</span>
      <p>${All_song[i].artist}</p>
      <img src="IMAGES/${All_song[i].name}.jpg">
    </div>
   

  </li>`;
  ulTag.insertAdjacentHTML("beforeend", liTag);
 
}






const allLiTags = ulTag.querySelectorAll("li");



// console.log(allLiTags);
function playingCurrent()
{

  for(let j = 0; j < allLiTags.length; j++)
  {
    let img1 = allLiTags[j].querySelector(".row  img");

    if(allLiTags[j].classList.contains("playing"))
   {
      allLiTags[j].classList.remove("playing");
      img1.classList.remove("anime");
     
   }

   if(allLiTags[j].getAttribute("li-index") == songIndex)
   {

    allLiTags[j].classList.add("playing");
    img1.classList.add("anime");

  
   }

    allLiTags[j].setAttribute("onclick" , "clicked(this)");

  }
}


function clicked(element)
{
  let getLiIndex = element.getAttribute("li-index");
  songIndex = getLiIndex;
  Getsong(All_song[songIndex]);
  playmusic();
  playingCurrent();
  BG_Color();
}




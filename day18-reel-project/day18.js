const user = [
  {
    username: "wanderlust_diaries",
    likeCount: 2150,
    isLiked: false,
    commentCount: 180,
    caption: "Golden hour hits different 🌅",
    video: "./reelsvideo/1.mp4",
    userProfile: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    shareCount: 60,
    isFollowed: true
  },
  {
    username: "urban_explorer",
    likeCount: 3890,
    isLiked: true,
    commentCount: 240,
    caption: "City lights & late nights 🌃",
    video: "./reelsvideo/2.mp4",
    userProfile: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    shareCount: 95,
    isFollowed: false
  },
  {
    username: "foodie_adda",
    likeCount: 1420,
    isLiked: false,
    commentCount: 90,
    caption: "Street food love ❤️",
    video: "./reelsvideo/3.mp4",
    userProfile: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
    shareCount: 35,
    isFollowed: true
  },
  {
    username: "fitness_hustle",
    likeCount: 5120,
    isLiked: true,
    commentCount: 410,
    caption: "Push your limits 💪",
    video: "./reelsvideo/4.mp4",
    userProfile: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    shareCount: 140,
    isFollowed: false
  },
  {
    username: "tech_daily",
    likeCount: 2780,
    isLiked: false,
    commentCount: 130,
    caption: "Future is here 🚀",
    video: "./reelsvideo/5.mp4",
    userProfile: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    shareCount: 70,
    isFollowed: true
  },
  {
    username: "music_feels",
    likeCount: 4600,
    isLiked: true,
    commentCount: 300,
    caption: "Vibe check 🎶",
    video: "./reelsvideo/6.mp4",
    userProfile: "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
    shareCount: 110,
    isFollowed: false
  },
  {
    username: "daily_life_vibes",
    likeCount: 1650,
    isLiked: false,
    commentCount: 120,
    caption: "Simple moments matter ✨",
    video: "./reelsvideo/7.mp4",
    userProfile: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    shareCount: 50,
    isFollowed: true
  },
  {
    username: "auto_world",
    likeCount: 7300,
    isLiked: true,
    commentCount: 520,
    caption: "Dream machine 🏎️",
    video: "./reelsvideo/8.mp4",
    userProfile: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126",
    shareCount: 210,
    isFollowed: false
  },
  {
    username: "nature_frames",
    likeCount: 1980,
    isLiked: false,
    commentCount: 105,
    caption: "Lost in nature 🌿",
    video: "./reelsvideo/9.mp4",
    userProfile: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    shareCount: 40,
    isFollowed: true
  },
  {
    username: "funny_clips",
    likeCount: 9800,
    isLiked: true,
    commentCount: 800,
    caption: "Try not to laugh 😂",
    video: "./reelsvideo/10.mp4",
    userProfile: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce",
    shareCount: 320,
    isFollowed: false
  }
];

let sum ="";

user.forEach(function(elem,idx){
    sum+=`<div class="reels">
                    <i class="ri-heart-fill"></i>
                    <video autoplay loop muted src="${elem.video}"></video>
                     <div class="bottom">
                        <div class="user">
                            <img src="${elem.userProfile}" alt="">
                            <h4>${elem.username}</h4>
                            <button>Follow</button>
                        </div>
                        <div class="right">
                            <div id=${idx} class="icon">
                                <h4><i class="ri-heart-3-line"></i></h4>
                                <h6>${elem.likeCount}</h6>
                            </div>
                            <div class="icon">
                                <h4><i class="ri-chat-1-line"></i></h4>
                                <h6>${elem.commentCount}</h6>
                            </div>
                            <div class="icon">
                                <h4><i class="ri-share-2-line"></i></h4>
                                <h6>${elem.shareCount}</h6>
                            </div>
                            <div class="icon">
                                <h4><i class="ri-list-unordered"></i></h4>
                                <h6>3</h6>
                            </div>
                        </div>  
                        <h3>${elem.caption}</h3>
                     </div>                
                </div>`;
})

var allreels=document.querySelector(".all-reels");

allreels.innerHTML=sum;




let btn = document.querySelectorAll(".user button");
let reels = document.querySelectorAll(".reels");

btn.forEach(function(btns){
    btns.addEventListener("click",function(e){
        e.stopPropagation();
        if(btns.innerHTML==="Follow")
        {
            btns.innerHTML="UnFollow";
        }
        else{
            btns.innerHTML="Follow";
        }
    });
});


reels.forEach(function(reel){

    let heart = reel.querySelector(".ri-heart-fill");
    let likeicon = reel.querySelector(".ri-heart-3-line"); // ✅ FIX
    let liked = false;

    let clickTimeout;

    // SINGLE CLICK
    reel.addEventListener("click", function(){

        clearTimeout(clickTimeout);

        clickTimeout = setTimeout(() => {
            liked = !liked;
            likeicon.style.color = liked ? "red" : "white";
        }, 200); // wait to check double click
    });

    // DOUBLE CLICK
    reel.addEventListener("dblclick", function(){

        clearTimeout(clickTimeout); // ❌ stop single click

        liked = true;
        likeicon.style.color = "red";

        heart.style.opacity = 1;
        heart.style.transform = "translate(-50%,-50%) scale(1.2) rotate(0deg)";

        setTimeout(() => {
            heart.style.opacity = 0;
            heart.style.transform = "translate(-50%,-50%) scale(0)";
        }, 800);
    });

});


allreels.addEventListener('click',function(dets){
    console.log(dets.target.id);
});
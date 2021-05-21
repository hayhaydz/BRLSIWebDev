let t0 = performance.now();
let loaded = false;
let i = 0;
let hasLoaded = sessionStorage.getItem('hasLoadedKey');

const loadingLoop = () => {
    let emojis = ["🤿", "🐡", "🐠", "🏝️", "🐙", "🐬", "🏖️", "🏄", "🌴", "🌞", "🐚", "⚓", "🌅", "⛵", "🐋", "🦪", "🐟", "🦞", "🦀", "🦑", "🦈", "🐳"];
    let emojiText = document.getElementById("preLoader-emoji");
    let progressText = document.getElementById("preLoader-progress");
    let animation = new TimelineLite();

    setTimeout(() => {
        if(loaded) {
            i++;
        }
        if(i < 100) {
            loadingLoop();
        } else {
            sessionStorage.setItem('hasLoadedKey', true);
            animation.to(".pre-loader__waves", {duration: 0.8, y: 0})
                .to(".pre-loader__container", {duration: 0.1, opacity: 0})
                .to(".pre-loader", {duration: 0.1, backgroundColor: 'transparent'})
                .to(".pre-loader__waves", {duration: 1.4, yPercent: 100})
                .to(".pre-loader", {duration: 0.1, display: 'none'})
                .to(".notVisible", {duration: 1.4, delay: 5, ease: "power1.inOutinOut", opacity: 1, onComplete: () => {document.body.classList.remove("noScroll")}});
        }
    }, 100);

    let rand = Math.floor(Math.random() * emojis.length) + 0;
    emojiText.innerHTML = emojis[rand];
    let padding = "";
    if(i + 1 < 10) {
        padding = "00";
    } else if(i + 1 != 100) {
        padding = "0";
    }
    progressText.innerHTML = padding + (i + 1) + "%";
}

if(!hasLoaded) {
    loadingLoop();
} else {
    document.getElementById("header").classList.remove("notVisible");
    document.getElementById("landing-container").classList.remove("notVisible");
    document.getElementById("landing-sound").classList.remove("notVisible");
    document.getElementById("pre-loader").style.display = 'none';
    document.body.classList.remove("noScroll");
}
// loadingLoop();

const animation = () => {
    let clouds = document.getElementById("backdrop-clouds");
    let waveBackground = document.getElementById('backdrop-waveBackground');
    let waveMidground = document.getElementById('backdrop-waveMidground');
    let waveForeground = document.getElementById('backdrop-waveForeground');
    let birds = document.getElementById('backdrop-birds');

    let birdsTL = new TimelineMax({repeat: -1});
    birdsTL.to(birds, 2, {
        y: 15,
        ease: Linear.easeNone
    })
    .to(birds, 3, {
        y: 0,
        ease: Linear.easeNone
    })

    let wavesTL = new TimelineMax({repeat: -1});
    wavesTL.to(waveBackground, 100, {
        backgroundPosition: "-6352px 0px",
        ease: Linear.easeNone
    }, 0)
    .to(waveMidground, 100, {
        backgroundPosition: "6352px 0px",
        ease: Linear.easeNone
    }, 0)
    .to(waveForeground, 100, {
        backgroundPosition: "-6352px 0px",
        ease: Linear.easeNone
    }, 0)

    let cloudsTL = new TimelineMax({repeat: -1});
    cloudsTL.to(clouds, 320, {
        backgroundPosition: "-6352px 0px",
        ease: Linear.easeNone
    });

    let masterTL = new TimelineMax();
    masterTL.add(cloudsTL, 0)
    .add(wavesTL, 0)
    .add(birdsTL, 0);
}

const audio = () => {
    let audioPlaying = false;
    let audioBtn = document.getElementById("audio-btn");
    let playIcon = document.getElementById("play-sound");
    let muteIcon = document.getElementById("mute-sound");

    let oceanWavesTL = new TimelineLite();
    let oceanWaves = new Audio("/assets/sound/ocean-waves-loop.wav");
    oceanWaves.oncanplaythrough = () => {
        console.log('audio can play');
        if(!audioPlaying) {
            // oceanWaves.play();
            oceanWaves.volume = 0;
            oceanWaves.loop = true;
        }
    }

    let seagullsTL = new TimelineLite();
    let seagulls = new Audio("/assets/sound/seagulls_peaceful.wav");
    // seagulls.play();
    seagulls.volume = 0;
    seagulls.loop = true;
    const seagullLoop = () => {
        setTimeout(() => {
            if(audioPlaying) {
                if((Math.floor(Math.random() * 2) + 1) % 2 == 0) {
                    seagullsTL.to(seagulls, {volume: 0.4});
                    seagullsTL.to(seagulls, {delay: 10, volume: 0});
                }
            }
            seagullLoop();
        }, 5000);
    }
    seagullLoop();

    const updateAudioStatus = () => {
        if(oceanWaves.paused) {
            oceanWaves.play();
            seagulls.play();
        }

        if(audioPlaying) {
            oceanWavesTL.to(oceanWaves, {volume: 0});
            seagullsTL.to(seagulls, {volume: 0});
            seagulls.volume = 0;
            audioPlaying = false;
        } else {
            oceanWavesTL.to(oceanWaves, {volume: 0.1});
            audioPlaying = true;
        }
    }

    audioBtn.addEventListener("click", () => {
        if(audioPlaying) {
            playIcon.style.display = "block";
            muteIcon.style.display = "none";
        } else {
            muteIcon.style.display = "block";
            playIcon.style.display = "none";
        }
        updateAudioStatus();
    });
}

const scroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
    
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

window.onload = () => {
    let t1 = performance.now();
    console.log('Page has loaded');
    console.log("Page load took " + (t1 - t0) + " milliseconds.");
    loaded = true;
    animation();
    audio();
    scroll();
}
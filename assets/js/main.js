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
    document.getElementById("pre-loader").style.display = 'none';
    document.body.classList.remove("noScroll");
}
loadingLoop();

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

    let masterTL = new TimelineMax({repeat: -1});
    masterTL.to(clouds, 320, {
        backgroundPosition: "-6352px 0px",
        ease: Linear.easeNone
    })
    .to(waveBackground, 100, {
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
    .add(birdsTL, 0);
}


const audio = () => {
    let oceanWaves = new Audio("/assets/sound/ocean-waves-loop.wav");
    
    oceanWaves.oncanplaythrough = () => {
        console.log('audio can play');
        oceanWaves.play();
        oceanWaves.volume = 0.05;
        oceanWaves.loop = true;
    }
}

window.onload = () => {
    let t1 = performance.now();
    console.log('Page has loaded');
    console.log("Page load took " + (t1 - t0) + " milliseconds.");
    loaded = true;
    animation();
    // audio();
}
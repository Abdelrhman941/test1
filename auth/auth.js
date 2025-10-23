// Initialize Liquid Ether Background
if (typeof LiquidEther !== 'undefined') {
    const bgContainer = document.getElementById('liquidEtherBg');
    new LiquidEther(bgContainer, {
        colors: ['#5227FF', '#FF9FFC', '#B19EEF'],
        mouseForce: 20,
        cursorSize: 100,
        isViscous: false,
        viscous: 30,
        iterationsViscous: 32,
        iterationsPoisson: 32,
        resolution: 0.5,
        isBounce: false,
        autoDemo: true,
        autoSpeed: 0.5,
        autoIntensity: 2.2,
        takeoverDuration: 0.25,
        autoResumeDelay: 3000,
        autoRampDuration: 0.6
    });
}

// True Focus Animation
class TrueFocus {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.frame = document.getElementById('focusFrame');
        this.words = Array.from(this.container.querySelectorAll('.focus-word'));

        this.blurAmount = options.blurAmount || 5;
        this.animationDuration = options.animationDuration || 0.5;
        this.pauseBetweenAnimations = options.pauseBetweenAnimations || 1;

        this.currentIndex = 0;
        this.init();
    }

    init() {
        this.animateWords();
        setInterval(() => {
            this.currentIndex = (this.currentIndex + 1) % this.words.length;
            this.animateWords();
        }, (this.animationDuration + this.pauseBetweenAnimations) * 1000);
    }

    animateWords() {
        const activeWord = this.words[this.currentIndex];

        this.words.forEach((word, index) => {
            if (index === this.currentIndex) {
                word.style.filter = 'blur(0px)';
            } else {
                word.style.filter = `blur(${this.blurAmount}px)`;
            }
        });

        this.updateFramePosition(activeWord);
    }

    updateFramePosition(activeWord) {
        const containerRect = this.container.getBoundingClientRect();
        const wordRect = activeWord.getBoundingClientRect();

        const x = wordRect.left - containerRect.left;
        const y = wordRect.top - containerRect.top;
        const width = wordRect.width;
        const height = wordRect.height;

        this.frame.style.transform = `translate(${x}px, ${y}px)`;
        this.frame.style.width = `${width}px`;
        this.frame.style.height = `${height}px`;
        this.frame.classList.add('active');
    }
}

// Handle responsive recalculation on window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (trueFocus && trueFocus.words[trueFocus.currentIndex]) {
            trueFocus.updateFramePosition(trueFocus.words[trueFocus.currentIndex]);
        }
    }, 250);
});

// Initialize True Focus
const trueFocus = new TrueFocus('trueFocus', {
    blurAmount: 3,
    animationDuration: 0.5,
    pauseBetweenAnimations: 0.8
});

let isSignUpMode = false;
let isAnimating = false;

function toggleForms() {
    if (isAnimating) return;
    isAnimating = true;

    const authCard = document.getElementById('authCard');
    const signinForm = document.getElementById('signinForm');
    const signupForm = document.getElementById('signupForm');
    const welcomeSignup = document.getElementById('welcomeSignup');
    const welcomeSignin = document.getElementById('welcomeSignin');

    isSignUpMode = !isSignUpMode;

    // Determine animation timing based on viewport width
    const isMobile = window.innerWidth <= 768;
    const transitionDelay = isMobile ? 300 : 400;
    const totalDuration = isMobile ? 1000 : 1200;

    if (isSignUpMode) {
        authCard.classList.add('signup-mode');

        setTimeout(() => {
            signinForm.classList.add('hidden');
            welcomeSignup.classList.add('hidden');

            setTimeout(() => {
                signupForm.classList.remove('hidden');
                welcomeSignin.classList.remove('hidden');
            }, 100);
        }, transitionDelay);

    } else {
        authCard.classList.remove('signup-mode');

        setTimeout(() => {
            signupForm.classList.add('hidden');
            welcomeSignin.classList.add('hidden');

            setTimeout(() => {
                signinForm.classList.remove('hidden');
                welcomeSignup.classList.remove('hidden');
            }, 100);
        }, transitionDelay);
    }

    setTimeout(() => {
        isAnimating = false;
    }, totalDuration);
}

function handleSignIn(event) {
    event.preventDefault();
    const btn = event.target.querySelector('button');
    btn.textContent = 'Signing in...';
    btn.disabled = true;

    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1000);
}

function handleSignUp(event) {
    event.preventDefault();
    const btn = event.target.querySelector('button');
    btn.textContent = 'Creating account...';
    btn.disabled = true;

    setTimeout(() => {
        window.location.href = 'onboarding.html';
    }, 1000);
}

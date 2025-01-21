const text = new SplitType('.hero-title', {types: "words, chars"});

text.chars.forEach((char, index) => {

    let charsTl = gsap.timeline();

    charsTl.from(char, {
        y: gsap.utils.random(-150, 150),
        x: gsap.utils.random(-300, 300),
        rotate: gsap.utils.random(-360, 360),
        scale: gsap.utils.random(0, 2),
        opacity: 0,
        duration: .75,
        ease: "back.out",
        delay: index * 0.01
    })
    charsTl.from(char, {
        color: `rgb(${gsap.utils.random(0, 255)}, ${gsap.utils.random(0, 255)}, ${gsap.utils.random(0, 255)})`,
        duration: 1,
    }, "-=.25")


    char.addEventListener("mouseenter", charsHover);

    let charOriginalColor = window.getComputedStyle(char).color;

    function charsHover() {

        gsap.timeline()
        .to(char, {
            y: gsap.utils.random(-50, 50),
            x: gsap.utils.random(-50, 50),
            rotate: gsap.utils.random(-90, 90),
            scale: gsap.utils.random(0.5, 1.5),
            duration: .5,
            ease: "back.out",
            color: `rgb(${gsap.utils.random(0, 255)}, ${gsap.utils.random(0, 255)}, ${gsap.utils.random(0, 255)})`,
            onStart: () => {
                char.removeEventListener("mouseenter", charsHover);
            }
        })
        .to(char, {
            y: 0,
            x: 0,
            rotate: 0,
            scale: 1,
            color: charOriginalColor,
            delay: 1,
            duration: .5,
            ease: "back.out",
            onComplete: () => {
                setTimeout(() => {
                    char.addEventListener("mouseenter", charsHover);
                }, 100);
            }
        })
    }

})
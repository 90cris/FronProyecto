import React, { useEffect } from "react";
import "../estilos/BubbleBackground.css";

const BubbleEffect = () => {
  useEffect(() => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();

    function createSound(size, fr, delay, type, vol) {
      for (let i = 0; i < size; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        setTimeout(() => {
          osc.frequency.value = fr * i;
          gain.gain.value = vol;
          osc.type = type;
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();

          setTimeout(() => {
            let gVal = gain.gain.value;
            function reduceGain() {
              gVal -= 0.02;
              if (gVal > 0) {
                requestAnimationFrame(reduceGain);
              } else {
                osc.stop();
              }
              gain.gain.value = gVal / 7;
            }
            reduceGain();
          }, delay);
        }, i * delay);
      }
    }

    function getRandomColor() {
      const colors = ["#456", "#890", "#634", "#299", "tomato", "#fb3"];
      const idx = Math.floor(colors.length * Math.random());
      return colors[idx];
    }

    function animateIt(el, dur, delay) {
      const animation = el.animate(
        [
          { opacity: 0, transform: "translate(-50%, -50%) scale(0)" },
          { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
          { opacity: 0, transform: "translate(-50%, -50%) scale(1.1)" },
        ],
        {
          duration: dur,
          easing: "ease-out",
          fill: "forwards",
          delay: delay || 0,
        }
      );

      return animation;
    }

    function createBubble(x, y) {
      // const ns = "http://www.w3.org/2000/svg";
      const ns = "https://thenounproject.com/browse/icons/term/bubble/";
      const bubble = document.createElement("div");
      const bubbleDummy = document.createElement("div");
      const heart = document.createElementNS(ns, "svg");
      const heartPath = document.createElementNS(ns, "path");

      heart.setAttribute("viewBox", "0 0 600 500");
      heartPath.setAttribute(
        "d",
        "M300,150 C500,10 600,300 300,400 C0,300 100,10 300,150"
      );
      bubble.classList.add("bubble");
      bubble.style.color = getRandomColor();
      bubbleDummy.classList.add("bubble-dummy");
      heart.classList.add("heart");

      heart.appendChild(heartPath);
      bubble.appendChild(bubbleDummy);
      bubble.appendChild(heart);

      document.body.appendChild(bubble);
      bubble.style.left = `${x - bubble.offsetWidth / 2}px`;
      bubble.style.top = `${y - bubble.offsetHeight / 2}px`;

      const bubbleAnim = animateIt(bubbleDummy, 1200);
      const heartAnim = animateIt(heart, 2000);

      const totalDelay = 2000;

      setTimeout(() => {
        bubble.remove();
      }, totalDelay);
    }

    function handleDown(e) {
      const x = e.pageX || e.touches[0].pageX;
      const y = e.pageY || e.touches[0].pageY;

      createBubble(x, y);
      //   createSound(20, 5000, 1, "sawtooth", 1);
    }

    document.body.addEventListener("click", handleDown, false);
    document.body.addEventListener("touchstart", handleDown, false);

    return () => {
      document.body.removeEventListener("click", handleDown);
      document.body.removeEventListener("touchstart", handleDown);
    };
  }, []);

  return null; // Este componente no tiene elementos visibles, solo efectos
};

export default BubbleEffect;

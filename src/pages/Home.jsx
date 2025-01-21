import React, { useEffect } from "react";
// import BubbleEffect from "../componentes/BubbleEffect ";
import "../estilos/Home.css";


export const Home = () => {
  // useEffect(() => {

  //   const loadScripts = async () => {
  
  //     const gsapScript = document.createElement("script");
  //     gsapScript.src =
  //       "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js";
  //     gsapScript.async = true;
  //     document.body.appendChild(gsapScript);

  
  //     const splitTypeScript = document.createElement("script");
  //     splitTypeScript.src = "https://unpkg.com/split-type";
  //     splitTypeScript.async = true;
  //     document.body.appendChild(splitTypeScript);


  //     splitTypeScript.onload = () => {
  //       const text = new SplitType(".hero-title", { types: "words, chars" });

  //       text.chars.forEach((char, index) => {
  //         let charsTl = gsap.timeline();

  //         charsTl.from(char, {
  //           y: gsap.utils.random(-150, 150),
  //           x: gsap.utils.random(-300, 300),
  //           rotate: gsap.utils.random(-360, 360),
  //           scale: gsap.utils.random(0, 2),
  //           opacity: 0,
  //           duration: 0.75,
  //           ease: "back.out",
  //           delay: index * 0.01,
  //         });
  //         charsTl.from(
  //           char,
  //           {
  //             color: `rgb(${gsap.utils.random(0, 255)}, ${gsap.utils.random(
  //               0,
  //               255
  //             )}, ${gsap.utils.random(0, 255)})`,
  //             duration: 1,
  //           },
  //           "-=.25"
  //         );

  //         char.addEventListener("mouseenter", charsHover);

  //         let charOriginalColor = window.getComputedStyle(char).color;

  //         function charsHover() {
  //           gsap
  //             .timeline()
  //             .to(char, {
  //               y: gsap.utils.random(-50, 50),
  //               x: gsap.utils.random(-50, 50),
  //               rotate: gsap.utils.random(-90, 90),
  //               scale: gsap.utils.random(0.5, 1.5),
  //               duration: 0.5,
  //               ease: "back.out",
  //               color: `rgb(${gsap.utils.random(0, 255)}, ${gsap.utils.random(
  //                 0,
  //                 255
  //               )}, ${gsap.utils.random(0, 255)})`,
  //               onStart: () => {
  //                 char.removeEventListener("mouseenter", charsHover);
  //               },
  //             })
  //             .to(char, {
  //               y: 0,
  //               x: 0,
  //               rotate: 0,
  //               scale: 1,
  //               color: charOriginalColor,
  //               delay: 1,
  //               duration: 0.5,
  //               ease: "back.out",
  //               onComplete: () => {
  //                 setTimeout(() => {
  //                   char.addEventListener("mouseenter", charsHover);
  //                 }, 100);
  //               },
  //             });
  //         }
  //       });
  //     };
  //   };

  //   loadScripts();

 
  //   return () => {
  //     document.body.removeChild(
  //       document.querySelector(
  //         'script[src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"]'
  //       )
  //     );
  //     document.body.removeChild(
  //       document.querySelector('script[src="https://unpkg.com/split-type"]')
  //     );
  //   };
  // }, []);

  return (
    <div className="centered-container">
      {/* <h1 className="hero-title">
        REGISTRATE !<br />Y forma parte <br />
        de nosotros
      </h1> */}
      <h1 className="hero-title">
        Bienvenido !<br />Registrate
      </h1>
    </div>
  );
};

import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { smoother } from "../Navbar";

export function initialFX() {
  document.body.style.overflowY = "auto";
  smoother.paused(false);
  document.getElementsByTagName("main")[0].classList.add("main-active");
  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 1,
  });

  var landingText = new SplitText(
    [".landing-info h3", ".landing-intro h2", ".landing-intro h1"],
    {
      type: "chars,lines",
      linesClass: "split-line",
    }
  );
  gsap.fromTo(
    landingText.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  let TextProps = { type: "chars,lines", linesClass: "split-h2" };

  var fg1 = new SplitText(".landing-h2-info", TextProps);
  var fg2 = new SplitText(".landing-h2-info-1", TextProps);
  var fg3 = new SplitText(".landing-h2-info-2", TextProps);

  var bg1 = new SplitText(".landing-h2-1", TextProps);
  var bg2 = new SplitText(".landing-h2-2", TextProps);
  var bg3 = new SplitText(".landing-h2-3", TextProps);

  gsap.fromTo(
    [fg1.chars, bg1.chars],
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      y: 0,
      delay: 0.8,
    }
  );
  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  gsap.set(fg2.chars, { opacity: 0, y: 80 });
  gsap.set(fg3.chars, { opacity: 0, y: 80 });
  gsap.set(bg2.chars, { opacity: 0, y: 80 });
  gsap.set(bg3.chars, { opacity: 0, y: 80 });

  LoopText3Sync(fg1, fg2, fg3, bg1, bg2, bg3);
}

function LoopText3Sync(fg1: SplitText, fg2: SplitText, fg3: SplitText, bg1: SplitText, bg2: SplitText, bg3: SplitText) {
  var tl = gsap.timeline({ repeat: -1 });
  const delay = 3;

  tl.to([fg1.chars, bg1.chars], { y: -80, opacity: 0, duration: 1.2, ease: "power3.inOut", stagger: 0.05 }, `+=${delay}`)
    .fromTo([fg2.chars, bg2.chars], { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.inOut", stagger: 0.05 }, "<")
    
  tl.to([fg2.chars, bg2.chars], { y: -80, opacity: 0, duration: 1.2, ease: "power3.inOut", stagger: 0.05 }, `+=${delay}`)
    .fromTo([fg3.chars, bg3.chars], { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.inOut", stagger: 0.05 }, "<")

  tl.to([fg3.chars, bg3.chars], { y: -80, opacity: 0, duration: 1.2, ease: "power3.inOut", stagger: 0.05 }, `+=${delay}`)
    .fromTo([fg1.chars, bg1.chars], { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.inOut", stagger: 0.05 }, "<");
}

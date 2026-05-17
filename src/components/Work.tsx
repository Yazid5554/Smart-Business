import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useState } from "react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  const [activeProject, setActiveProject] = useState<any>(null);
  useGSAP(() => {
  let translateX: number = 0;

  function setTranslateX() {
    const box = document.getElementsByClassName("work-box");
    if (box.length === 0) return 0;
    const rectLeft = document
      .querySelector(".work-container")!
      .getBoundingClientRect().left;
    const rect = box[0].getBoundingClientRect();
    const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
    let padding: number =
      parseInt(window.getComputedStyle(box[0]).padding) / 2;
    translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    return translateX;
  }

  setTranslateX();

  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".work-section",
      start: "top top",
      end: () => `+=${setTranslateX()}`, 
      scrub: true,
      pin: true,
      invalidateOnRefresh: true,
      id: "work",
    },
  });

  timeline.to(".work-flex", {
    x: () => -translateX,
    ease: "none",
  });

  // Clean up (optional, good practice)
  return () => {
    timeline.kill();
    ScrollTrigger.getById("work")?.kill();
  };
}, []);
  return (
    <div className="work-section" id="work">
      {activeProject && (
        <div className="work-modal-overlay" onClick={() => setActiveProject(null)}>
          <div className="work-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="work-modal-close" onClick={() => setActiveProject(null)}>✕</button>
            <img className="work-modal-image" src={activeProject.image} alt={activeProject.title} />
            <div className="work-modal-details">
              <h3>{activeProject.title}</h3>
              <div className="tech-tags">
                {activeProject.tech.split(',').map((t: string, i: number) => (
                  <span key={i} className="tech-tag">{t.trim()}</span>
                ))}
              </div>
              <p style={{ marginTop: '20px' }}>{activeProject.desc}</p>
            </div>
          </div>
        </div>
      )}

      <div className="work-container section-container">
        <h2>
          Portofolio <span>Kami</span>
        </h2>
        <div className="work-flex">
          {[
            {
              title: "E-Commerce Platform",
              desc: "Web Aplikasi Jual Beli Online",
              tech: "React, Node.js, Express, MongoDB",
              image: "/images/E-COMMERS.png"
            },
            {
              title: "Mobile Application",
              desc: "Aplikasi Seluler Skalabel",
              tech: "React Native, Firebase, API",
              image: "/images/Mobile APP.png"
            },
            {
              title: "IoT Dashboard",
              desc: "Platform Pemantauan Smart Device",
              tech: "Next.js, TypeScript, MQTT",
              image: "/images/IoT.png"
            },
            {
              title: "IoT Sensor App",
              desc: "Aplikasi Integrasi Sensor Real-time",
              tech: "C++, React, WebSockets",
              image: "/images/IoT Sensor.png"
            },
            {
              title: "Brand Identity",
              desc: "Desain Identitas & Branding",
              tech: "Figma, Illustrator, UI/UX",
              image: "/images/Brand Identity Design.png"
            },
            {
              title: "Portfolio Website",
              desc: "Web Profil & Portofolio Perusahaan",
              tech: "React, GSAP, Three.js",
              image: "/images/Portofolio.png"
            }
          ].map((project, index) => (
            <div 
              className="work-box" 
              key={index}
              onClick={() => setActiveProject(project)}
              style={{ cursor: "pointer" }}
            >
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.desc}</p>
                  </div>
                </div>
                <h4>Teknologi & Fitur</h4>
                <p>{project.tech}</p>
              </div>
              <WorkImage image={project.image} alt={project.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;

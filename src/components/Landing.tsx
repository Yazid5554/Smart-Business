import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Halo! Kami adalah</h2>
            <h1>
              MYCODEV
            </h1>
          </div>
          <div className="landing-info">
            <h3>Solusi Bisnis</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Digital Cerdas</div>
              <div className="landing-h2-2">Tanpa Batas</div>
              <div className="landing-h2-3">Masa Depan</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Digital Cerdas</div>
              <div className="landing-h2-info-1">Tanpa Batas</div>
              <div className="landing-h2-info-2">Masa Depan</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;

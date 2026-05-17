import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          Perjalanan <span>&</span>
          <br /> Pencapaian Kami
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Pendirian</h4>
                <h5>MyCodev</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Awal mula perjalanan MyCodev didirikan dengan visi untuk membawa solusi digital cerdas bagi bisnis dan transformasi teknologi.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Solusi Klien</h4>
                <h5>Pertama</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Kami berhasil mengirimkan solusi digital MVP untuk klien perintis, menandakan langkah maju yang signifikan dalam industri ini.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Memperluas Dampak</h4>
                <h5>Digital</h5>
              </div>
              <h3>KINI</h3>
            </div>
            <p>
              Kami terus berevolusi, membangun platform yang lebih kuat, dan menyebarkan dampak digital positif untuk lebih banyak korporat & UMKM.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;

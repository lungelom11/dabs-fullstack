import "../styles/hero.css";
import HeroIMG from "../images/doctor.png";

const Hero = () => {
  return (
    <>
      <div className="hero">
        <div className="hero-content">
          <h1>BOOK YOUR APPOINTMENT NOW</h1>

          <p className="hero-text">
            Take charge of your health and schedule your appointment with ease!
            Our team of dedicated doctors is here to support you on your
            wellness journey. Dont wait, prioritize your well-being today and
            book your appointment hassle-free.
          </p>

          <button>Book Now</button>
        </div>
        <div className="hero-img">
          <img src={HeroIMG} alt="IMAGE" />
        </div>
      </div>
    </>
  );
};

export default Hero;

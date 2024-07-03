import "./hero.css";
import { Link } from "react-router-dom";
import HeroImg from "../../images/doctor.png";

const Hero = () => {
  return (
    <>
      <div className="hero-container">
        <div className="hero-content">
          <h1>
            Book Your Appointments With <span className="catch">Ease!</span>
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            repudiandae sint id nam excepturi. Tenetur facere dolores provident
            vero ut?
          </p>
          <Link to="/patient/book" className="hero-btn">
            Book Now
          </Link>
        </div>
        <div className="hero-img">
          <img src={HeroImg} />
        </div>
      </div>
    </>
  );
};

export default Hero;

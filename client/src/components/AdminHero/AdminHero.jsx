import "../Hero/hero.css";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
        <div className="admin-content">
          <h1>
            Manage Patients And Appointments With <span className="catch">Ease!</span>
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            repudiandae sint id nam excepturi. Tenetur facere dolores provident
            vero ut?
          </p>
          <Link to="/patient/book" className="hero-btn">
            Manage
          </Link>
        </div>
    </>
  );
};

export default Hero;

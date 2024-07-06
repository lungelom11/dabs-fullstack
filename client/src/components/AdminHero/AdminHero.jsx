import "../Hero/hero.css";
import { Link } from "react-router-dom";
import {Button} from "@chakra-ui/react"

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
         <Button colorScheme="blue" style={{padding:
          "20px"
         }} width="150px">
         <Link to="/admin/home">
            Manage
          </Link>
         </Button>
        </div>
    </>
  );
};

export default Hero;

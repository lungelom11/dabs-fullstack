import Hero from "../components/Hero/Hero";
import Navbar from "../components/Navbar/Navbar";

const HomePage = () => {
  return (
    <>
      <div style={{ backgroundColor: "whitesmoke" }}>
        <Navbar />
        <Hero />
      </div>
    </>
  );
};

export default HomePage;

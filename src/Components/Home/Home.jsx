import "./Home.css";
import HomeFilter from "./HomeFilter";

const Home = (props) => {
  return (
    <div className="homeImageContainer">
      <div className="homeImage">
        <img src="https://wallpapercave.com/wp/wp11013389.jpg" alt="Home" />
        <div className="homeContent">
          <h1>Find Your Perfect Home!</h1>
          <p>Discover the best place for you with safe and economical.</p>
        </div>
        <HomeFilter />
      </div>
    </div>
  );
};

export default Home;

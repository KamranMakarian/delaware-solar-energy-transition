import Header from "../components/Header/Header";
import DistrictCard from "../components/DistrictCard/DistrictCard";
import districtData from "../data/district.json";
import "./Home.css";

function Home() {  

  return (
    <div>
      <Header />
      <div className="district-cards">
      {districtData.map((districtData) => {
        return (
          <DistrictCard
            key={districtData.id}
            id={districtData.id}
            memberName={districtData.memberName}
            party={districtData.party}
            imagePath={districtData.imagePath}
          />
        );
      })}
      </div>
    </div>
  );
}

export default Home;

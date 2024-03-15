import Header from "../components/Header/Header";
import DistrictCard from "../components/DistrictCard/DistrictCard";


function Home() {
    return (
        <div>
            <Header />
            <DistrictCard districtName="District 1" districtData="Data for District 1" />
            <DistrictCard districtName="District 2" districtData="Data for District 2" />
            <DistrictCard districtName="District 3" districtData="Data for District 3" />
        </div>
    );

}

export default Home;
import React, { useEffect, useState } from "react";
import { Select, Box } from "@chakra-ui/react";
import districtData from "../../data/district.json";
import "./ComparisonSelect.css";

function ComparisonSelect({ activeDistrict, onSelectDistrict }) {
  const [selectedDistrict, setSelectedDistrict] = useState();

  useEffect(() => {
    setSelectedDistrict(selectedDistrict);
  }, [selectedDistrict]);

  const handleDistrictChange = (e) => {
    const selectedValue = e.target.value;
    onSelectDistrict(selectedValue);
    setSelectedDistrict(selectedValue);
  };

  return (
    <div className="comparison-select">
      <Select
        placeholder="Select District to Compare"
        className="comparison-select"
        variant="filled"
        bg="yellow.500"
        onChange={handleDistrictChange}
        value={selectedDistrict}
      >
        {districtData.map(
          (district) =>
            district.id !== activeDistrict && (
              <option key={district.id} value={district.id}>
                District {district.id}
              </option>
            )
        )}
      </Select>

    </div>
  );
}

export default ComparisonSelect;



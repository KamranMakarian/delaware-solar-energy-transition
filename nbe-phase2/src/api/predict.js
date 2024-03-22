import axios from "axios";

export const predict = async (districtId) => {
  const config = {
    method: "get",
    maxbodylength: Infinity,
    url: `https://nbande-solar-app-v1.delightfulmeadow-bdf28bd3.westus2.azurecontainerapps.io/predict?district=${districtId}`,
    headers: {},
  };

  try {
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error(error.toString());
  }
};

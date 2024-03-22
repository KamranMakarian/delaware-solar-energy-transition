import axios from "axios";

export const predict = async (districtId) => {

  try {
    const response = await axios.get(
      `https://nbande-solar-app-v1.delightfulmeadow-bdf28bd3.westus2.azurecontainerapps.io/predict?district=${districtId}`
    );    
    return response.data;
  }
  catch (error) {
    console.error(error.toString());
    throw error;
  }

  // axios({
  //   method: "get",
  //   url: `https://nbande-solar-app-v1.delightfulmeadow-bdf28bd3.westus2.azurecontainerapps.io/predict?district=${districtId}`,
  //   headers: {},
  // })
  //   .then((response) => {
  //     console.log("data from predict", response.data);
  //     return response.data;
  //   })
  //   .catch((error) => {
  //     console.error(error.toString());
  //   });
};

// const config = {
//   method: "get",
//   maxbodylength: Infinity,
//   url: `https://nbande-solar-app-v1.delightfulmeadow-bdf28bd3.westus2.azurecontainerapps.io/predict?district=${districtId}`,
//   headers: {},
// };

// try {
//   const response = await axios.request(config);
//   const responseData = await response.data;
//   return responseData;
// } catch (error) {
//   console.error(error.toString());
//   throw error;
// }

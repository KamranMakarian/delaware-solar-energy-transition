// import axios from "axios";

// export const predict = (districtId) =>
//   axios({
//     method: "get",
//     url: `https://nbande-solar-app-v1.delightfulmeadow-bdf28bd3.westus2.azurecontainerapps.io/predict`,
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ district: districtId }),
//   })
//     .then((response) => {
//       console.log(response);
//       return response.data;
//     })
//     .catch((error) => {
//       console.log(error);
//       throw error;
//     });

// https://nbande-solar-app-v1.delightfulmeadow-bdf28bd3.westus2.azurecontainerapps.io/predict

// {"district":3}


export const predict = (districtId) =>
{
const axios = require("axios");

let data = JSON.stringify({
  district: districtId,
});

let config = {
  method: "get",
  maxBodyLength: Infinity,
  url: "https://nbande-solar-app-v1.delightfulmeadow-bdf28bd3.westus2.azurecontainerapps.io/predict",
  headers: {
    "Content-Type": "application/json",
  },
  data: data,
};

axios
  .request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
}

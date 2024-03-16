import axios from "axios";

export const predict = (districtId) =>
  axios({
    method: "get",
    url: `http://localhost:5000/predict/${districtId}`,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });

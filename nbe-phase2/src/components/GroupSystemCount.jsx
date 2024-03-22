function GroupSystemCount({ data }) {
  if (!Array.isArray(data)) {
    console.error("Data is not an array.");
  } else {
    const groupedData = data.reduce((result, item) => {
      const key = item.Prediction_Flag === 0 ? "Historical" : "Prediction";
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(item);
      console.log("groupedData", groupedData);
      return result;
    }, {});
  }

  // Prepare the data for Nivo line chart
  // const chartData = Object.entries(groupedData).map(([key, values]) => ({
  //     id: key,
  //     data: values.map(item => ({
  //         x: item.Date,
  //         y: item.system_count
  //     }))
  // }));

  // return chartData;
}

export default GroupSystemCount;

const key = "CNT58F5S2GO56H6M";
const functionName = "TIME_SERIES_DAILY";
const symbolName = "MSFT";
const apiUrl = `https://www.alphavantage.co/query?function=${functionName}&symbol=${symbolName}&apikey=${key}`;

// GET data from API
axios
  .get(apiUrl)
  .then((response) => {
    const { data } = response;
    const xAxis = Object.keys(data["Time Series (Daily)"]);
    const close = Object.values(data["Time Series (Daily)"]).map(
      (dayData) => dayData["4. close"]
    );
    const open = Object.values(data["Time Series (Daily)"]).map(
      (dayData) => dayData["1. open"]
    );

    paintData(xAxis, close, open);
  })
  .catch((e) => console.error("Error getting data", e));

// Paint data using Chart.js
const paintData = (xAxis, close, open) => {
  const ctx = document.getElementById("my-chart").getContext("2d");

  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: xAxis,
      datasets: [
        {
          data: close,
          label: "Close",
          borderColor: "red",
          backgroundColor: "transparent",
        },
        {
          data: open,
          label: "Open",
          borderColor: "blue",
          backgroundColor: "transparent",
        },
      ],
    },
  });
};

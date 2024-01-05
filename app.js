const ctx = document.getElementById("myChart");

const priceData = await fetchPriceData();
console.log("This is the priceData:", priceData);

const dateData = await fetchDateData();
console.log("This is the dateData:", dateData);

new Chart(ctx, {
  type: "line",
  data: {
    labels: dateData,
    datasets: [
      {
        label: "Monthly Value $",
        data: priceData,
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: false,
      },
      ticks: {
        callback: (value) => `$${value}`,
      },
    },
  },
});

async function fetchPriceData() {
  //Fetch json data
  const response = await fetch("data.json");
  const data = await response.json();

  //Declare price array
  const priceArr = [];

  //Iterate over data object
  data.forEach((obj) => {
    //Update price array
    let price = Math.round(obj.PRICE * 100) / 100;
    priceArr.push(price);
  });
  console.log("Price array:", priceArr);
  return priceArr;
}

async function fetchDateData() {
  //Fetch json data
  const response = await fetch("data.json");
  const data = await response.json();

  //Declare date array
  const dateArr = [];

  //Iterate over data object
  data.forEach((obj) => {
    //Update date array
    let date = obj.DATE;
    dateArr.push(date);
  });
  console.log("Date array:", dateArr);
  return dateArr;
}

  const doneTypingInterval = 200;
  const input = document.getElementById("input");
  let typingTimer;
  let firstValue = input.value;

  const ctx = document.getElementById("chart").getContext("2d");

  const chart = new Chart(ctx, {
    type: "pie",
    data: {
      datasets: [
        {
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)"
          ]
        }
      ],
      labels: ["a", "b", "c"]
    }
  });

  input.addEventListener("keyup", function () {
    if (input.value === firstValue) return;
    updateIndicators();
    clearTimeout(typingTimer);
    typingTimer = setTimeout(updateChart, doneTypingInterval);
    firstValue = input.value;

  });

  input.addEventListener("keydown", function () {
    if (input.value === firstValue) return;
    updateIndicators();
    clearTimeout(typingTimer);
    firstValue = input.value;

  });

  input.addEventListener("paste", function () {
    setTimeout(updateIndicators, doneTypingInterval);
    setTimeout(updateChart, doneTypingInterval);
    firstValue = input.value;
  });

  function getData(inputValue) {
    let value = inputValue.toLowerCase().split("");

    let map = {
      a: 0,
      b: 0,
      c: 0
    }

    for (let i = 0; i < value.length; i++) {
      if (value[i] === "a") map.a++;
      if (value[i] === "b") map.b++;
      if (value[i] === "c") map.c++;
    }

    return map;
  }

  function updateIndicators() {
    let data = getData(input.value);

    document.getElementById("indicator_a").textContent = `a: ${data.a}`;
    document.getElementById("indicator_b").textContent = `b: ${data.b}`;
    document.getElementById("indicator_c").textContent = `c: ${data.c}`;
  }

  function updateChart() {

    let data = getData(input.value);
    let sum = data.a + data.b + data.c;

    let chartData = [
      Math.round((data.a / sum) * 100),
      Math.round((data.b / sum) * 100),
      Math.round((data.c / sum) * 100)
    ];

    if (JSON.stringify(chart.data.datasets[0].data) === JSON.stringify(chartData)) return;

    chart.data.datasets[0].data = chartData;

    chart.options.tooltips = {
      callbacks: {
        label: function (tooltipItem, data) {
          var label =
            data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] || "";
          return label + "%";
        }
      }
    };

    chart.update();
  }
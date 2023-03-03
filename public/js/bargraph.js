import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

$(document).ready(async () => {
  const response = await fetch('/event', {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }

  });
  data = await response.json();
  for(let i = 0; i < data.length; i++) {

    let dueDate = dayjs(data[i].due_date);
    console.log(dueDate);

    let t1 = data[i].category.t1.split(" ");
    let t2 = data[i].category.t2.split(" ");
    let t3 = data[i].category.t3.split(" ");
    t1 = dueDate.subtract(t1[0], t1[1]);
    t2 = dueDate.subtract(t2[0], t2[1]);
    t3 = dueDate.subtract(t3[0], t3[1]);

    data[i].t1 = dayjs(t1).format("YYYY-MM-DD");
    data[i].t2 = dayjs(t2).format("YYYY-MM-DD");
    data[i].t3 = dayjs(t3).format("YYYY-MM-DD");
}
  drawBarGraph(data);
});

let data =[];
// let data = [
//   { description: "disaster management", weight: 5.044282881692003, "id": 1, due_date: dayjs("2023-04-15") },
//   { description: "analytics", weight: 5.111022997620935, "id": 2, due_date: dayjs("2023-04-15") },
//   { description: "systems management", weight: 5.255783212161269, "id": 3, due_date: dayjs("2023-05-01") },
//   { description: "human resources", weight: 5.420123698898777, "id": 13, due_date: dayjs("2023-06-01") },
//   { description: "machine learning", weight: 6.357388316151202, "id": 14, due_date: dayjs("2023-03-15") },
//   { description: "automation", weight: 6.579434311393074, "id": 15, due_date: dayjs("2023-04-01") },
//   { description: "health and safety", weight: 7.607482274852919, "id": 16, due_date: dayjs("2023-04-01") },
//   { description: "cost control", weight: 7.876784769962982, "id": 17, due_date: dayjs("2023-04-01") },
//   { description: "climate change", weight: 8.24345757335448, "id": 18, due_date: dayjs("2023-04-15") },
//   { description: "inventory management", weight: 8.511369645690111, "id": 19, due_date: dayjs("2023-04-15") },
//   { description: "transformation", weight: 8.650363516192993, "id": 20, due_date: dayjs("2023-05-01") },
//   { description: "supply chain", weight: 8.916204070843246, "id": 21, due_date: dayjs("2023-06-01") },
//   { description: "water treatment", weight: 9.996866186148543, "id": 22, due_date: dayjs("2023-07-01") },
//   { description: "water treatment test", weight: 9.996866186148543, "id": 23, due_date: dayjs("2023-05-01") },
//   { description: "disaster management test", weight: 5.044282881692003, "id": 10, due_date: dayjs("2023-06-01") }
// ];




function drawBarGraph(data) {
  let margin = { top: 10, right: 30, bottom: 60, left: 30 };
  // width of bar is based on window; height is based on number of array items * 45 pixels
  let width = $(window).width() - 100;
  let height = data.length * 45;

  let y = d3.scaleBand().range([height, 0]).padding(0.1);
  let x = d3.scaleLinear().range([0, $(window).width() - 100]);
  let today = dayjs();
  // creating the SVG element inside the barGraph div

  let svg = d3.select("#barGraph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

  // Scale the range of the data in the domains
  // X-axis: from today to the max due_date in data array
  // Y-axis: the events
  x.domain([today, d3.max(data, function (d) { return dayjs(d.due_date); })])
  y.domain(data.map(function (d) { return d.description; }));

  // create bars with 0 width at first. Animation will extend them later on
  svg.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("fill", function (d) {
      // must be updated for threshold colours
      if (today.isBefore(dayjs(d.t3))) {
        return "green";
      } else if (today.isBefore(dayjs(d.t2))) {
        return "yellow";
      } else if (today.isBefore(dayjs(d.t1))) {
        return "orange";
      }
      return "red";
    })
    .attr("class", "bar")
    .attr("width", 0)
    .attr("y", function (d) { return y(d.description); })
    .attr("height", y.bandwidth())
    .each(function (item) {
      // insert the links the links
      d3.select(this.parentNode)
        .insert("a")
        .attr('data-id', item.id)
        .attr('data-bs-toggle', 'modal')
        .attr('data-bs-target', '#eventModal')
        .style('cursor', 'pointer')
        .append(() => this);
    });


  // add the x Axis
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x)
      // sets the tick values - tick value array is filtered for unique dates only
      //.tickValues([dayjs(), ...data.map((item) => dayjs(item.due_date).format("YYYY/MM/DD")).filter((value, index, self) => self.indexOf(value) === index).map((item) => dayjs(item))])
      // using d3 format function 
      .tickFormat(d3.timeFormat("%Y-%m-%d"))
    )
    // rotating the x-axis labes to be more readable
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-65)");

  // add the y Axis
  svg.append("g")
    .attr("class", "y axis")
    .call(d3.axisRight(y))
    .selectAll("text")
    .attr("class", "bg-dark");

  // expanding the bar graphs on the screen
  svg.selectAll("rect")
    .transition()
    .duration(800)
    .attr("width", function (d) { return x(dayjs(d.due_date)); })
    .delay(function (d, i) { return (i * 150) });

}

$(window).resize(function () {
  $('#barGraph').empty();
  drawBarGraph(data)
});

import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

$(document).ready(async () => {
  const response = await fetch('/event', {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }

  });
  data = await response.json();
  drawBarGraph(data);
});

let data = [];

function drawBarGraph(data) {
  let margin = { top: 10, right: 30, bottom: 60, left: 30 };
  // width of bar is based on window; height is based on number of array items * 45 pixels
  let width = $(window).width() - 100;
  let height = data.length * 45;



var y = d3.scaleBand().range([height, 0]).padding(0.1);
var x = d3.scaleLinear().range([0, width]);
var svg = d3.select("#barGraph").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

// Scale the range of the data in the domains
x.domain([0, 9])
y.domain(data.map(function (d) { return d.name; }));

const color = ['#33a532d9', '#F7B500d9', '#BB1E10d9'];
var bars = svg.selectAll(".bar")
  .data(data)
  .enter().append("rect")
  .attr("fill", function (d) {
    if (d.nowTime > 6) {
      return '#33a532d9';
    } else if (d.nowTime > 3) {
      return "#F7B500d9";
    } else if (d.nowTime ) {
      return "#BB1E10d9";
    }
  })
  .attr("class", "bar")
  //.attr("width", function (d) { return x(d[topicscore]); })
  .attr("width", function (d) { return 0; })
  .attr("y", function (d) { return y(d.name); })
  .attr("height", y.bandwidth()).each(function (event) {
    d3.select(this.parentNode)
      .insert("a")
      .attr('data-id', event.id)
      .attr('data-bs-toggle', 'modal') // This makes the link open in a new window
      .attr('data-bs-target', '#eventModal') // This makes the link open in a new window
      .append(() => this);
  });


// add the x Axis
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x).tickSize(-height, 0, 0));


// add the y Axis
svg.append("g")
  .attr("class", "y axis")
  .call(d3.axisRight(y));

svg.selectAll("rect")
  .transition()
  .duration(800)
  .attr("width", function (d) { return x(d.nowTime); })
  .delay(function (d, i) { return (i * 100) });


}

$(window).resize(function () {
  $('#barGraph').empty();
  drawBarGraph(data)
});

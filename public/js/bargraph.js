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

  let y = d3.scaleBand().range([height, 0]).padding(0.1);
  let x = d3.scaleLinear().range([0, $(window).width() - 100]);
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
  x.domain([0, 9])
  y.domain(data.map(d => d.name));
  const subgroups = ["t1pct", "t2pct", "t3pct"]

  // color palette = one color per subgroup
  const color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(['#33a532d9', '#F7B500d9', '#BB1E10d9']);

  const stackedData = d3.stack()
  .keys(subgroups)
  (data);
  // create bars with 0 width at first. Animation will extend them later on
  svg.append("g")
    .selectAll("g")
    // Enter in the stack data = loop key per key = group per group
    .data(stackedData)
    .join("g")
    .attr("fill", d => color(d.key))
    .selectAll("rect")
    // enter a second time = loop subgroup per subgroup to add all rectangles
    .data(d => d)
    .join("rect")
    .attr("x", d => x(d[0]))
    .attr("y", d => y(d.data.name))
    .attr("width", d => x(d[1]) - x(d[0]))
    .transition()
    .duration(800)
    .delay(function (d, i) { return (i * 550) })
    .attr("height", y.bandwidth())
    .each(function (d) {
      // insert the links the links
      d3.select(this.parentNode)
        .insert("a")
        .attr('data-id', d.data.id)
        .attr('data-bs-toggle', 'modal')
        .attr('data-bs-target', '#eventModal')
        .style('cursor', 'pointer')
        .append(() => this);
    })
    ;


  // add the x Axis
  svg.append("g")
  .attr("transform", `translate(0, ${height})`)
 // .call(d3.axisBottom(x));
  
  // add the y Axis
  svg.append("g")
  //.attr("transform", `translate(0, ${width})`)
  .call(d3.axisRight(y));

}

$(window).resize(function () {
  $('#barGraph').empty();
  drawBarGraph(data)
});

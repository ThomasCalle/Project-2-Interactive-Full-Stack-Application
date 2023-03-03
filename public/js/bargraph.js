import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

$(document).ready(async () => {
  // gets event data to display on the page
    
    // const articleData = await fetch(`/api/articles/${element.parentElement.dataset.id}`, {
    //   method: "GET",
    //   headers: { 'Content-Type': 'application/json' },
    // });
    // const article = await articleData.json();
    // $("#test").html(JSON.stringify(article));
    drawBarGraph(data);
});

let data = [
  { topic: "disaster management", weight: 5.044282881692003, "id": 1, due_date: dayjs("2023-04-15")} , 
  { topic: "analytics", weight: 5.111022997620935, "id": 2, due_date:  dayjs("2023-04-15")}, 
  { topic: "systems management", weight: 5.255783212161269, "id": 3, due_date: dayjs("2023-05-01")}, 
  { topic: "human resources", weight: 5.420123698898777, "id": 13, due_date: dayjs("2023-06-01")}, 
  { topic: "machine learning", weight: 6.357388316151202, "id": 14, due_date:  dayjs("2023-03-15")}, 
  { topic: "automation", weight: 6.579434311393074, "id": 15, due_date:  dayjs("2023-04-01")}, 
  { topic: "health and safety", weight: 7.607482274852919, "id": 16, due_date: dayjs("2023-04-01")}, 
  { topic: "cost control", weight: 7.876784769962982, "id": 17, due_date:  dayjs("2023-04-01")} , 
  { topic: "climate change", weight: 8.24345757335448, "id": 18, due_date: dayjs("2023-04-15")}, 
  { topic: "inventory management", weight: 8.511369645690111, "id": 19, due_date: dayjs("2023-04-15")}, 
  { topic: "transformation", weight: 8.650363516192993, "id": 20, due_date: dayjs("2023-05-01")}, 
  { topic: "supply chain", weight: 8.916204070843246, "id": 21, due_date: dayjs("2023-06-01")}, 
  { topic: "water treatment", weight: 9.996866186148543, "id": 22, due_date: dayjs("2023-07-01")} , 
  { topic: "water treatment test", weight: 9.996866186148543, "id": 23, due_date: dayjs("2023-05-01")}, 
  { topic: "disaster management test", weight: 5.044282881692003, "id": 10, due_date: dayjs("2023-06-01")}
];




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
  x.domain([dayjs(), d3.max(data, function (d) { return dayjs(d.due_date); })])
  y.domain(data.map(function (d) { return d.topic; }));

  // create bars with 0 width at first. Animation will extend them later on
  svg.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("fill", function (d) {
      // must be updated for threshold colours
      if (d.due_date > 90) {
        return "red";
      } else if (d.due_date > 45) {
        return "orange";
      }
      return "yellow";
    })
    .attr("class", "bar")
    .attr("width", 0)
    .attr("y", function (d) { return y(d.topic); })
    .attr("height", y.bandwidth())
    .each(function (item) {
      // insert the links the links
      d3.select(this.parentNode)
        .insert("a")
        .attr('data-id', item.id)
        .attr('data-bs-toggle', 'modal') 
        .attr('data-bs-target', '#exampleModal') 
        .style('cursor', 'pointer')
        .append(() => this);
    });


  // add the x Axis
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x)
            // sets the tick values - tick value array is filtered for unique dates only
            .tickValues([dayjs(), ...data.map((item) => dayjs(item.due_date).format("YYYY/MM/DD")).filter((value, index, self) => self.indexOf(value)===index).map((item) => dayjs(item)) ])
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
    .attr("width", function (d) { return x(d.due_date); })
    .delay(function (d, i) { return (i * 150) });

}

$(window).resize(function () {
  $('#barGraph').empty();
  drawBarGraph(data)
});

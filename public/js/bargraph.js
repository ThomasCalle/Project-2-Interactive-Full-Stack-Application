import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

$(document).ready(async () => {
  // gets event data to display on the page
    
    // const articleData = await fetch(`/api/articles/${element.parentElement.dataset.id}`, {
    //   method: "GET",
    //   headers: { 'Content-Type': 'application/json' },
    // });
    // const article = await articleData.json();
    // $("#test").html(JSON.stringify(article));
    dohorizontalbarchartD3(data, "#scoutblock1", "topic", "due_date", $(window).width() - 100, data.length * 50, margin);
});

var data = [
  { topic: "disaster management", weight: 5.044282881692003, "id": 1, due_date: new Date("2023-04-15")} , 
  { topic: "analytics", weight: 5.111022997620935, "id": 2, due_date:  new Date("2023-04-15")}, 
  { topic: "systems management", weight: 5.255783212161269, "id": 3, due_date: new Date("2023-05-01")}, 
  { topic: "human resources", weight: 5.420123698898777, "id": 13, due_date: new Date("2023-06-01")}, 
  { topic: "machine learning", weight: 6.357388316151202, "id": 14, due_date:  new Date("2023-03-15")}, 
  { topic: "automation", weight: 6.579434311393074, "id": 15, due_date:  new Date("2023-04-01")}, 
  { topic: "health and safety", weight: 7.607482274852919, "id": 16, due_date: new Date("2023-04-01")}, 
  { topic: "cost control", weight: 7.876784769962982, "id": 17, due_date:  new Date("2023-04-01")} , 
  { topic: "climate change", weight: 8.24345757335448, "id": 18, due_date: new Date("2023-04-15")}, 
  { topic: "inventory management", weight: 8.511369645690111, "id": 19, due_date: new Date("2023-04-15")}, 
  { topic: "transformation", weight: 8.650363516192993, "id": 20, due_date: new Date("2023-05-01")}, 
  { topic: "supply chain", weight: 8.916204070843246, "id": 21, due_date: new Date("2023-06-01")}, 
  { topic: "water treatment", weight: 9.996866186148543, "id": 22, due_date: new Date("2023-07-01")} , 
  { topic: "water treatment test", weight: 9.996866186148543, "id": 23, due_date: new Date("2023-05-01")}, 
  { topic: "disaster management test", weight: 5.044282881692003, "id": 10, due_date: new Date("2023-06-01")}
];

var margin = { top: 10, right: 30, bottom: 30, left: 30 };


function dohorizontalbarchartD3(data, elementid, topic, topicscore, width, height, margin) {
  var y = d3.scaleBand().range([height, 0]).padding(0.1);
  var x = d3.scaleLinear().range([0, $(window).width() - 100]);
  var svg = d3.select(elementid).append("svg")
    .attr("width", $(window).width() - 100 + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

  // Scale the range of the data in the domains
  x.domain([new Date(), d3.max(data, function (d) { return new Date(d.due_date); })])
  y.domain(data.map(function (d) { return d[topic]; }));


  var bars = svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("fill", function (d) {
      if (d[topicscore] > 90) {
        return "red";
      } else if (d[topicscore] > 45) {
        return "orange";
      }
      return "yellow";
    })
    .attr("class", "bar")
    //.attr("width", function (d) { return x(d[topicscore]); })
    .attr("width", function (d) { return 0; })
    .attr("y", function (d) { return y(d[topic]); })
    .attr("height", y.bandwidth()).each(function (tick) {
      d3.select(this.parentNode)
        .insert("a")
        .attr('data-id', tick.id)
        .attr('data-bs-toggle', 'modal') // This makes the link open in a new window
        .attr('data-bs-target', '#exampleModal') // This makes the link open in a new window
        .append(() => this);
    });

  // add the x Axis
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x)
            .ticks(5)
            .tickValues([dayjs(), ...data.map(function(d) { return new dayjs(d.due_date)}) ])
            .tickFormat(d3.timeFormat("%Y-%m-%d")))

  // add the y Axis
  svg.append("g")
    .attr("class", "y axis")
    .call(d3.axisRight(y)).attr("class", "bg-dark");

  svg.selectAll("rect")
    .transition()
    .duration(800)
    .attr("width", function (d) { return x(d[topicscore]); })
    .delay(function (d, i) { return (i * 100) });



}

$(window).resize(function () {
  $('#scoutblock1').empty();
  dohorizontalbarchartD3(data, "#scoutblock1", "topic", "weight", $(window).width() - 100, data.length * 45, margin)
});

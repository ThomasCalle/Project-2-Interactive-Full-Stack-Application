import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";


$("#barGraph").click(async (event) => {
  const element = event.target;
  if (element.matches("rect")) {
    // const articleData = await fetch(`/api/articles/${element.parentElement.dataset.id}`, {
    //   method: "GET",
    //   headers: { 'Content-Type': 'application/json' },
    // });
    // const article = await articleData.json();
    // $("#test").html(JSON.stringify(article));
    renderPie(data);
  }
});
// deadline must subtract progress from it
let data = { progress: 15, deadline: 30 };

const renderPie = (data) => {


  // colours depend on the treshhold stage;
  const colors = ['#43ff64d9', '#43ff6426'];

  let sizes = {
    innerRadius: 50,
    outerRadius: 75
  };

  let durations = {
    entryAnimation: 2000
  };


  d3.select("#chart").html("");

  let generator = d3.pie()
    .sort(null).value(d => d[1]);

  let chart = generator(Object.entries(data));

  let arcs = d3.select("#chart")
    .append("g")
    .attr("transform", "translate(100, 100)")
    .selectAll("path")
    .data(chart)
    .enter()
    .append("path")
    .style("fill", (d, i) => colors[i]);

  let angleInterpolation = d3.interpolate(generator.startAngle()(), generator.endAngle()());

  let innerRadiusInterpolation = d3.interpolate(0, sizes.innerRadius);
  let outerRadiusInterpolation = d3.interpolate(0, sizes.outerRadius);

  let arc = d3.arc();

  arcs.transition()
    .duration(durations.entryAnimation)
    .attrTween("d", d => {
      let originalEnd = d.endAngle;
      return t => {
        let currentAngle = angleInterpolation(t);
        if (currentAngle < d.startAngle) {
          return "";
        }

        d.endAngle = Math.min(currentAngle, originalEnd);

        return arc(d);
      };
    });

  d3.select("#chart")
    .transition()
    .duration(durations.entryAnimation)
    .tween("arcRadii", () => {
      return t => arc
        .innerRadius(innerRadiusInterpolation(t))
        .outerRadius(outerRadiusInterpolation(t));
    });


  var keys = Object.entries(data).map((d) => d[0])


  // Add one dot in the legend for each name.
  d3.select("#chart")
    .append('g')
    .selectAll("mydots")
    .data(keys)
    .enter()
    .append("circle")
    .attr("cx", function (d, i) { return 10 + i * 100 })
    .attr("cy", function (d, i) { return 225 }) // 100 is where the first dot appears. 25 is the distance between dots
    .attr("r", 7)
    .style("fill", function (d, i) { return colors[i] })

  // Add one dot in the legend for each name.
  d3.select("#chart")
    .append('g')
    .selectAll("mylabels")
    .data(keys)
    .enter()
    .append("text")
    .attr("x", function (d, i) { return 30 + i * 100 })
    .attr("y", function (d, i) { return 225 })
    .style("fill", "black")
    .text(function (d) { return d })
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")

}

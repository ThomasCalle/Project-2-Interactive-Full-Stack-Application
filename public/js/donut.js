import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";


$("#barGraph").click(async (event) => {
  const element = event.target;
  if (element.matches("rect")) {
    const eventData = await fetch(`/event/${element.parentElement.dataset.id}`, {
      method: "GET",
      headers: { 'Content-Type': 'application/json' },
    });
    const event = await eventData.json();

    await renderEvent(event);

    renderPie(event);
  }
});
// deadline must subtract progress from it
let data = {};

const renderPie = (event) => {
  data = {
    timeline: dayjs(event.due_date).unix() - dayjs().unix(),
    progress: dayjs().unix() - dayjs(event.created_at).unix(),
  }
  // colours depend on the treshhold stage;
  let colours = [];
  if (dayjs().isBefore(dayjs(event.t3))) {
    colours = ['#33a532d9', '#33a53226'];
  } else if (dayjs().isBefore(dayjs(event.t2))) {
    colours = ['#33a532d9', '#33a53226'];
  } else if (dayjs().isBefore(dayjs(event.t1))) {
    colours = ['#F7B500d9', '#F7B50026'];
  } else {
    colours = ['#BB1E10d9', '#BB1E1026'];
  }


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
    .style("fill", (d, i) => colours[i]);

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
    .style("fill", function (d, i) { return colours[i] })

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

const renderEvent = async (event) => {
  $("#exampleModalLabel").html(event.name);
  $('#eventDescription').val(event.description);
  $('#eventDueDate').val(event.due_date);
  $('#eventCategory').val(event.category.name)

  document.getElementById("buttons").innerHTML =
  `<button id="editEvent" type="button" class="btn btn-primary" aria-label="Close" data-bs-toggle="modal" data-bs-target="#entryModal" data-id=${event.category.id} data-select="update-event">Edit Event</button>
  <button id="deleteEvent" type="button" class="btn btn-danger" data-id=${event.category.id}>Delete Event</button>`;


  let phase = "";
  let nextPhase = "";
  if (dayjs().isBefore(dayjs(event.t3))) {
    phase = "Normal";
    nextPhase = event.t3;
  } else if (dayjs().isBefore(dayjs(event.t2))) {
    phase = "Normal, and approaching Alert phase";
    nextPhase = event.t2;
  } else if (dayjs().isBefore(dayjs(event.t1))) {
    phase = "Alert, and approaching Critical phase";
    nextPhase = event.t1;
  } else {
    phase = "Critical phase and approaching the deadline";
    nextPhase = event.due_date;
  }
  $('#eventPhase').val(phase);
  $('#eventNextPhase').val(nextPhase);
}
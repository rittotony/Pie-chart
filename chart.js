var div = d3.select("body").append("div").attr("class", "toolTip");

// Define SVG attributes
var width = 400,
  height = 400,
  radius = 200;

// Use predefined D3 palette
var colors = d3.scale.category20c();

// Create test data
var pie = [
  {
    label: "Buster",
    value: 50,
  },
  {
    label: "Moe",
    value: 40,
  },
  {
    label: "Bubba",
    value: 60,
  },
  {
    label: "Windy",
    value: 35,
  },
  {
    label: "Wilfred",
    value: 10,
  },
];

// Create a D3 layout that creates SVG arcs from the supplied data
var pieLayout = d3.layout.pie().value(function (d) {
  return d.value;
});

// Create a D3 arc of the specified radius
var arc = d3.svg.arc().outerRadius(radius);

// Create the SVG graphic
var chart = d3
  .select("#graphic")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  // Create a group to hold the chart
  .append("g")
  // Move the center of the chart to the center of the SVG
  .attr(
    "transform",
    "translate(" + (width - radius) + ", " + (height - radius) + ")"
  )
  // Select the complement of paths relative to the data
  .selectAll("path")
  .data(pieLayout(pie))
  .enter()
  // Add a group for each pie slice
  .append("g")
  .attr("class", "slice");

// Add the pie slices
var slices = d3
  .selectAll("g.slice")
  .append("path")
  .attr("fill", function (d, i) {
    return colors(i);
  })
  .attr("d", arc)
  .on("mousemove", function (d) {
    div.style("left", d3.event.pageX + 10 + "px");
    div.style("top", d3.event.pageY - 25 + "px");
    div.style("display", "inline-block");
    div.html(d.data.label + "<br>" + d.data.value);
  })
  .on("mouseout", function (d) {
    div.style("display", "none");
  });

// Add the slice labels
var text = d3
  .selectAll("g.slice")
  .append("text")
  .text(function (d) {
    return d.data.label + " (" + d.data.value + ")";
  })
  .attr("font-size", "12")
  .attr("text-anchor", "middle")
  .attr("fill", "black")
  .attr("transform", function (d) {
    // Move the label to the center of its slice
    d.innerRadius = 0;
    d.outerRadius = radius;
    return "translate(" + arc.centroid(d) + ")";
  });

var legend = d3
  .select("#legend")
  .selectAll("div")
  .data(pie)
  .enter()
  .append("div")
  .style("margin-bottom", "5px");

legend
  .append("span")
  .style("display", "inline-block")
  .style("width", "20px")
  .style("height", "20px")
  .style("margin-right", "5px")
  .style("background-color", function (d, i) {
    return colors(i);
  });

legend.append("span").text(function (d) {
  return d.label + " (" + d.value + ")";
});

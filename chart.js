// Define SVG attributes
var width = 400,
  height = 400,
  radius = 200;

// Use predefined D3 palette
var colors = d3.scale.category20c();

// Create tooltip
var tooltip = d3.select("#graphic")
  .append("div")
  .attr("class", "tooltip")
  .style("position", "absolute")
  .style("z-index", "999") // Updated z-index value
  .style("visibility", "hidden");

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
  .on("mouseover", function (d) {
    // Show tooltip on mouseover
    tooltip
      .style("visibility", "visible")
      .text(d.data.label + " (" + d.data.value + ")");
  })
  .on("mousemove", function () {
    // Position tooltip relative to mouse cursor
    tooltip
      .style("top", d3.event.pageY - 10 + "px")
      .style("left", d3.event.pageX + 10 + "px");
  })
  .on("mouseout", function () {
    // Hide tooltip on mouseout
    tooltip.style("visibility", "hidden");
  });

// Add the slice labels
var text = d3
  .selectAll("g.slice")
  .append("text")
  .text(function (d, i) {
    return d.data.label + " (" + d.data.value + ")";
  })
  .attr("font-size", "12")
  .attr("text-anchor", "middle")
  .attr("fill", "black")
  .attr("transform", function (d) {
    // Move the lable to the center of its slice
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

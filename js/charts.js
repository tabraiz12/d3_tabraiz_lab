var width = 500,
    height = 500;

var color = d3.scale.category20();

var forceOne = d3.layout.force()
    .charge(-200)
    .linkDistance(100)
    .size([width, height]);

var forceTwo = d3.layout.force()
    .charge(-200)
    .linkDistance(100)
    .size([width, height]);

var svgOne = d3.select("#chartOne").append("svg")
    .attr("width", width)
    .attr("height", height);

var svgTwo = d3.select("#chartTwo").append("svg")
    .attr("width", width)
    .attr("height", height);

graphOne = {
   "nodes": [
       {"name":"A",  "group": 1}, 
       {"name":"B",  "group": 1}, 
       {"name":"C",  "group": 2}, 
       {"name":"D",  "group": 3}, 
       {"name":"E",  "group": 3}
   ], 
   "links": [
       {"source":0, "target":1, "value":1}, 
       {"source":0, "target":2, "value":5}, 
       {"source":1, "target":2, "value":5}, 
       {"source":3, "target":4, "value":1}, 
       {"source":3, "target":2, "value":5}, 
       {"source":4, "target":2, "value":5}, 
   ]
   
};

graphTwo = {
    "nodes": [
       {"name":"A",  "group": 1}, 
       {"name":"B",  "group": 2}, 
       {"name":"C",  "group": 3}, 
   ], 
   "links": [
       {"source":0, "target":0, "value":1}, 
       {"source":0, "target":1, "value":2}, 
       {"source":1, "target":2, "value":2}, 
       {"source":2, "target":0, "value":2}, 
   ]
};



forceOne
    .nodes(graphOne.nodes)
    .links(graphOne.links)
    .start();

forceTwo
    .nodes(graphTwo.nodes)
    .links(graphTwo.links)
    .start();

var linkOne = svgOne.selectAll(".link")
    .data(graphOne.links)
  .enter().append("line")
    .attr("class", "link")
    .style("stroke-width", function(d) { return Math.sqrt(d.value); });

var linkTwo = svgTwo.selectAll(".link")
    .data(graphTwo.links)
  .enter().append("line")
    .attr("class", "link")
    .style("stroke-width", function(d) { return Math.sqrt(d.value); });


var nodeOne = svgOne.selectAll(".node")
    .data(graphOne.nodes)
  .enter().append("circle")
    .attr("class", "node")
    .attr("r", 5)
    .style("fill", function(d) { return color(d.group); })
    .call(forceOne.drag);

var nodeTwo = svgTwo.selectAll(".node")
    .data(graphTwo.nodes)
  .enter().append("circle")
    .attr("class", "node")
    .attr("r", 5)
    .style("fill", function(d) { return color(d.group); })
    .call(forceTwo.drag);


nodeOne.append("title")
    .text(function(d) { return d.name; });

nodeTwo.append("title")
    .text(function(d) { return d.name; });

forceOne.on("tick", function() {
  linkOne.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  nodeOne.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
});

forceTwo.on("tick", function() {
  linkTwo.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  nodeTwo.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
});

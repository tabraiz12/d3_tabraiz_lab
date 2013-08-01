var height = 500;
var width = 500;

var svg = d3.select("#bar").append("svg")
            .attr("width", width)
            .attr("height", height);

var overallBar = svg.append("rect")
                    .attr("x", 50)
                    .attr("y", 100)
                    .attr("width", 400)
                    .attr("height", 100)
                    .attr("class", "overallBar");
                    

var numSlides = 20;
var fillWidth = Math.floor(overallBar.attr("width") / numSlides);

for (var i = 0; i < numSlides; i++){
    var fillBar = svg.append("rect")
                    .attr("x", 50 + (i * fillWidth + 1) )
                    .attr("y", 101)
                    .attr("width", fillWidth)
                    .attr("height", 98) 
                    .attr("class", "emptyBar");

}


//chained transition based on recalculating the delay
svg.selectAll(".emptyBar").transition()
    .delay(function(d, i) { return i * 900; })
    .attr("class", "filledBar")
    .duration(100);

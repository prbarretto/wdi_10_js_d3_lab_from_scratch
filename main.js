window.onload = (function() {
  d3.csv("cleaner-data.csv",
    function(error, rows){
      var color = d3.scale.category10();
      var bar_width = 10;
      var current_offset = 0;
      var nested_data = d3.nest()
        .key(function(d) { return d.category } )
        .entries(rows);

    d3.select("#employment")
      .selectAll('g')
      .data(nested_data)
      .enter() // any function within the enter gets iterated.
        .append('g')
        .attr('transform', function(d, i) {
            if (i > 0) {
            current_offset += bar_width * nested_data[i - 1].values.length;
          }
            return "translate(" + current_offset + ", 0)" }
          )
        .selectAll('rect') // These 3 go together
        .data(function(group) { return group.values; })
        .enter()
          .append('rect')
            .attr('width', bar_width - 4 )
            .attr('x', function(d, i) { return i * (bar_width) })
            .attr('height', function(d) { return +d.percent_employed })
            .attr('y', function(d) { return (100 - +d.percent_employed) })
            .style('fill', function(d) { return color(d.category) });
  });
});

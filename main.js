window.onload = (function() {
  d3.csv("cleaner-data.csv",
    function(error, rows){
      var nested_data = d3.nest()
        .key(function(d) { return d.category } )
        .entries(rows);

    d3.select("#employment")
      .selectAll('g')
      .data(nested_data)
      .enter()
        .append('g')
  });
});

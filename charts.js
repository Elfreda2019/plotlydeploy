// function init() {
//   // Grab a reference to the dropdown select element
//   var selector = d3.select("#selDataset");

//   // Use the list of sample names to populate the select options
//   d3.json("samples.json").then((data) => {
//     var sampleNames = data.names;

//     sampleNames.forEach((sample) => {
//       selector
//         .append("option")
//         .text(sample)
//         .property("value", sample);
//     });

//     // Use the first sample from the list to build the initial plots
//     var firstSample = sampleNames[0];
//     buildCharts(firstSample);
//     buildMetadata(firstSample);
//   });
// }

// // Initialize the dashboard
// init();

// function optionChanged(newSample) {
//   // Fetch new data each time a new sample is selected
//   buildMetadata(newSample);
//   buildCharts(newSample);
  
// }

// // Demographics Panel 
// function buildMetadata(sample) {
//   d3.json("samples.json").then((data) => {
//     var metadata = data.metadata;
//     // Filter the data for the object with the desired sample number
//     var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
//     var result = resultArray[0];
//     // Use d3 to select the panel with id of `#sample-metadata`
//     var PANEL = d3.select("#sample-metadata");

//     // Use `.html("") to clear any existing metadata
//     PANEL.html("");

//     // Use `Object.entries` to add each key and value pair to the panel
//     // Hint: Inside the loop, you will need to use d3 to append new
//     // tags for each key-value in the metadata.
//     Object.entries(result).forEach(([key, value]) => {
//       PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
//     });

//   });
// }

// // 1. Create the buildCharts function.
// function buildCharts(sample) {
//   // 2. Use d3.json to load and retrieve the samples.json file 
//   d3.json("samples.json").then((data) => {
//     // 3. Create a variable that holds the samples array. 
//     var samples = data.samples;

//     // 4. Create a variable that filters the samples for the object with the desired sample number.
//     var resultArray = samples.filter(sampleObj => sampleObj.id == sample);

//     //  5. Create a variable that holds the first sample in the array.
//     var result = resultArray[0];
//     var metadataArray = data.metadata.filter(sampleObj => sampleObj.id == sample);
//     var metadata = metadataArray[0];

//     // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
//     var otu_ids = result.otu_ids;
//     var otu_labels = result.otu_labels;
//     var sample_values = result.sample_values;

//     // 7. Create the yticks for the bar chart.
//     // Hint: Get the the top 10 otu_ids and map them in descending order  
//     //  so the otu_ids with the most bacteria are last. 

//     var yticks = otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();

//     // 8. Create the trace for the bar chart. 
//     var barData = [{
//         x: sample_values.slice(0,10).reverse(),
//       text: otu_labels.slice(0,10).reverse(),
//       y: y_ticks,
//       type: "bar",
//       orientation: "h",
//     }
//     ];

//     // 9. Create the layout for the bar chart. 
//     var barLayout = {
//      title: "Top 10 Bacteria Cultures Found",
//         margin: { t: 100, l: 100 },
//         height: 400,
//         width: 500,
//     };
//     // 10. Use Plotly to plot the data with the layout. 
//     Plotly.newPlot("bar", barData, barLayout);
    
//         var bubbleData = [{
//       x: otu_ids,
//       y: sample_values,
//       hoverinfo: 'text' ,
//       text: otu_labels,
//       mode: 'markers',
//       marker: {
//         size: sample_values,
//         color: otu_ids
//       }
//     }];
//      // 2. Create the layout for the bubble chart.
//      var bubbleLayout = {
//         title: 'Bacteria Culture Per Sample',
//         showlegend: false,
//         height: 400,
//         width: 1100,
//         xaxis: {title: 'OTU ID'}
//         }

//     // 3. Use Plotly to plot the data with the layout.
//     Plotly.newPlot('bubble', bubbleData, bubbleLayout); 
//   });



// var wfreq = metadata.wfreq;
//     // 4. Create the trace for the gauge chart.
//     var gaugeData = [
//         {
//             type: "indicator",
//             mode: "gauge+number+delta",
//             value: wfreq,
//             title: { text: "Belly Button Wash Frequency, Scrubs Per Week", font: { size: 21 } },
//             gauge: {
//               axis: { range: [null, 10], tickwidth: 1, tickcolor: "darkblue" },
//               bar: { color: "darkblue" },
//               bgcolor: "white",
//               borderwidth: 2,
//               bordercolor: "gray",
//               steps: [
//                 { range: [0, 2.5], color: "red" },
//                 { range: [2.5, 5], color: "yellow" },
//                 { range: [5, 7.5], color: "orange" },
//                 { range: [7.5, 10], color: "green"}
//               ],
//               threshold: {
//                 line: { color: "red", width: 4 },
//                 thickness: 0.75,
//                 value: 490
//               }
//             }
//         }
//     ];
    
//     // 5. Create the layout for the gauge chart.
//     var gaugeLayout = { 
//         width: 500,
//         height: 400,
//         margin: { t: 25, r: 25, l: 25, b: 25 },
//         paper_bgcolor: "lavender",
//         font: { color: "darkblue", family: "Arial" }     
//     };

//     // 6. Use Plotly to plot the gauge data and layout.
//     Plotly.newPlot('gauge', gdata, layout);
  
// };


// Create the buildChart function.
function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}

function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samples = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    //  5. Create a variable that holds the first sample in the array.
    var result = resultArray[0];
    var metadataArray = data.metadata.filter(sampleObj => sampleObj.id == sample);
    var metadata = metadataArray[0];
    
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    var y_ticks = otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();

  
    var barData = [{
      x: sample_values.slice(0,10).reverse(),
      text: otu_labels.slice(0,10).reverse(),
      y: y_ticks,
      type: "bar",
      orientation: "h",
    }];
    // var barData = [trace1];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
        title: "Top 10 Bacteria Cultures Found",
        margin: { t: 100, l: 100 },
        height: 400,
        width: 500,
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);
    
    var bubbleData = [{
      x: otu_ids,
      y: sample_values,
      hoverinfo: 'text' ,
      text: otu_labels,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids
      }
    }]
    
    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
    title: 'Bacteria Culture Per Sample',
    showlegend: false,
    height: 400,
    width: 1100,
    xaxis: {title: 'OTU ID'}
      
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);
   
    
    var wfreq = metadata.wfreq;

    // 1. Create the trace for the gauge chart.
    var gdata = [
      {
        type: "indicator",
        mode: "gauge+number+delta",
        value: wfreq,
        title: { text: "Belly Button Wash Frequency, Scrubs Per Week", font: { size: 21 } },
        gauge: {
          axis: { range: [null, 10], tickwidth: 1, tickcolor: "darkblue" },
          bar: { color: "darkblue" },
          bgcolor: "white",
          borderwidth: 2,
          bordercolor: "gray",
          steps: [
            { range: [0, 2.5], color: "red" },
            { range: [2.5, 5], color: "yellow" },
            { range: [5, 7.5], color: "orange" },
            { range: [7.5, 10], color: "green"}
          ],
          threshold: {
            line: { color: "red", width: 4 },
            thickness: 0.75,
            value: 490
          }
        }
      }
    ];
    
    var layout = {
      width: 500,
      height: 400,
      margin: { t: 25, r: 25, l: 25, b: 25 },
      paper_bgcolor: "lavender",
      font: { color: "darkblue", family: "Arial" }
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot('gauge', gdata, layout);
  });
}
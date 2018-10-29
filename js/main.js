const width = 1000;
const height = 800;
const margin = {left: 100, right: 50, top: 50, bottom: 100};
const svgWidth = width + margin.left + margin.right;
const svgHeight = height + margin.top + margin.bottom;

const svg = d3.select('body')
  .append('svg')
  .attr('width', svgWidth)
  .attr('height', svgHeight)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

const xScale = d3.scaleBand()
  .range([0, width])
  .padding(0.3);

const xAxis = d3.axisBottom(xScale);

const xGroup = svg.append('g')
  .attr('transform', `translate(0, ${height})`);

const yScale = d3.scaleLinear()
  .range([height, 0]);


d3.csv('data/rainfall-by-state.csv').then(data => {
  data.forEach(stateData => {
    stateData.rainfall = +stateData.rainfall;
    const checkChar = /^[A-Z]/;
    for (let i = 0; i < 5; i++) {
      if (checkChar.test(stateData.state)) {
        break;
      } else {
        stateData.state = stateData.state.substring(1);
      }
    }
  });

  const rainfallMinMax = d3.extent(data, d => d.rainfall);
  yScale.domain(rainfallMinMax);
  const yAxis = d3.axisLeft(yScale);
  svg.append('g')
    .call(yAxis);

  let dataset1 = [];
  let dataset2 = [];
  let dataset3 = [];
  let dataset4 = [];
  let dataset5 = [];

  data.forEach((element, index) => {
    if (index < 10) {
      dataset1.push(element);
    } else if (index < 20) {
      dataset2.push(element);
    } else if (index < 30) {
      dataset3.push(element);
    } else if (index < 40) {
      dataset4.push(element);
    } else {
      dataset5.push(element);
    }
  });

  const datasets = 
    [ dataset1,
      dataset2,
      dataset3,
      dataset4,
      dataset5
    ];

  const buttons = d3.selectAll('input');
  buttons.on('change', function(d) {
    const selection = this.value;
    drawRain(selection, datasets);
  });
});

function drawRain(selection, datasets) {
  let dataset;
  if (selection == 'set1') {
    dataset = datasets[0];
  } else if (selection == 'set2') {
    dataset = datasets[1];
  } else if (selection == 'set3') {
    dataset = datasets[2];
  } else if (selection == 'set4') {
    dataset = datasets[3];
  } else if (selection == 'set5') {
    dataset = datasets[4];
  }
  
  console.log(dataset);

  let states = [];
  dataset.forEach(element => {
    states.push(element.state);
  });
  

  xScale
  .domain(states);

  xGroup
    .call(xAxis);
  


  /**
 * 1. select
 * 2. data
 * 3. exit
 * 4. update
 * 5. enter
 * 6. append
 */

  const circles = svg.selectAll('circle')
    .data(dataset);
  circles.exit().remove();

  circles
  .attr('cy', d => yScale(d.rainfall));

  circles.enter()
    .append('circle')
    .attr('cy', d => yScale(d.rainfall))
    .attr('cx', d => xScale(d.state) + xScale.bandwidth()/2)
    .attr('r', xScale.bandwidth()/2);
}
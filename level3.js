function Matrix(options) {
  const margin = {
    top: 50,
    right: 50,
    bottom: 100,
    left: 100,
  };
  const width = 350;
  const height = 350;
  const { data } = options;
  const { container } = options;
  const labelsData = options.labels;
  const startColor = options.start_color;
  const endColor = options.end_color;

  const widthLegend = 100;

  if (!data) {
    throw new Error('Please pass data');
  }

  if (!Array.isArray(data) || !data.length || !Array.isArray(data[0])) {
    throw new Error('It should be a 2-D array');
  }

  const maxValue = d3.max(data, (layer) => d3.max(layer, (d) => d));
  const minValue = d3.min(data, (layer) => d3.min(layer, (d) => d));

  const numrows = data.length;
  const numcols = data[0].length;

  const svg = d3
    .select(container)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const background = svg
    .append('rect')
    .style('stroke', 'black')
    .style('stroke-width', '2px')
    .attr('width', width)
    .attr('height', height);

  const x = d3.scaleBand().domain(d3.range(numcols)).range([0, width]);

  const y = d3.scaleBand().domain(d3.range(numrows)).range([0, height]);

  const colorMap = d3
    .scaleLinear()
    .domain([minValue, maxValue])
    .range([startColor, endColor]);

  const row = svg
    .selectAll('.row')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'row')
    .attr('transform', (d, i) => `translate(0,${y(i)})`);

  const cell = row
    .selectAll('.cell')
    .data((d) => d)
    .enter()
    .append('g')
    .attr('class', 'cell')
    .attr('transform', (d, i) => `translate(${x(i)}, 0)`);

  cell
    .append('rect')
    // .attr('width', x.range())
    .attr('width', 35)
    // .attr('height', y.range())
    .attr('height', 35)
    .style('stroke-width', 0);

  cell
    .append('text')
    .attr('dy', '.32em')
    .attr('x', 35 / 2)
    .attr('y', 35 / 2)
    .attr('text-anchor', 'middle')
    .style('fill', (d, i) => (d >= maxValue / 2 ? 'white' : 'black'))
    .text((d, i) => d);

  row
    .selectAll('.cell')
    .data((d, i) => data[i])
    .style('fill', colorMap);

  const labels = svg.append('g').attr('class', 'labels');

  const columnLabels = labels
    .selectAll('.column-label')
    .data(labelsData)
    .enter()
    .append('g')
    .attr('class', 'column-label')
    .attr('transform', (d, i) => `translate(${x(i)},${height})`);

  columnLabels
    .append('line')
    .style('stroke', 'black')
    .style('stroke-width', '1px')
    // .attr('x1', x.range() / 2)
    // .attr('x2', x.range() / 2)
    .attr('x1', 35 / 2)
    .attr('x2', 35 / 2)
    .attr('y1', 0)
    .attr('y2', 5);

  columnLabels
    .append('text')
    .attr('x', 0)
    // .attr('y', y.range() / 2)
    .attr('y', 35 / 2)
    .attr('dy', '.82em')
    .attr('text-anchor', 'end')
    .attr('transform', 'rotate(-60)')
    .text((d, i) => d);

  const rowLabels = labels
    .selectAll('.row-label')
    .data(labelsData)
    .enter()
    .append('g')
    .attr('class', 'row-label')
    .attr('transform', (d, i) => `translate(${0},${y(i)})`);

  rowLabels
    .append('line')
    .style('stroke', 'black')
    .style('stroke-width', '1px')
    .attr('x1', 0)
    .attr('x2', -5)
    // .attr('y1', y.range() / 2)
    // .attr('y2', y.range() / 2);
    .attr('y1', 35 / 2)
    .attr('y2', 35 / 2);

  rowLabels
    .append('text')
    .attr('x', -8)
    .attr('y', y.range() / 2)
    .attr('dy', '.32em')
    .attr('text-anchor', 'end')
    .text((d, i) => d);

  const key = d3
    .select('#legend')
    .append('svg')
    .attr('width', widthLegend)
    .attr('height', height + margin.top + margin.bottom);

  const legend = key
    .append('defs')
    .append('svg:linearGradient')
    .attr('id', 'gradient')
    .attr('x1', '100%')
    .attr('y1', '0%')
    .attr('x2', '100%')
    .attr('y2', '100%')
    .attr('spreadMethod', 'pad');

  legend
    .append('stop')
    .attr('offset', '0%')
    .attr('stop-color', endColor)
    .attr('stop-opacity', 1);

  legend
    .append('stop')
    .attr('offset', '100%')
    .attr('stop-color', startColor)
    .attr('stop-opacity', 1);

  key
    .append('rect')
    .attr('width', widthLegend / 2 - 10)
    .attr('height', height)
    .style('fill', 'url(#gradient)')
    .attr('transform', `translate(0,${margin.top})`);

  const y2 = d3.scaleLinear().range([height, 0]).domain([minValue, maxValue]);

  // const yAxis = d3.svg.axis().scale(y).orient('right');
  // const yAxis = d3.axisLeft(y2).orient('right');

  // key
  //   .append('g')
  //   .attr('class', 'y axis')
  //   .attr('transform', `translate(41,${margin.top})`)
  //   .call(yAxis);
}

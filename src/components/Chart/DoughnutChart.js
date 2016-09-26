import React, { Component } from 'react';
import { PieChart, Pie, Cell } from 'Recharts';

export default class DoughnutChart extends Component {
  render() {
    const data = [{name: 'Group A', value: 500}, {name: 'Group b', value: 200}];
    const COLORS = ['#00C49F', 'gray'];

    return (
      <PieChart width={308} height={150} onMouseEnter={this.onPieEnter}>
        <Pie
          data={data}
          cx={258}
          cy={75}
          innerRadius={25}
          outerRadius={50}
          fill="#8884d8"
          paddingAngle={5}
        >
          {
            data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
      </PieChart>
    );
  }
}

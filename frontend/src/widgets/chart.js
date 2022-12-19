import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default class Chart extends PureComponent {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <ResponsiveContainer width="100%" height="35%" className="card pb-3">
        <LineChart
          width={500}
          height={300}
          data={this.props.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="heure" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="client"
            stroke="#8884d8"
            activeDot={{ r: 4 }}
          />
          <Line type="monotone" dataKey="ventes" stroke="#82ca9d" />
          <Line type="monotone" dataKey="revenus" stroke="#282c34" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

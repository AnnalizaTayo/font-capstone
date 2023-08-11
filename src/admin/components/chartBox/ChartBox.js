import React from "react";
import "./chartBox.scss";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

const ChartBox = (props) => {
  return (
    <div className="chartBox">
      <div className="boxInfo">
        <div className="title">
          {props.icon}
          <span>{props.title}</span>
        </div>
        <h1>{props.number}</h1>
        <div style={{ color: "white" }}>
          <span className="duration">This week</span>
        </div>
      </div>
      <div className="chartInfo">
        <div className="chart">
          <ResponsiveContainer width="99%" height="100%">
            <LineChart data={props.chartData}>
              <Tooltip
                contentStyle={{ background: "transparent", border: "none" }}
                labelStyle={{ display: "none" }}
                position={{ x: 10, y: 70 }}
              />
              <Line
                type="monotone"
                dataKey={props.dataKey}
                stroke={props.color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="texts">
          <span
            className="percentage"
            style={{ color: props.percentage < 0 ? "tomato" : "limegreen" }}
          >
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChartBox;

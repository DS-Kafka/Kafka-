import { useEffect, useRef } from "react";
import * as echarts from "echarts";

export default function Linechart() {
  const chartRef = useRef<echarts.ECharts | null>(null);
  const ws = useRef<WebSocket | null>(null);
  const data = useRef<Array<[string, number]>>([]);

  useEffect(() => {
    const chartDom = document.getElementById("main");
    const myChart = echarts.init(chartDom);
    chartRef.current = myChart;

    const option = {
      title: {
        left: "center",
        text: "Tooltip and dataZoom on Mobile Device",
      },
      legend: {
        top: "bottom",
        data: ["Count"],
      },
      tooltip: {
        trigger: "axis",
        formatter: function (params: any) {
          const { seriesName, value } = params[0];
          return `${seriesName}: ${value[1]}`;
        },
      },
      xAxis: {
        type: "time",
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: "value",
        axisLabel: {
          inside: true,
          formatter: "{value}\n",
        },
        z: 10,
      },
      grid: {
        top: 110,
        left: 15,
        right: 15,
        height: 160,
      },
      dataZoom: [
        {
          type: "inside",
          throttle: 50,
        },
      ],
      series: [
        {
          name: "Count",
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 5,
          sampling: "average",
          itemStyle: {
            color: "#0770FF",
          },
          data: data.current,
        },
      ],
    };

    myChart.setOption(option);

    ws.current = new WebSocket("ws://localhost:8081");

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const newDate = new Date();
      data.current.push([newDate.toISOString(), message.count]);
      if (data.current.length > 50) {
        data.current.shift();
      }
      myChart.setOption({
        series: [
          {
            data: data.current,
          },
        ],
      });
    };

    return () => {
      myChart.dispose();
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  return <div id="main" style={{ width: "95%", height: "400px" }}></div>;
}

import { useEffect } from "react";
import * as echarts from "echarts";

const Linechart: React.FC = () => {
  useEffect(() => {
    const chartDom = document.getElementById("main");
    if (!chartDom) return; // 确保 DOM 元素存在

    const myChart = echarts.init(chartDom);

    const data: Array<[string, number]> = [];

    const option = {
      title: {
        left: "center",
        text: "WebSocket Data Visualization",
      },
      tooltip: {
        trigger: "axis",
        formatter: (params: any) => {
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
      },
      legend: {
        top: "bottom", // 图例在底部显示
        data: ["consumer"], // 图例的文本内容，与 series 中的 name 对应
      },
      series: [
        {
          name: "consumer",
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 5,
          sampling: "average",
          itemStyle: {
            color: "#0770FF",
          },
          data: data,
        },
      ],
    };

    myChart.setOption(option);

    const ws = new WebSocket("ws://localhost:8083"); //producer
    const ws2 = new WebSocket("ws://localhost:8085"); //consumer

    ws.onopen = () => {
      console.log("WebSocket connection opened.");
    };

    ws.onmessage = (event) => {
      try {
        console.log("WebSocket message received:", event);
        const message = JSON.parse(event.data);

        const newDate = new Date(message.timestamp);
        const count = parseInt(message.count);
        data.push([newDate.toISOString(), count]);
        if (data.length > 50) {
          data.shift();
        }
        myChart.setOption({
          series: [
            {
              data: data,
            },
          ],
        });
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    ws2.onopen = () => {
      console.log("WebSocket connection opened.");
    };

    ws2.onmessage = (event) => {
      try {
        console.log("WebSocket message received:", event);
        const message = JSON.parse(event.data);
        

        const newDate = new Date(message.timestamp);
        const count = parseInt(message.count);
        data.push([newDate.toISOString(), count]);
        if (data.length > 50) {
          data.shift();
        }
        myChart.setOption({
          series: [
            {
              data: data,
            },
          ],
        });
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws2.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    return () => {
      myChart.dispose(); // 释放 ECharts 资源
      ws.close(); // 关闭 WebSocket 连接
      ws2.close();
    };
  }, []);

  return <div id="main" style={{ width: "95%", height: "400px" }}></div>;
};

export default Linechart;

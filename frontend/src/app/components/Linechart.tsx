import { useEffect } from "react";
import * as echarts from "echarts";

const Linechart: React.FC = () => {
  useEffect(() => {
    const chartDom = document.getElementById("main");
    if (!chartDom) return; // 确保 DOM 元素存在

    const myChart = echarts.init(chartDom);

    const producerData: Array<[string, number]> = [];
    const consumerData: Array<[string, number]> = [];

    const option = {
      title: {
        left: "center",
        text: "WebSocket Data Visualization",
      },
      tooltip: {
        trigger: "axis",
        formatter: (params: any) => {
          return params
            .map((param: any) => `${param.seriesName}: ${param.value[1]}`)
            .join("<br/>");
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
        data: ["producer", "consumer"], // 图例的文本内容，与 series 中的 name 对应
      },
      series: [
        {
          name: "producer",
          type: "line",
          smooth: true,
          symbol: "none",
          symbolSize: 5,
          sampling: "average",
          itemStyle: {
            color: "#0770FF",
          },
          data: producerData,
        },
        {
          name: "consumer",
          type: "line",
          smooth: true,
          symbol: "none",
          symbolSize: 5,
          sampling: "average",
          itemStyle: {
            color: "#FF7700",
          },
          data: consumerData,
        },
      ],
    };

    myChart.setOption(option);

    const ws = new WebSocket("ws://localhost:8083"); // producer
    const ws2 = new WebSocket("ws://localhost:8085"); // consumer

    ws.onopen = () => {
      console.log("WebSocket connection opened for producer.");
    };

    ws.onmessage = (event) => {
      try {
        console.log("WebSocket message received from producer:", event);
        const message = event.data;
        console.log("message", message);
        const newDate = new Date(event.timeStamp);
        const count = parseInt(message);
        producerData.push([newDate.toISOString(), count]);
        if (producerData.length > 50) {
          producerData.shift();
        }
        myChart.setOption({
          series: [
            {
              name: "producer",
              data: producerData,
            },
          ],
        });
      } catch (error) {
        console.error("Error parsing WebSocket message from producer:", error);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed for producer.");
    };

    ws2.onopen = () => {
      console.log("WebSocket connection opened for consumer.");
    };

    ws2.onmessage = (event) => {
      try {
        console.log("WebSocket message received from consumer:", event);
        const message = event.data;
        console.log("message2", message);

        const newDate = new Date(event.timeStamp);
        const count = parseInt(message);
        consumerData.push([newDate.toISOString(), count]);
        if (consumerData.length > 50) {
          consumerData.shift();
        }
        myChart.setOption({
          series: [
            {
              name: "consumer",
              data: consumerData,
            },
          ],
        });
      } catch (error) {
        console.error("Error parsing WebSocket message from consumer:", error);
      }
    };

    ws2.onclose = () => {
      console.log("WebSocket connection closed for consumer.");
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

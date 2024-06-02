import ReactECharts from 'echarts-for-react';
import { useTheme } from '@mui/material/styles';

export const BarChart = ({ data }) => {
  const theme = useTheme()
  
  const option = {
    title : {
      text : 'Sales by City',
      textStyle: {
        color: `${theme.palette.text.primary}`
        }

    },
    grid: {
      left: '5%',
      right: '10%',
      bottom: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      splitLine: { show: false } 
    },
    yAxis: {
      type: 'category',
      data: Object.keys(data),
      axisLabel: {
        interval: 0,
        rotate: 0,
      },
    },
    series: [
      {
        type: 'bar',
        showBackground: true,
        data: Object.values(data),
        itemStyle: {
          color: '#8BD0E0',
        },
        backgroundStyle: {
          color: 'rgba(214,239,243, 1.0)'
        }
      }
    ],
  };
  return <ReactECharts option={option} style={{ height: '332px' }} />;
};

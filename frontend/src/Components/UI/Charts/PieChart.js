import ReactECharts from 'echarts-for-react';
import { useTheme } from '@mui/material/styles';

export const PieChart = ({ value, title }) => {
  const theme = useTheme()

  const options = {
    title : {
      text : title,
      textStyle: {
        color: `${theme.palette.text.primary}`
        }
    },
    legend: {
      orient: 'horizontal',
      x: 'center',
      y: 'bottom',
      data: Object.keys(value),
      textStyle: {
        color: `${theme.palette.text.primary}`
        }
    },
    series: [
      {
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        labelLine: {
          show: false,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '20',
            fontWeight: 'bold',
            textStyle: {
              color: `${theme.palette.text.primary}`
              }
          }
        },
        data : value ? Object.keys(value).map((val) => {
          return {value : value[val], name : val}
        }) : []
      }
    ]
  };

  return <ReactECharts option={options} style={{ height: '350px' }} />;
};

export default PieChart;

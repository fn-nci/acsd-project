import Highcharts from 'highcharts/highstock';
import ColumnChart from 'highcharts-react-official';
import '../styles/ColumnVis.scss';

function ColumnVis() {

    const options = {
        chart: {
            type: 'column',
        },
        title: {
            text:'Best Time to Visit Ireland',
        }, 
        subtitle: {
            text:'Based on Public Opinion',
        }, 
        xAxis: {
            categories:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        }, 
        yAxis:{
            title: {
                text: 'Percentage',
            },
        },
        series: [
            {
                name: 'Percentage',
                data: [40, 40, 50, 60, 70, 80, 90, 60, 60, 40, 30, 50],
                color:'#2E7D32'
            },
        ],
    };

    return (
      <div className='column-chart-container'>
        <ColumnChart highcharts={Highcharts} options={options}/>
      </div>
    );
  }
  
  export default ColumnVis;
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js/auto';
import React, { useState, useContext, useEffect } from 'react';
import { CombinedDataContext } from './CombinedData';
Chart.register(...registerables);

//====================================================================================================
export const BLSChart = () => {
  
  var [title, setTitle] = useState('');  
  const [showGraph, setShowGraph] = useState(true);
  var { _data } = useContext(CombinedDataContext);

  useEffect(() => {
    // This code will run whenever data.historical changes
    console.log("BLSCHART: " + _data.historical);
    setTitle(_data.historical)
    // Update the chart or perform any other actions based on the new data.historical value
  }, [_data.historical]);


  console.log("BLSCHART: " + _data.historical)
  const occupationData: Record<string, number[]> = {
    'MANAGEMENT, PROFESSIONAL, AND RELATED OCCUPATIONS': [165880, 172064, 179377, 183718, 188830, 195232, 200475, 200093, 204764],
    'MANAGEMENT, BUSINESS, AND FINANCIAL OPERATIONS OCCUPATIONS': [68547, 70245, 73686, 76092, 77655, 79450, 82783, 83242, 86118, 90830],
    'PROFESSIONAL AND RELATED OCCUPATIONS': [98732, 101819, 105692, 107626, 111174, 115781, 117691, 116851, 118546, 125018],
    'SERVICE OCCUPATIONS': [60109, 60077, 61115, 63633, 64177, 65153, 66132, 55085, 58521, 61872],
    'SALES AND OFFICE OCCUPATIONS': [92479, 93609, 94480, 94599, 94745, 94857, 95532, 84660, 86992, 88164],
    'OFFICE AND ADMINISTRATIVE SUPPORT OCCUPATIONS': [54976, 55003, 55576, 55463, 54933, 54550, 55814, 48826, 49866, 51231],
    'NATURAL RESOURCES, CONSTRUCTION, AND MAINTENANCE OCCUPATIONS': [41261, 43054, 43335, 44090, 46037, 46184, 46684, 41661, 44729, 45543],
    'FARMING, FISHING, AND FORESTRY OCCUPATIONS': [35061, 37242, 38383, 40994, 55281, 51621, 47778, 44294, 39584, 41531],
    'CONSTRUCTION AND EXTRACTION OCCUPATIONS': [21413, 23022, 22889, 23914, 24587, 25655, 25868, 23304, 24685, 25624],
    'INSTALLATION, MAINTENANCE, AND REPAIR OCCUPATIONS': [17071, 16925, 17205, 16807, 17601, 17128, 17217, 16309, 16842, 16871],
    'PRODUCTION OCCUPATIONS': [29228, 29924, 30202, 30051, 30356, 30672, 30964, 27281, 28428, 29406],
    'TRANSPORTATION AND MATERIAL MOVING OCCUPATIONS': [26492, 27379, 27812, 28373, 28942, 30170, 30449, 31669, 33933, 34897]
  };

  const data = {
    labels: ["2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"],
    datasets: [
      {
        label: "Historical Annual Salary according to BLS.gov",
        data: occupationData[_data.historical],
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.4,
        
      },
    ],
  };



  return (

    <div className="bg-blue-100"> 

        {showGraph && <Line datasetIdKey="id" data={data} />}
    </div>
  );
}

export default BLSChart;



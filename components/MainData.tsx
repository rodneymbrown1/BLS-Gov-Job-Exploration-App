import React, { createContext, useState, useEffect, useContext } from 'react';
import { CombinedDataContext } from './CombinedData';

export const MainDataContext = createContext<MainDataContextType | undefined>(undefined);

interface MainDataContextType {
  jsonData: any
  setJsonData: React.Dispatch<any>;
  sentence: string;
  setSentence: React.Dispatch<React.SetStateAction<string>>;
}

function MainDataProvider ({children}) {  
  const [jsonData, setJsonData] = useState<any>(null);
  const [sentence, setSentence] = useState('');

  return (
    <MainDataContext.Provider value={{jsonData, setJsonData, sentence, setSentence}}>
      {children}
    </MainDataContext.Provider>
  )
}

function DataContainer() {
  const { jsonData, setJsonData, sentence, setSentence } = useContext(MainDataContext);
  const { _data, _setData } = useContext(CombinedDataContext);
  const desiredTitle = _data.desiredTitle;
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchJsonData = async () => {
      try {
        const response = await fetch('/BLS_DATA/2021stats.json');
        const data = await response.json();
        setJsonData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching JSON data:', error);
      }
    };
    fetchJsonData();
  }, []);

  useEffect(() => {
    if (jsonData !== null) {
      const matchedObject = Object.values(jsonData).find(
        (obj: any) => obj.OCCTITLE === desiredTitle
      ) as any;
     
      if (matchedObject) {
        const TOTEMP = matchedObject.TOT_EMP;
        const H_MEAN = matchedObject.H_MEAN;
        const A_MEAN = matchedObject.A_MEAN;
        const H_PCT10 = matchedObject.H_PCT10;
        const H_PCT25 = matchedObject.H_PCT25;
        const H_MEDIAN = matchedObject.H_MEDIAN;
        const H_PCT75 = matchedObject.H_PCT75;
        const H_PCT90 = matchedObject.H_PCT90;
        const A_PCT10 = matchedObject.A_PCT10;
        const A_PCT25 = matchedObject.A_PCT25;
        const A_MEDIAN = matchedObject.A_MEDIAN;
        const A_PCT75 = matchedObject.A_PCT75;
        const A_PCT90 = matchedObject.A_PCT90;
        const JOB_DEMAND_INDEX = matchedObject.JOB_DEMAND_INDEX;
        
        const _sentence = "According to BLS.gov data, the total employed for this field is " 
                          + TOTEMP +  
                          ". The Hourly Mean is " + H_MEAN +
                          ". The Annual Mean is " + A_MEAN +
                          ". The Hourly 10th, 25th, 75th, and 90th percentile are " + 
                          H_PCT10 + ", " + H_PCT25 + ", " + H_PCT75 + ", and " + H_PCT90 + " respectively. " +
                          "The Annual Salary 10th, 25th, 75th, and 90th percentile are " +
                          A_PCT10 + ", " + A_PCT25 + ", " + A_PCT75 + ", and " + A_PCT90 + " respectively.";
        
        setSentence(_sentence);
        _setData((prevData) => ({
          ...prevData,
          maindata: _sentence
        }));
      }
    }
  }, [jsonData, desiredTitle, setSentence, _setData]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (jsonData === null) {
    return <p>No data found for the desired title.</p>;
  }

  const matchedObject = Object.values(jsonData).find(
    (obj: any) => obj.OCCTITLE === desiredTitle
  ) as any;

  if (!matchedObject) {
    return <p>No data found for the desired title.</p>;
  }
  const OCCTITLE = matchedObject.OCCTITLE
  const TOTEMP = matchedObject.TOT_EMP;
  const H_MEAN = matchedObject.H_MEAN;
  const A_MEAN = matchedObject.A_MEAN;
  const H_PCT10 = matchedObject.H_PCT10;
  const H_PCT25 = matchedObject.H_PCT25;
  const H_MEDIAN = matchedObject.H_MEDIAN;
  const H_PCT75 = matchedObject.H_PCT75;
  const H_PCT90 = matchedObject.H_PCT90;
  const A_PCT10 = matchedObject.A_PCT10;
  const A_PCT25 = matchedObject.A_PCT25;
  const A_MEDIAN = matchedObject.A_MEDIAN;
  const A_PCT75 = matchedObject.A_PCT75;
  const A_PCT90 = matchedObject.A_PCT90;
  const JOB_DEMAND_INDEX = matchedObject.JOB_DEMAND_INDEX;

  return (
    <div>
      <h1 className="text-l">{OCCTITLE} Statistics:</h1> 
      <h1 className="text-l">Total Employed: {TOTEMP} </h1>
      <h2 className="text-l">Job Demand Index: {JOB_DEMAND_INDEX}</h2>
      <br/>
      <h1 className="text-xl">Hourly Statistics</h1>
      <h2 className="text-l">Average Hourly: ${H_MEAN}</h2>
      <h2 className="text-l">Hourly Median ${H_MEDIAN}</h2>
      <h2 className="text-l">Average Annual Salary ${A_MEAN}</h2>
      <h2 className="text-l">Hourly 10th percentile ${H_PCT10} </h2>
      <h2 className="text-l">Hourly 25th percentile ${H_PCT25}</h2>
      <h2 className="text-l">Hourly 75th percentile ${H_PCT75}</h2>
      <h2 className="text-l">Hourly 90th percentile ${H_PCT90}</h2>
      <br/>
      <h1 className="text-xl">Annual Statistics</h1>
      <h2 className="text-l">Annual Median ${A_MEDIAN}</h2>
      <h2 className="text-l">Annual 10th percentile ${A_PCT10}</h2> 
      <h2 className="text-l">Annual 25th percentile ${A_PCT25}</h2> 
      <h2 className="text-l">Annual 75th percentile ${A_PCT75}</h2> 
      <h2 >Annual 90th percentile ${A_PCT90}</h2>   
    </div>
  );
}


export default function MainData() {    
  return (<div>
    <MainDataProvider>
      <DataContainer/>
    </MainDataProvider>    
    </div>
  );
}

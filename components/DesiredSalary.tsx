import React, { useState, createContext, useContext } from 'react';

import { CombinedDataContext } from './CombinedData';

const DesiredSalaryContext = createContext<DesiredSalaryContextType | undefined>(undefined);

interface DesiredSalaryContextType {
  desiredSalary: string;
  setDesiredSalary: React.Dispatch<React.SetStateAction<string>>;
  isFirstConfirmed: boolean;
  setIsFirstConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
}
function DesiredSalaryProvider ({children}) {

    const [desiredSalary, setDesiredSalary] = useState('');
    const [isFirstConfirmed, setIsFirstConfirmed] = useState(false);

    return (<DesiredSalaryContext.Provider value={{
      desiredSalary,
       setDesiredSalary,
       isFirstConfirmed,
        setIsFirstConfirmed}}>
      {children}
    </DesiredSalaryContext.Provider>)
}

function Menu ({ onNext }) {
  const { desiredSalary, setDesiredSalary, isFirstConfirmed, setIsFirstConfirmed } = useContext(DesiredSalaryContext);
  const { _setData } = useContext(CombinedDataContext);
  const handleSalaryChange = (event) => {
  const selectedOption =event.target.value
  
    setDesiredSalary(selectedOption);
 
      //chat prompt context
  _setData((prevData) => ({
    ...prevData,
    desiredSalary: selectedOption,
  }));
  
  };

  const handleFirstConfirm = () => {
    setIsFirstConfirmed(true);
    onNext();
  };



  return (
    <div>
      <h1 className="text-xl">Desired Salary</h1>
      <label htmlFor="salarySelection">Select a Salary:</label>
      <select id="salarySelection" value={desiredSalary} onChange={handleSalaryChange}>
        <option value="">Select</option>
        {salaryOptions.map((salary) => (
          <option key={salary} value={salary}>
            {salary.toLocaleString()}
          </option>
        ))}
      </select>
      <button onClick={handleFirstConfirm}>Confirm</button>
      {/* {desiredSalary && <p>You selected: {desiredSalary.toLocaleString()}</p>} */}
    </div>
  );

}

  const generateSalaryOptions = () => {
    const options = [];
    for (let salary = 20000; salary <= 250000; salary += 10000) {
      options.push(salary);
    }
    return options;
  };

  const salaryOptions = generateSalaryOptions();

const DesiredSalary = ({ onNext }) => {
  return(
    <div>
    <DesiredSalaryProvider>
      <Menu onNext={onNext}/>
    </DesiredSalaryProvider>
    </div>
  )
}

  export default DesiredSalary;
  export { DesiredSalaryProvider };
  export { DesiredSalaryContext }

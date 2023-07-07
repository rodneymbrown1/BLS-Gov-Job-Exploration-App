import React, { useState, createContext, useContext } from 'react';
import { CombinedDataContext } from './CombinedData';

const DesiredStateContext = createContext<DesiredStateContextType | undefined>(undefined);

interface DesiredStateContextType {
  selectedState: string;
  setSelectedState: React.Dispatch<React.SetStateAction<string>>;
  desiredState: string;
  setDesiredState:  React.Dispatch<React.SetStateAction<string>>;
  isFirstConfirmed: boolean;
  setIsFirstConfirmed: React.Dispatch<React.SetStateAction<boolean>>
}

function DesiredStateProvider ({children}) {
  
  const [selectedState, setSelectedState] = useState('');
  const [desiredState, setDesiredState] = useState('');
  const [isFirstConfirmed, setIsFirstConfirmed] = useState(false)

  return (
    <DesiredStateContext.Provider value={{selectedState, setSelectedState, desiredState, setDesiredState, isFirstConfirmed, setIsFirstConfirmed}}>
      {children}
    </DesiredStateContext.Provider>
  )
}

function Menu ({ onNext }) {
  const {
    desiredState,
    setDesiredState,
    selectedState, 
    setSelectedState,
    isFirstConfirmed, 
    setIsFirstConfirmed
  } = useContext(DesiredStateContext);

  const { _setData } = useContext(CombinedDataContext);

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setDesiredState(event.target.value);
    const selectedOption = event.target.value;
    //Chat Prompt Context
    _setData((prevData) => ({
      ...prevData,
      desiredState: selectedOption,
    }));  
  };
  const handleFirstConfirm = () => {
    setIsFirstConfirmed(true);
    onNext();
  };

  return (
    <div>
      <h1 className="text-xl">Desired State</h1>
      <label  htmlFor="stateSelection">Select a State:</label>
      <select id="stateSelection" value={selectedState} onChange={handleStateChange}>
        <option value="">Select</option>
        {stateOptions.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
      <button onClick={handleFirstConfirm}>Confirm</button>
      {/* {selectedState && <p>You selected: {selectedState}</p>} */}
    </div>
  );
}

const DesiredState = ( { onNext }) => {
  return (
    <div className="">
      <DesiredStateProvider>
        <Menu onNext={onNext} />       
      </DesiredStateProvider>
    </div>
  );

  
};

export { DesiredStateProvider };
export default DesiredState;
export { DesiredStateContext }

const stateOptions = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida',
  'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska',
  'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas',
  'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];


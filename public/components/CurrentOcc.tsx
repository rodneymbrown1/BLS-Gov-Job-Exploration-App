import React, { useState, useContext, createContext } from 'react';
import { CombinedDataContext } from './CombinedData';
import { a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v } from './OccTitleVars';

const CurrentOccContext = createContext<CurrentOccContextType | undefined>(undefined);

function CurrentFieldProvider ({ children }: { children: React.ReactNode }) {
  const [firstSelection, setFirstSelection] = useState('');
  const [secondSelection, setSecondSelection] = useState('');
  const [secondSelectionOptions, setSecondSelectionOptions] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentField, setCurrentField] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');
  const [isFirstConfirmed, setIsFirstConfirmed] = useState(false);
  const [isSecondConfirmed, setIsSecondConfirmed] = useState(false);

return(
  <CurrentOccContext.Provider value={
    {firstSelection, 
  setFirstSelection, 
  secondSelection, 
  setSecondSelectionOptions, 
  setSecondSelection, 
  secondSelectionOptions, 
  currentField, 
  setCurrentField, 
  isSubmitted, 
  setIsSubmitted, 
  isFirstConfirmed, 
  setIsFirstConfirmed,
  isSecondConfirmed, 
  setIsSecondConfirmed, 
  currentTitle, 
  setCurrentTitle}}>
    {children}
  </CurrentOccContext.Provider>
);
}

function Menu({ onNext }) {
  const {
    currentField,
    setCurrentField,
    currentTitle, 
    setCurrentTitle,
    firstSelection,
    setFirstSelection,
    isFirstConfirmed,
    setIsFirstConfirmed,
    isSecondConfirmed,
    setIsSecondConfirmed,
  } = useContext(CurrentOccContext);


  const { _setData } = useContext(CombinedDataContext);

  const handleFirstSelectionChange = (event) => {
    const selectedOption = event.target.value;
    setFirstSelection(selectedOption);
    setCurrentField(selectedOption);  
  };

  const handleSecondSelectionChange = (event) => {
    const selectedOption = event.target.value;
    setCurrentTitle(selectedOption);
    _setData((prevData) => ({
      ...prevData,
      currentTitle: selectedOption
    })); 
  };

  const handleFirstConfirm = () => {
    setIsFirstConfirmed(true);
   
  };

  const handleSecondConfirm = () => {
    setIsSecondConfirmed(true);
    onNext();
  };

  
 return (
    <div className="">
      {!isFirstConfirmed && (
        <div className="">
          <label className="text-xl" htmlFor="">Current Field</label>
          <select
            id="firstSelection"
            value={firstSelection}
            onChange={handleFirstSelectionChange}
            className="max-w-xs w-40"
          >
            <option value="">Select</option>
            {firstOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button onClick={handleFirstConfirm}>Confirm</button>
        </div>
      )}

      {isFirstConfirmed && !isSecondConfirmed && (
        <div className="max-w-xs w-40">
          <label className="text-xl" htmlFor="">Current Job</label>
          <select
            id="secondSelection"
            value={currentTitle}
            onChange={handleSecondSelectionChange}
            className="max-w-xs w-40"
          >
            <option value="">Select</option>
            {secondOptions[firstSelection].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button onClick={handleSecondConfirm}>Confirm</button>
        </div>
      )}
    </div>
  );
}

const CurrentOcc = ({ onNext }) => {
  return (
    <div className="">
      <CurrentFieldProvider>
        <Menu onNext={onNext} />       
      </CurrentFieldProvider>
    </div>
  );
};

export {CurrentFieldProvider}
export { CurrentOccContext };
export default CurrentOcc;


const firstOptions = [
  'ARCHITECTURE_AND_ENGINEERING_OCCUPATIONS',
  'ARTS,_DESIGN,_ENTERTAINMENT,_SPORTS,_AND_MEDIA_OCCUPATIONS',
  'BUILDING_AND_GROUNDS_CLEANING_AND_MAINTENANCE_OCCUPATIONS',
  'BUSINESS_AND_FINANCIAL_OPERATIONS_OCCUPATIONS',
  'COMMUNITY_AND_SOCIAL_SERVICE_OCCUPATIONS',
  'COMPUTER_AND_MATHEMATICAL_OCCUPATIONS',
  'CONSTRUCTION_AND_EXTRACTION_OCCUPATIONS',
  'EDUCATIONAL_INSTRUCTION_AND_LIBRARY_OCCUPATIONS',
  'FARMING,_FISHING,_AND_FORESTRY_OCCUPATIONS',
  'FOOD_PREPARATION_AND_SERVING_RELATED_OCCUPATIONS',
  'HEALTHCARE_PRACTITIONERS_AND_TECHNICAL_OCCUPATIONS',
  'HEALTHCARE_SUPPORT_OCCUPATIONS',
  'INSTALLATION,_MAINTENANCE,_AND_REPAIR_OCCUPATIONS',
  'LEGAL_OCCUPATIONS',
  'LIFE,_PHYSICAL,_AND_SOCIAL_SCIENCE_OCCUPATIONS',
  'MANAGEMENT_OCCUPATIONS',
  'OFFICE_AND_ADMINISTRATIVE_SUPPORT_OCCUPATIONS',
  'PERSONAL_CARE_AND_SERVICE_OCCUPATIONS',
  'PRODUCTION_OCCUPATIONS',
  'PROTECTIVE_SERVICE_OCCUPATIONS',
  'SALES_AND_RELATED_OCCUPATIONS',
  'TRANSPORTATION_AND_MATERIAL_MOVING_OCCUPATIONS'
];

const secondOptions = {
  // Template for secondOptions based on firstSelection
    'ARCHITECTURE_AND_ENGINEERING_OCCUPATIONS': a,
    'ARTS,_DESIGN,_ENTERTAINMENT,_SPORTS,_AND_MEDIA_OCCUPATIONS': b,
    'BUILDING_AND_GROUNDS_CLEANING_AND_MAINTENANCE_OCCUPATIONS': c,
    'BUSINESS_AND_FINANCIAL_OPERATIONS_OCCUPATIONS': d,
    'COMMUNITY_AND_SOCIAL_SERVICE_OCCUPATIONS': e,
    'COMPUTER_AND_MATHEMATICAL_OCCUPATIONS': f,
    'CONSTRUCTION_AND_EXTRACTION_OCCUPATIONS': g,
    'EDUCATIONAL_INSTRUCTION_AND_LIBRARY_OCCUPATIONS': h,
    'FARMING,_FISHING,_AND_FORESTRY_OCCUPATIONS': i,
    'FOOD_PREPARATION_AND_SERVING_RELATED_OCCUPATIONS': j,
    'HEALTHCARE_PRACTITIONERS_AND_TECHNICAL_OCCUPATIONS': k,
    'HEALTHCARE_SUPPORT_OCCUPATIONS': l,
    'INSTALLATION,_MAINTENANCE,_AND_REPAIR_OCCUPATIONS': m,
    'LEGAL_OCCUPATIONS': n,
    'LIFE,_PHYSICAL,_AND_SOCIAL_SCIENCE_OCCUPATIONS': o,
    'MANAGEMENT_OCCUPATIONS': p,
    'OFFICE_AND_ADMINISTRATIVE_SUPPORT_OCCUPATIONS': q,
    'PERSONAL_CARE_AND_SERVICE_OCCUPATIONS': r,
    'PRODUCTION_OCCUPATIONS': s,
    'PROTECTIVE_SERVICE_OCCUPATIONS': t,
    'SALES_AND_RELATED_OCCUPATIONS': u,
    'TRANSPORTATION_AND_MATERIAL_MOVING_OCCUPATIONS': v
  }

  interface CurrentOccContextType {
    firstSelection: string;
    setFirstSelection: React.Dispatch<React.SetStateAction<string>>;
    secondSelection: string;
    setSecondSelection: React.Dispatch<React.SetStateAction<string>>;
    secondSelectionOptions: any[];
    setSecondSelectionOptions: React.Dispatch<React.SetStateAction<any[]>>
    currentField: string;
    setCurrentField: React.Dispatch<React.SetStateAction<string>>;
    isSubmitted: boolean;
    setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;    
    isFirstConfirmed: boolean;
    setIsFirstConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
    isSecondConfirmed: boolean;
    setIsSecondConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
    currentTitle: string;
    setCurrentTitle: React.Dispatch<React.SetStateAction<string>>;
  }
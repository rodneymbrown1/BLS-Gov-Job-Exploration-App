import React, { useState, createContext, useContext } from 'react';
import { CombinedDataContext } from './CombinedData';
import { a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v } from './OccTitleVars';
import { Subcategory, MainCategory, mapSubcategoryToMainCategory } from './MapHistorical';

// Create a context object
const DesiredOccContext = createContext<DesiredOccContextType | undefined>(undefined);

interface DesiredOccContextType {
  firstSelection: string;
  setFirstSelection: React.Dispatch<React.SetStateAction<string>>;
  desiredField: string;
  setDesiredField: React.Dispatch<React.SetStateAction<string>>;
  isFirstConfirmed: boolean;
  setIsFirstConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
  isSecondConfirmed: boolean;
  setIsSecondConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
  desiredTitle: string;
  setDesiredTitle: React.Dispatch<React.SetStateAction<string>>;
  historical: string;
  setHistorical: React.Dispatch<React.SetStateAction<string>>;
}

// Create a provider component and set values
function DesiredFieldProvider({ children }: { children: React.ReactNode }) {
  const [firstSelection, setFirstSelection] = useState('');
  const [desiredField, setDesiredField] = useState('');
  const [desiredTitle, setDesiredTitle] = useState('');
  const [isFirstConfirmed, setIsFirstConfirmed] = useState(false);
  const [isSecondConfirmed, setIsSecondConfirmed] = useState(false);
  const [historical, setHistorical] = useState('');

  return (
    <DesiredOccContext.Provider value={{
        desiredField,
        setDesiredField,
        firstSelection,
        setFirstSelection,
        isFirstConfirmed,
        setIsFirstConfirmed,
        isSecondConfirmed,
        setIsSecondConfirmed,
        historical,
        setHistorical,
        desiredTitle,
        setDesiredTitle      
      }}>
      {children}
    </DesiredOccContext.Provider>
  );
}

//======================================================================
function Menu({ onNext }) {
  const {
    desiredField,
    setDesiredField,
    firstSelection,
    setFirstSelection,
    isFirstConfirmed,
    setIsFirstConfirmed,
    isSecondConfirmed,
    setIsSecondConfirmed,
    historical,
    setHistorical,
    desiredTitle,
    setDesiredTitle
  } = useContext(DesiredOccContext);
  
  const { _setData } = useContext(CombinedDataContext);

  // const handleFirstSelectionChange = (event) => {
  //   const selectedOption = event.target.value;
    
     
  // };

  const handleSubcategorySelection = (subcategory: Subcategory) => {
    var mainCategory = mapSubcategoryToMainCategory(subcategory);
    // Use the mainCategory as needed
    setHistorical(mainCategory);  
    setDesiredField(subcategory);  
    setFirstSelection(subcategory); 
    
    console.log("Desired Occ ... subcategory "+ subcategory)
    console.log("Desired Occ ... maincategory "+ mainCategory)  
    
    _setData((prevData) => ({
      ...prevData,
      historical: historical
    }));
    
    _setData((prevData) => ({
      ...prevData,
      desiredField: subcategory
    })); 
      };  

  const handleSecondSelectionChange = (event) => {
    const selectedOption = event.target.value;
    setDesiredTitle(selectedOption);
    console.log("Desired Occ ... second selection: " + desiredTitle);
    _setData((prevData) => ({
      ...prevData,
      desiredTitle: selectedOption,
    }));

  };

  const handleFirstConfirm = () => {
    setIsFirstConfirmed(true);
    _setData((prevData) => ({
      ...prevData,
      historical: historical
    }));
   
  };

  const handleSecondConfirm = () => {
    setIsSecondConfirmed(true);
    _setData((prevData) => ({
      ...prevData,
      desiredTitle: desiredTitle,
    }));
    onNext();
  };
// Add more options based on your firstSelection values
  
  return (
    <div className="">
      {!isFirstConfirmed && (
        <div className="">
          <label className="text-xl" htmlFor="">Desired Field</label>
          <select
            id="firstSelection"
            value={firstSelection}
            onChange={e => handleSubcategorySelection(e.target.value as Subcategory)}
            className="max-w-xs w-40">
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
        <div className="">
          <label className="text-xl" htmlFor="">Desired Job</label>
          <select
            id="secondSelection"
            value={desiredTitle}
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

const DesiredOcc = ({ onNext }) => {
  return (
    <div className="">
      <DesiredFieldProvider>
        <Menu onNext={onNext} />
      </DesiredFieldProvider>
    </div>
  );
};

export default DesiredOcc;
export { DesiredFieldProvider };
export { DesiredOccContext };

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

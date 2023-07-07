import React, { createContext, useState, ReactNode } from 'react';

interface CombinedDataContextProps {
  _data: {
    desiredState: string;
    desiredField: string;
    currentField: string;
    currentTitle: string;
    desiredSalary: string;
    historical: string;
    desiredTitle: string;
    maindata: string;
  };
  _setData: React.Dispatch<
    React.SetStateAction<{
      desiredState: string;
      desiredField: string;
      currentField: string;
      currentTitle: string;
      desiredSalary: string;
      historical: string;
      desiredTitle: string;
      maindata: string;
    }>
  >;
}

interface CombinedDataProviderProps {
  children: ReactNode;
}

export const CombinedDataContext = createContext<CombinedDataContextProps>({
  _data: {
    desiredState: '',
    desiredField: '',
    currentField: '',
    currentTitle: '',
    desiredSalary: '',
    historical: '',
    desiredTitle: '',
    maindata: '',
  },
  _setData: () => {},
});

export const CombinedDataProvider = ({ children }: CombinedDataProviderProps) => {
  const [_data, _setData] = useState({
    desiredState: '',
    desiredField: '',
    currentField: '',
    currentTitle: '',
    desiredSalary: '',
    historical: '',
    desiredTitle: '',
    maindata: '',
  });

  return (
    <CombinedDataContext.Provider value={{ _data, _setData }}>
      {children}
    </CombinedDataContext.Provider>
  );
};

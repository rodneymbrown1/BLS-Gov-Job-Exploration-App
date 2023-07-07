'use client'
import { useContext, useEffect, useState, useRef } from 'react';
import { useChat } from 'ai/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DesiredState, { DesiredStateProvider } from '@/components/DesiredState'
import DesiredOcc, { DesiredFieldProvider } from '@/components/DesiredOcc';
import CurrentOcc, { CurrentFieldProvider } from '@/components//CurrentOcc';
import DesiredSalary, { DesiredSalaryProvider } from '@/components//DesiredSalary';
import BLSChart from '@/components/BLSChart';
import { CombinedDataProvider } from '@/components/CombinedData';
import { CombinedDataContext } from '@/components/CombinedData';
import MainData from '@/components/MainData';
import VideoCarousel from '@/components/VideoCarousel';
import AboutSection from '@/components/About';


export default function App() {
const [currentStep, setCurrentStep] = useState(1);
function handleNextStep(){
    setCurrentStep(prevStep => prevStep + 1); // Increment the step
  };

  return (
  <div className="bg-pattern">
    <Navbar/><br/>
     <VideoCarousel/><br/>
      <AboutSection />        
      
      
      <div className="flex justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-auto h-30 sm:w-auto h-40 md:w-auto h-30">
         <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3" />
            </svg></div> 

      <CombinedDataProvider>
      <div className="w-3/4 container bg-white bg-opacity-50 mx-auto p-6 shadow-lg rounded-lg md:w-full lg:w-1/2 xl:w-1/2 2xl:w-1/2 text-left " >
      {currentStep === 1 && <DesiredOcc onNext={handleNextStep} />}
      {currentStep === 2 && <CurrentOcc onNext={handleNextStep} />}
      {currentStep === 3 && <DesiredSalary onNext={handleNextStep} />}
      {currentStep === 4 && <DesiredState onNext={handleNextStep} />}
      <br />
      {<MainData/>}
      <br/><br/><br/>
     {currentStep === 5 && <SendChat/>}
      </div><br/>
      <div className=""><BLSChart/> </div>
      </CombinedDataProvider>

          <Footer/>
              </div>    
             
  );
}

function SendChat() {
  const { _data } = useContext(CombinedDataContext);
  const { desiredState, desiredTitle, currentTitle, desiredSalary, maindata } = _data;
  const _sentence =
    maindata +
    'I am currently a ' +
    currentTitle +
    ' , I want a career in ' +
    desiredTitle +
    ' I want to live in ' +
    desiredState +
    '. ' +
    'I want to make ' +
    desiredSalary +
    ' per year.' +
    'What Can I expect to make in this occupation in this state?  Can you list some qualifications and education requirements?  Can you help me get started in researching industry, organizational size, and job responsibilities?  Where can I go to network in this state?  Can you also list some resources I can use?';

  const { messages, input, append, handleInputChange, handleSubmit } = useChat();

  useEffect(() => {
    async function sendInitialMessage() {
      const messageId = await append({ role: 'user', content: _sentence });
      // Optionally, you can handle the response here or perform any other actions
    }

    sendInitialMessage();
  }, []); // The empty dependency array ensures that this effect runs only once, on component mount

  return ( 
    <div>
      <div className="" id="input-container">
        <div className="h-300 overflow-y-auto bg-white">
        <div className="h-300 overflow-y-auto bg-white">
  {messages.map(m => (
    <div className={`message ${m.role === 'user' ? 'user' : 'assistant'}`} key={m.id}>
      {m.content}
    </div>
  ))}
</div>

        </div>
        <form onSubmit={handleSubmit}>
          <input className="w-full max-w-md bottom-0 border border-gray-300 rounded mb-8 shadow-xl p-2" value={input} onChange={handleInputChange} />
          {/* <button type="submit">Go</button> */}
        </form>
      </div>
    </div>
  );
}



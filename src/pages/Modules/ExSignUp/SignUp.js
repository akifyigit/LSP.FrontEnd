import React, { useState } from 'react';

import { Card, Stepper } from 'components';

import AdressInfo from './AdressInfo/AdressInfo';
import CompanyInfo from './CompanyInfo/CompanyInfo';
import UserInfo from './UserInfo/UserInfo';

const steps = [
  {
    icon: <i className="fa-solid text-primary fa-user"></i>,
    title: 'Kişisel Bilgiler',
  },
  {
    icon: <i className="fa-solid text-primary fa-building"></i>,
    title: 'Şirket Bilgileri',
  },
  {
    icon: <i className="fa-solid text-primary fa-map-location-dot"></i>,
    title: 'Adres Bilgileri',
  },
];

const SignUp = () => {
  const [activeStep, setActiveStep] = useState(1);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handlePrev = () => {
    setActiveStep(activeStep + -1);
  };

  const handleSignUp = () => {};

  const handleStep = () => {
    switch (activeStep) {
      case 1:
        return <UserInfo onNext={handleNext} onPrev={handlePrev} />;
      case 2:
        return <CompanyInfo onNext={handleNext} onPrev={handlePrev} />;
      case 3:
        return <AdressInfo onNext={handleSignUp} onPrev={handlePrev} />;
      default:
        break;
    }
  };

  return (
    <>
      <Card className="flex flex-col mx-auto bg-white w-full h-70vh sm:w-96  rounded-md shadow-2xl p-0 border-none">
        <div className="flex w-full flex-col p-6 h-full">
          <Stepper activeStep={activeStep} steps={steps} />
          {handleStep()}
        </div>
      </Card>
    </>
  );
};

SignUp.propTypes = {};

export default SignUp;

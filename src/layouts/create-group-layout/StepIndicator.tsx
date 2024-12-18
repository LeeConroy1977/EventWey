import React from "react";

interface StepIndicatorProps {
  currentStepNum: number;
}

const steps = 6;

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStepNum }) => {
  return (
    <div className="flex flex-col items-center w-[40%] mt-4">
      <progress
        value={currentStepNum}
        max={steps}
        className="w-full h-2 appearance-none"
      />
      <p className="mt-2 text-textPrimary">
        Step {currentStepNum} of {steps}
      </p>
    </div>
  );
};

export default StepIndicator;

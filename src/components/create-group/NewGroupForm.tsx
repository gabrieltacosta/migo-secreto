"use client"; 

import { useCreateGroupStore } from "@/store/useCreateGroupStore";
import { Step1BasicInfo } from "@/components/create-group/Step1BasicInfo";
import { Step2Participants } from "@/components/create-group/Step2Participants";
import { Step3Admin } from "@/components/create-group/Step3Admin";
import { Step4Review } from "@/components/create-group/Step4Review";

export function NewGroupForm() {
  const { currentStep } = useCreateGroupStore();

  return (
    <>
      {/* Barra de Progresso */}
      <div className="flex justify-between items-center mt-8 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-10"></div>
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 transition-all duration-300"
          style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
        ></div>

        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors
              ${currentStep >= step ? "bg-primary text-white" : "bg-gray-200 text-gray-500"}`}
          >
            {step}
          </div>
        ))}
      </div>

      {/* Renderiza o componente de acordo com o passo atual */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 mt-8">
        {currentStep === 1 && <Step1BasicInfo />}
        {currentStep === 2 && <Step2Participants />}
        {currentStep === 3 && <Step3Admin />}
        {currentStep === 4 && <Step4Review />}
      </div>
    </>
  );
}
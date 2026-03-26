import { create } from 'zustand';
import { CreateGroupInput } from '@/schemas/groupSchemas';

type Step = 1 | 2 | 3 | 4;

interface CreateGroupState {
  currentStep: Step;
  formData: Partial<CreateGroupInput>;
  
  setStep: (step: Step) => void;
  updateFormData: (data: Partial<CreateGroupInput>) => void;
  reset: () => void;
}

const initialData: Partial<CreateGroupInput> = {
  name: '',
  category: undefined,
  description: '',
  participants: [],
  adminName: '',
  adminPassword: '',
};

export const useCreateGroupStore = create<CreateGroupState>((set) => ({
  currentStep: 1,
  formData: initialData,

  setStep: (step) => set({ currentStep: step }),
  
  updateFormData: (data) => set((state) => ({ 
    formData: { ...state.formData, ...data } 
  })),
  
  reset: () => set({ currentStep: 1, formData: initialData }),
}));
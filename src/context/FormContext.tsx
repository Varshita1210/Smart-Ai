import React, { createContext, useContext, useState, useEffect } from 'react';
import { Form, FormResponse } from '../types';
import { MOCK_RESPONSES } from '../dummyData/mockResponses';

interface FormContextType {
  forms: Form[];
  addForm: (form: Form) => void;
  deleteForm: (id: string) => void;
  updateForm: (id: string, updates: Partial<Form>) => void;
  responses: FormResponse[];
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [forms, setForms] = useState<Form[]>([
    {
      id: 'hackathon-1',
      title: 'Hackathon Registration',
      description: 'Registration form for the upcoming dev hackathon',
      questions: [],
      createdAt: new Date().toISOString(),
      responsesCount: 154,
      status: 'active',
      shareUrl: 'smartpulse.ai/form/hack123'
    },
    {
      id: 'feedback-1',
      title: 'College Event Feedback',
      description: 'Collect student feedback after the annual fest',
      questions: [],
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      responsesCount: 42,
      status: 'active',
      shareUrl: 'smartpulse.ai/form/fb456'
    }
  ]);

  const addForm = (form: Form) => {
    setForms(prev => [form, ...prev]);
  };

  const deleteForm = (id: string) => {
    setForms(prev => prev.filter(f => f.id !== id));
  };

  const updateForm = (id: string, updates: Partial<Form>) => {
    setForms(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  return (
    <FormContext.Provider value={{ forms, addForm, deleteForm, updateForm, responses: MOCK_RESPONSES }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForms = () => {
  const context = useContext(FormContext);
  if (!context) throw new Error('useForms must be used within a FormProvider');
  return context;
};

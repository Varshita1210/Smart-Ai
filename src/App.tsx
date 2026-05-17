import React, { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import CreateFormPage from './pages/CreateFormPage';
import FillFormPage from './pages/FillFormPage';
import DashboardPage from './pages/DashboardPage';
import AnalysisPage from './pages/AnalysisPage';
import ResponsesListPage from './pages/ResponsesListPage';
import AIInsightsPage from './pages/AIInsightsPage';
import SpamFilterPage from './pages/SpamFilterPage';
import SavedFormsPage from './pages/SavedFormsPage';
import TemplatesPage from './pages/TemplatesPage';
import AppLayout from './components/AppLayout';
import { FormProvider } from './context/FormContext';
import { Page, Template } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  // Smooth scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setCurrentPage('create');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage onNavigate={setCurrentPage} />;
      case 'analysis':
        return <AnalysisPage onNavigate={setCurrentPage} />;
      case 'responses':
        return <ResponsesListPage />;
      case 'insights':
        return <AIInsightsPage />;
      case 'spam':
        return <SpamFilterPage />;
      case 'saved-forms':
        return <SavedFormsPage onNavigate={setCurrentPage} />;
      default:
        return <DashboardPage onNavigate={setCurrentPage} />;
    }
  };

  const renderPage = () => {
    if (['dashboard', 'analysis', 'responses', 'insights', 'spam', 'saved-forms'].includes(currentPage)) {
      return (
        <AppLayout currentPage={currentPage} onNavigate={setCurrentPage}>
          {renderContent()}
        </AppLayout>
      );
    }

    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={setCurrentPage} />;
      case 'create':
        return <CreateFormPage onNavigate={setCurrentPage} template={selectedTemplate} onClearTemplate={() => setSelectedTemplate(null)} />;
      case 'fill':
        return <FillFormPage onNavigate={setCurrentPage} />;
      case 'templates':
        return <TemplatesPage onNavigate={setCurrentPage} onSelectTemplate={handleSelectTemplate} />;
      default:
        return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <FormProvider>
      <div className="min-h-screen selection:bg-blue-500/30 selection:text-blue-200">
        {renderPage()}
      </div>
    </FormProvider>
  );
}

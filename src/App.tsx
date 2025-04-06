
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotesPage from "./pages/NotesPage";
import ChatPage from "./pages/ChatPage";
import TasksPage from "./pages/TasksPage";
import DocumentsPage from "./pages/DocumentsPage";
import DashboardPage from "./pages/DashboardPage";
import ConfigurationPage from "./pages/ConfigurationPage";
import UsersPage from "./pages/UsersPage";
import SystemPage from "./pages/SystemPage";
import ExtensionsPage from "./pages/ExtensionsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import MockupPage from "./pages/MockupPage";
import UpdatedMockupPage from "./pages/UpdatedMockupPage";
import React from "react"; 

// Create the query client outside of the component
const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/notes" replace />} />
              <Route path="/notes" element={<NotesPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/documents" element={<DocumentsPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/configuration" element={<ConfigurationPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/system" element={<SystemPage />} />
              <Route path="/extensions" element={<ExtensionsPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/mockup" element={<MockupPage />} />
              <Route path="/updated-mockup" element={<UpdatedMockupPage />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;

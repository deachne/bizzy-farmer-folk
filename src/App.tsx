
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotesPage from "./pages/NotesPage";
import { default as ChatPage } from "./pages/ChatPage";
import TasksPage from "./pages/TasksPage";
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
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;

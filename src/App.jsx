import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "@/components/organisms/Header";
import DealsPage from "@/components/pages/DealsPage";
import DispensariesPage from "@/components/pages/DispensariesPage";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header 
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
        
        <main>
          <Routes>
            <Route 
              path="/" 
              element={<DealsPage searchQuery={searchQuery} />} 
            />
            <Route 
              path="/dispensaries" 
              element={<DispensariesPage searchQuery={searchQuery} />} 
            />
          </Routes>
        </main>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{ zIndex: 9999 }}
        />
      </div>
    </Router>
  );
}

export default App;
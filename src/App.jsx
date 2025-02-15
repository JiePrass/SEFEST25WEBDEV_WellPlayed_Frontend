import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Navigations/Sidebar";
import FloatingToggleButton from "./components/Navigations/FloatingToggleButton";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import CarbonCalculator from "./pages/CarbonCalculator";
import CommunityPost from "./pages/CommunityPost";
import Footer from "./components/Navigations/Footer";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [emissionData, setEmissionData] = useState([]);

  useEffect(() => {
    // Data dummy (jika ada)
    const mockData = [];
    setEmissionData(mockData);
  }, []);

  return (
    <Router>
      {/* Container utama tanpa scroll horizontal */}
      <div className="min-h-screen bg-[#FBFBFB] overflow-x-hidden relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/*"
            element={
              <>
                {/* Desktop Layout */}
                <div className="hidden md:block">
                  {/* Sidebar Fixed */}
                  <div
                    className={`
                      fixed top-0 left-0 h-full transition-all duration-300 z-40 
                      ${sidebarOpen ? (isCollapsed ? "w-20" : "w-64") : "w-0"}
                    `}
                  >
                    <Sidebar
                      sidebarOpen={sidebarOpen}
                      setSidebarOpen={setSidebarOpen}
                      isCollapsed={isCollapsed}
                      setIsCollapsed={setIsCollapsed}
                    />
                  </div>
                  {/* Main Content dengan margin-left sesuai lebar sidebar */}
                  <div
                    className={`
                      transition-all duration-300
                      ${sidebarOpen ? (isCollapsed ? "ml-20" : "ml-64") : "ml-0"}
                    `}
                  >
                    <FloatingToggleButton setSidebarOpen={setSidebarOpen} />
                    <main className="p-6">
                      <Routes>
                        <Route path="/dashboard" element={<Dashboard emissionData={emissionData} />} />
                        <Route path="/history" element={<History emissionData={emissionData} />} />
                        <Route path="/calculator" element={<CarbonCalculator />} />
                        <Route path="/community" element={<CommunityPost />} />
                        <Route path="*" element={<Navigate to="/" />} />
                      </Routes>
                    </main>
                    <Footer />
                  </div>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden">
                  <FloatingToggleButton setSidebarOpen={setSidebarOpen} />
                  <main className="p-6">
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard emissionData={emissionData} />} />
                      <Route path="/history" element={<History emissionData={emissionData} />} />
                      <Route path="/calculator" element={<CarbonCalculator />} />
                      <Route path="/community" element={<CommunityPost />} />
                      <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                  </main>
                  <Footer />
                  {/* Sidebar Overlay untuk Mobile */}
                  <div
                    className={`
                      fixed inset-y-0 left-0 z-40 bg-white shadow-lg transition-transform duration-300
                      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                      ${isCollapsed ? "w-20" : "w-64"}
                    `}
                  >
                    <Sidebar
                      sidebarOpen={sidebarOpen}
                      setSidebarOpen={setSidebarOpen}
                      isCollapsed={isCollapsed}
                      setIsCollapsed={setIsCollapsed}
                    />
                  </div>
                </div>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

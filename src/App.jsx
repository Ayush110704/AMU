import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import DualCarousels from './Components/DualCarousels'
import IssueCategories from './Pages/IssueCategories'
import Gallery from './Pages/Gallery'
import Representatives from './Pages/Representatives'
import Footer from './Components/Footer'
import HowItWorks from './Pages/HowItWorks'
import ComplaintForm from './Pages/ComplaintForm'

// Admin Imports
import AdminAuth from './Admin/AdminAuth'  
import AdminDashboard from './Admin/AdminDashboard'

// The main homepage layout
function HomePage() {
  return (
    <div className="bg-[#F5F5F0] font-sans flex flex-col min-h-screen"> 
      <Navbar />
      <DualCarousels />
      <IssueCategories />
      <Gallery />
      <ComplaintForm />
      <HowItWorks />
      <Representatives />
      <Footer />
    </div>
  )
}

function App() { 
  return (
    <Router>
      <Routes>
        {/* Main Website */}
        <Route path="/" element={<HomePage />} /> 
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminAuth />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  )
}

export default App  
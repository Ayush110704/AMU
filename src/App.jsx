import Navbar from './Components/Navbar'
import DualCarousels from './Components/DualCarousels'
import IssueCategories from './Pages/IssueCategories'
import Gallery from './Pages/Gallery'
import Representatives from './Pages/Representatives'
import Footer from './Components/Footer'
import HowItWorks from './Pages/HowItWorks'
import ComplaintForm from './Pages/ComplaintForm'

function App() { 
  return (
    <div className="  bg-[#F5F5F0] font-sans flex flex-col"> 
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

export default App

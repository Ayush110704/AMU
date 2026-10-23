import Navbar from './Components/Navbar'
import DualCarousels from './Components/DualCarousels'
import Gallery from './Pages/Gallery'
import Footer from './Components/Footer'
import HowItWorks from './Pages/HowItWorks'
import ComplaintForm from './Pages/ComplaintForm'

function App() { 
  return (
    <div className="  bg-[#F5F5F0] font-sans flex flex-col"> 
      <Navbar />
      <DualCarousels />
      <Gallery />
      <ComplaintForm />
      <HowItWorks />
      <Footer />
    </div>
  )
}

export default App

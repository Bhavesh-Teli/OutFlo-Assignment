import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { HomePage } from "./pages/HomePage"
import "./App.css"
import { Navbar } from "./components/Navbar"
import { CampaignsPage } from "./pages/CampaignsPage"
import { MessageGeneratorPage } from "./pages/MessageGeneratorPage"
const App: React.FC = () => {
  return (

    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/campaigns" element={<CampaignsPage />} />
          <Route path="/message-generator" element={<MessageGeneratorPage />} />
        </Routes>
      </div>
    </Router>
  )
}


export default App

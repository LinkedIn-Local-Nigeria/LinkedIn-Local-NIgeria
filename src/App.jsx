import './App.css'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import AllSpeakers from './components/AllSpeakers'
import Footer from './components/Footer'
import Home from './components/Home'
import Navbar from './components/NavBar'
import SpeakerDetail from './components/SpeakerDetails'
import SanityStudio from './components/SanityStudio'
import Layout from './components/ui/Layout'

function App () {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path='/AllSpeakers'
          element={
            <Layout>
              <AllSpeakers />
            </Layout>
          }
        />
        <Route
          path='/speaker/:slug'
          element={
            <Layout>
              <SpeakerDetail />
            </Layout>
          }
        />
        {/* Sanity CMS dashboard */}
        <Route path='/studio/*' element={<SanityStudio />} />
      </Routes>
    </Router>
  )
}

export default App

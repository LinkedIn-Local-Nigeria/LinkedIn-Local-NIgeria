import './App.css'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import AllSpeakers from './components/AllSpeakers'
import Home from './components/Home'
import Layout from './components/ui/Layout'
import SanityStudio from './components/SanityStudio'
import SpeakerDetail from './components/SpeakerDetails'

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

import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/NavBar'
import Section from './components/ui/Section'
import TeamSection from './components/TeamSection'

function App () {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Section
                id='about'
                title='About Section'
                background='bg-[#fdfdfd]'
              >
                <p>Content for the About section goes here...</p>
              </Section>

              <Section
                id='speakers'
                title='Speakers Section'
                background='bg-[#fdfdfd]'
              >
                <p>Content for the Speakers section goes here...</p>
              </Section>

              <TeamSection
                id='teams'
                title='Team Section'
                background='bg-[#fdfdfd]'
              >
                <p>Content for the Teams section goes here...</p>
              </TeamSection>

              <Section id='faqs' title='FAQs Section' background='bg-[#fdfdfd]'>
                <p>Content for the FAQs section goes here...</p>
              </Section>
            </>
          }
        />

        <Route
          path='/team'
          element={
            <div className='min-h-screen flex items-center justify-center text-2xl'>
              This is the full Team Page!
            </div>
          }
        />
      </Routes>
    </>
  )
}

export default App

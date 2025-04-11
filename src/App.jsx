import { Routes, Route } from 'react-router-dom';
import Layout from './components/ui/Layout';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import MainContent from './mainContent';
import TeamSection from './components/TeamSection';

function Router() {
  return (
    <Layout>
      <Theme>
        <Routes>
          <Route path='/' element={<MainContent />} />
          <Route
            path='/team'
            element={<TeamSection/>
            }
          />
          <Route
            path='/team'
            element={<TeamSection/>
            }
          />
          <Route
            path='/team'
            element={<TeamSection/>
            }
          />
        </Routes>
      </Theme>
    </Layout>
  );
}

export default Router;

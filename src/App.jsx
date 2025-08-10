import "./App.css";

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import Layout from './components/ui/Layout';
import ScrollToHashElement from './components/lib/ScrollToHashElement';

// import Home from './components/Home';



const Home = lazy(() => import('./components/Home'));
// const Blog = lazy(() => import('./components/Blog'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const TermsOfUse = lazy(() => import('./components/TermsOfuse'));
const AllSpeakers = lazy(() => import('./components/AllSpeakers'));
const SpeakerDetail = lazy(() => import('./components/SpeakerDetails'));
const SanityStudio = lazy(() => import('./components/SanityStudio'));

const Loading = () => (
  <p className="mt-20 text-center text-gray-500">Loading...</p>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Suspense fallback={<Loading />}>
                <Home />
              </Suspense>
            </Layout>
          }
        />

        <Route
          path="/terms-of-use"
          element={
            <Layout>
              <Suspense fallback={<Loading />}>
                <TermsOfUse />
              </Suspense>
            </Layout>
          }
        />

        <Route
          path="/privacy-policy"
          element={
            <Layout>
              <Suspense fallback={<Loading />}>
                <PrivacyPolicy />
              </Suspense>
            </Layout>
          }
        />

        <Route
          path="/AllSpeakers"
          element={
            <Layout>
              <Suspense fallback={<Loading />}>
                <AllSpeakers />
              </Suspense>
            </Layout>
          }
        />

        <Route
          path="/speaker/:slug"
          element={
            <Layout>
              <Suspense fallback={<Loading />}>
                <SpeakerDetail />
              </Suspense>
            </Layout>
          }
        />

        <Route
          path="/blog"
          element={
            <Suspense fallback={<Loading />}>
              {/* <Blog /> */}
            </Suspense>
          }
        />
        <Route
          path="/studio/*"
          element={
            <Suspense fallback={<Loading />}>
              <SanityStudio />
            </Suspense>
          }
        />

        <Route
          path="*"
          element={
            <Layout>
              <div className="mt-20 text-center text-gray-600">
                <h1 className="text-3xl font-semibold">404</h1>
                <p>Page not found</p>
              </div>
            </Layout>
          }
        />
      </Routes>

      <ScrollToHashElement />
    </Router>
  );
}

export default App;

import "./App.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Blog from "./components/Blog";
import Home from "./components/Home";
import Layout from "./components/ui/Layout";
import PrivacyPolicy from "./components/PrivacyPolicy";
import ScrollToHashElement from "./components/lib/ScrollToHashElement";
import TermsOfUse from "./components/TermsOfUse";
import BlogDetail from "./components/BlogDetail"; 

const AllSpeakers = lazy(() => import("./components/AllSpeakers"));
const SpeakerDetail = lazy(() => import("./components/SpeakerDetails"));
const SanityStudio = lazy(() => import("./components/SanityStudio"));

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/terms-of-use"
          element={
            <Layout>
              <TermsOfUse />
            </Layout>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <Layout>
              <PrivacyPolicy />
            </Layout>
          }
        />
        <Route
          path="/AllSpeakers"
          element={
            <Layout>
              <AllSpeakers />
            </Layout>
          }
        />
        <Route
          path="/speaker/:slug"
          element={
            <Layout>
              <SpeakerDetail />
            </Layout>
          }
        />
        <Route path="/blog" element={<Blog />} />

        {/* Sanity CMS dashboard ? */}
        <Route path="/studio/*" element={<SanityStudio />} />
      </Routes>
      <ScrollToHashElement />
      <Suspense fallback={<p className="mt-20 text-center">Loading...</p>}>
        <Routes>
          <Route
            path="/blog/:slug"
            element={
              <Layout>
                <BlogDetail />
              </Layout>
            }
          />
          <Route
            path="/terms-of-use"
            element={
              <Layout>
                <TermsOfUse />
              </Layout>
            }
          />
          <Route
            path="/privacy-policy"
            element={
              <Layout>
                <PrivacyPolicy />
              </Layout>
            }
          />
          <Route
            path="/AllSpeakers"
            element={
              <Layout>
                <AllSpeakers />
              </Layout>
            }
          />
          <Route
            path="/speaker/:slug"
            element={
              <Layout>
                <SpeakerDetail />
              </Layout>
            }
          />
          <Route path="/studio/*" element={<SanityStudio />} />
          <Route
            path="*"
            element={
              <Layout>
                <div className="mt-20 text-center text-gray-600"></div>
              </Layout>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

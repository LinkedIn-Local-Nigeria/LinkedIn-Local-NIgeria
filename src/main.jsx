// import "./index.css";

// import App from "./App.jsx";
// import { HelmetProvider } from 'react-helmet-async';
// import React from "react";
// import ReactDOM from "react-dom/client";
// import { Theme } from "@radix-ui/themes";
// import { Toaster } from "react-hot-toast";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <Theme>
//       <HelmetProvider>
//       <App />
//       </HelmetProvider>
//       <Toaster position="top-right" reverseOrder={false} /> 
//     </Theme>
//   </React.StrictMode>
// );


// src/main.jsx

import './index.css';

import App from './App.jsx';
import { HelmetProvider } from 'react-helmet-async';
import React from 'react';
import { Theme } from '@radix-ui/themes';
import { Toaster } from 'react-hot-toast';
import { createRoot } from 'react-dom/client';

// Import CSS first


// Import App component


// Error boundary for better error handling
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('React Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '20px', 
          color: '#dc2626', 
          fontFamily: 'monospace',
          background: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          margin: '20px'
        }}>
          <h2>Something went wrong</h2>
          <details style={{ whiteSpace: 'pre-wrap', marginTop: '10px' }}>
            <summary>Error details:</summary>
            {this.state.error?.toString()}
          </details>
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '10px',
              padding: '8px 16px',
              background: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Safe initialization function
function initializeApp() {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    throw new Error('Root element with id "root" not found in the document');
  }

  try {
    const root = createRoot(rootElement);
    
    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <Theme>
            <HelmetProvider>
              <App />
              <Toaster 
                position="top-right" 
                reverseOrder={false}
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#363636',
                    color: '#fff',
                  },
                }}
              />
            </HelmetProvider>
          </Theme>
        </ErrorBoundary>
      </React.StrictMode>
    );
    
    console.log('✅ App initialized successfully');
    
  } catch (error) {
    console.error('❌ Failed to initialize app:', error);
    
    // Fallback rendering
    rootElement.innerHTML = `
      <div style="
        padding: 20px; 
        color: #dc2626; 
        font-family: system-ui, -apple-system, sans-serif;
        background: #fef2f2;
        border: 1px solid #fecaca;
        border-radius: 8px;
        margin: 20px;
        max-width: 600px;
      ">
        <h2>Failed to Load Application</h2>
        <p><strong>Error:</strong> ${error.message}</p>
        <p>This might be a temporary issue. Please try:</p>
        <ul>
          <li>Refreshing the page</li>
          <li>Clearing your browser cache</li>
          <li>Checking your internet connection</li>
        </ul>
        <button 
          onclick="window.location.reload()" 
          style="
            margin-top: 10px;
            padding: 8px 16px;
            background: #dc2626;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          "
        >
          Reload Page
        </button>
      </div>
    `;
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
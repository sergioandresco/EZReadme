import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';
import '@/index.css';
import { ReadmeProvider } from './context/saveElements';
import App from '@/App.jsx';
import Squares from '@/components/Squares/Squares.jsx';
import { Signature } from '@/components/signature';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReadmeProvider>
      <div className="app-wrapper">
        <Toaster position="top-right" richColors />
        <Squares 
          speed={0.5} 
          squareSize={40}
          direction="diagonal"
          borderColor="#FFFFFF"
          hoverFillColor="#00B825"
        />
        <div className="app-content">
          <App />
          <Signature />
        </div>
      </div>
    </ReadmeProvider>
  </StrictMode>,
)
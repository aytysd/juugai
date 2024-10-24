import React from 'react';
import { 
  BrowserRouter, 
  Routes, 
  Route,
  Link
} from 'react-router-dom';

import AnalyzerNode from './pages/AnalyzerNode/AnalyzerNode';

interface RouteProviderProps {
  children: React.ReactNode;
}

const RouteProvider: React.FC<RouteProviderProps> = ({ children }) => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/analyzer-node" element={<AnalyzerNode />} />
        </Routes>
        {children}
      </BrowserRouter>
  );
}


export default RouteProvider;
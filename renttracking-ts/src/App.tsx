import './App.css';
import Home from './components/Home';
import AppNavbar from './components/AppNavbar';
import {Route } from "react-router";
import { BrowserRouter } from 'react-router-dom';
import About from './components/About';
import ViewTenant from './components/ViewTenant';
import TenantContextProvider from './context/TenantContext'

function App() {
    return (
      <div className="App">
        <AppNavbar/>
        <BrowserRouter>
          <TenantContextProvider>          
            <Route path="/viewtenant"><ViewTenant /></Route>
            <Route path="/about"><About /></Route>
            <Route exact path="/"><Home /></Route>
          </TenantContextProvider>
        </BrowserRouter>
      </div>
    );
}

export default App;

import './App.css';
import Home from './components/Home';
import AppNavbar from './components/AppNavbar';
import {Route } from "react-router";
import { BrowserRouter } from 'react-router-dom';
import About from './components/About';
import ViewTenant from './components/ViewTenant';
import TenantContextProvider from './context/TenantContext'
import FlatContextProvider from './context/FlatContext'

function App() {
    return (
      <BrowserRouter>
      <div className="App">
        <AppNavbar/>        
        <TenantContextProvider>
          <FlatContextProvider>                   
            <Route path="/tenant"><ViewTenant /></Route>
            <Route path="/about"><About /></Route>
            <Route exact path="/"><Home /></Route>
          </FlatContextProvider>
        </TenantContextProvider>        
      </div>
      </BrowserRouter>
    );
}

export default App;

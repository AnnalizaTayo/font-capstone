import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import FadeInContent from './client/components/FadeInContent';
import './assets/styles/global/globalStyles.scss';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor} from './redux/store/store';

//admin-side
import Login from './admin/pages/Login';
import Collections from './admin/pages/Collections';
import Company from './admin/pages/Company';
import Dashboard from './admin/pages/Dashboard';
import Subscribers from './admin/pages/Subscribers';
import Employees from './admin/pages/Employees';
import FaqsList from './admin/pages/FaqsList copy';

import AdminNav from './admin/components/navbar/Navbar';
import Menu from './admin/components/menu/Menu';
import Footer from './admin/components/footer/Footer';

//Black Front
import Home from './client/pages/Home';
import Catalog from './client/pages/Catalog';
import Contact from './client/pages/Contact';

//White Front
import About from './client/pages/About';
import Faqs from './client/pages/Faqs';

import Navbar from './client/components/Navbar';
import ClientFooter from './client/components/ClientFooter';


const AdminLayout = ({ children }) => {
  return (
      <div className='admin'>
        <header>
          <AdminNav/>
        </header>
        <main className='container'>
          <aside className='menuContainer'><Menu/></aside>
          <section className='contentContainer'>{children}</section>
        </main>
        <footer ><Footer/></footer>
      </div>
  );
};

const FrontBlackLayout = ({ children }) => {
  return (
    <div className="front-black">
      <main className='fade-in-transition footerStyle'>
        <Navbar/>
        {children}
      </main>
      <ClientFooter/>
    </div>
  );
};

const FrontWhiteLayout = ({ children }) => {
  return (
    <div className="front-white">
      <main className='fade-in-transition footerStyle'>
        <Navbar/>
        {children}
      </main>
      <ClientFooter/>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            {/* Black Front */}
            <Route path="/" element={<FrontBlackLayout><FadeInContent><Home /></FadeInContent></FrontBlackLayout>}/>
            <Route path="/catalog" element={<FrontBlackLayout><FadeInContent><Catalog /></FadeInContent></FrontBlackLayout>}/>
            <Route path="/contact" element={<FrontBlackLayout><FadeInContent><Contact /></FadeInContent></FrontBlackLayout>}/>
            {/* White Front */}
            <Route path="/about" element={<FrontWhiteLayout><FadeInContent><About /></FadeInContent></FrontWhiteLayout>}/>
            <Route path="/faqs" element={<FrontWhiteLayout><FadeInContent><Faqs /></FadeInContent></FrontWhiteLayout>}/>
            {/* Admin */}
            <Route path="/admin-dashboard" element={<AdminLayout><Dashboard /></AdminLayout>}/>
            <Route path="/admin-dashboard/collections" element={<AdminLayout><Collections /></AdminLayout>}/>
            <Route path="/admin-dashboard/company" element={<AdminLayout><Company /></AdminLayout>}/>
            <Route path="/admin-dashboard/subscribers" element={<AdminLayout><Subscribers /></AdminLayout>}/>
            <Route path="/admin-dashboard/users" element={<AdminLayout><Employees /></AdminLayout>}/>
            <Route path="/admin-dashboard/faqlist" element={<AdminLayout><FaqsList /></AdminLayout>}/>
            {/* Login */}
            <Route path="/admin-dashboard/login" element={<Login />}/>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;

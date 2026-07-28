import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import PageTransition from './components/PageTransition';

// الواجهة العامة (Public Pages)
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import ApiDocs from './pages/ApiDocs';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// الداشبورد (Protected Pages & Layouts)
import ProtectedRoute from './components/ProtectedRoute'; // حارس البوابة
import DashboardLayout from './layouts/DashboardLayout'; // هيكل القائمة الجانبية
import Dashboard from './pages/Dashboard';
import Knowledge from './pages/Knowledge';
import History from './pages/History';
import DashboardApi from './pages/DashboardApi';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Support from './pages/Support';

function Layout() {
  const location = useLocation();
  
  // نحدد المسارات التي لا نريد ظهور الناف بار والفوتر فيها (كل ما يخص الداشبورد)
  const hideHeaderFooter = location.pathname.includes('/dashboard');

  return (
    <>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-background">
        
        {/* شريط التنقل يظهر في الواجهة العامة فقط */}
        {!hideHeaderFooter && <Navbar />}
        
        <main className="flex-grow relative">
          <PageTransition>
            <Routes>
              
              {/* ================= المسارات العامة ================= */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/api-docs" element={<ApiDocs />} />
              <Route path="/Privacy" element={<PrivacyPolicy/>}/>
              <Route path="/terms" element={<TermsOfService/>}/>
              <Route path="/support" element={<Support/>}/>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register/>}/>
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              
              {/* ================= المسارات المحمية (الداشبورد) ================= */}
              {/* 1. الحارس يقف هنا: يمنع دخول غير المسجلين */}
              <Route element={<ProtectedRoute />}>
                
                {/* 2. الهيكل المشترك (يحتوي على الـ Sidebar) */}
                <Route path="/dashboard" element={<DashboardLayout />}>
                  
                  {/* 3. الصفحات الداخلية (تُعرض داخل الـ Outlet في DashboardLayout) */}
                  <Route index element={<Dashboard />} /> {/* الرابط: /dashboard */}
                  <Route path="knowledge" element={<Knowledge />} /> {/* الرابط: /dashboard/knowledge */}
                  <Route path="history" element={<History />} />
                  <Route path="api" element={<DashboardApi />} />
                  
                </Route>

              </Route>

            </Routes>
          </PageTransition>
        </main>

        {/* التذييل يظهر في الواجهة العامة فقط */}
        {!hideHeaderFooter && <Footer />}
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout/>
    </Router>
  );
}

export default App;
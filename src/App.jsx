import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import PageTransition from './components/PageTransition';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Contact = lazy(() => import('./pages/Contact'));
const ApiDocs = lazy(() => import('./pages/ApiDocs'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));
const DashboardLayout = lazy(() => import('./layouts/DashboardLayout'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Knowledge = lazy(() => import('./pages/Knowledge'));
const History = lazy(() => import('./pages/History'));
const DashboardApi = lazy(() => import('./pages/DashboardApi'));
const DashboardBilling = lazy(() => import('./pages/DashboardBilling'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const Support = lazy(() => import('./pages/Support'));
const WidgetDocs = lazy(() => import('./pages/WidgetDocs'));

function Layout() {
  const location = useLocation();
  const hideHeaderFooter = location.pathname.includes('/dashboard');

  return (
    <>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-background">
        {!hideHeaderFooter && <Navbar />}
        <main className="flex-grow relative">
          <PageTransition>
            <Suspense fallback={
              <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-10 h-10 border-4 border-slate-200 border-t-electric-cyan rounded-full animate-spin"></div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/api-docs" element={<ApiDocs />} />
                <Route path="/Privacy" element={<PrivacyPolicy/>}/>
                <Route path="/terms" element={<TermsOfService/>}/>
                <Route path="/support" element={<Support/>}/>
                <Route path="/docs" element={<WidgetDocs/>}/>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register/>}/>
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="knowledge" element={<Knowledge />} />
                    <Route path="history" element={<History />} />
                    <Route path="api" element={<DashboardApi />} />
                    <Route path="billing" element={<DashboardBilling />} />
                  </Route>
                </Route>
              </Routes>
            </Suspense>
          </PageTransition>
        </main>
        {!hideHeaderFooter && <Footer />}
      </div>
    </>
  );
}

// قراءة التوكن من cookie (لنفس النطاق: api.mosaned.org → mosaned.org)
if (!localStorage.getItem('accessToken')) {
  const match = document.cookie.match(/(^| )accessToken=([^;]+)/);
  if (match) {
    localStorage.setItem('accessToken', match[2]);
    document.cookie = 'accessToken=; max-age=0; path=/';
  }
}

function App() {
  return (
    <Router>
      <Layout/>
    </Router>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import Homepage from "./pages/Homepage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import LoginPage from "./pages/LoginPage";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import ContactPage from "./pages/ContactPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PayPage from "./pages/PayPage";
import PaymentLinkViewPage from "./pages/PaymentLinkViewPage";
import ManualServicesPage from "./pages/ManualServicesPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/pay/:token" element={<PaymentLinkViewPage />} />
        <Route
          path="/pay"
          element={
            <ProtectedRoute>
              <PayPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/services"
          element={
            <ProtectedRoute>
              <Services />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manual-services"
          element={
            <ProtectedRoute>
              <ManualServicesPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer />
      <Toaster position="top-right" />
    </BrowserRouter>
  );
};

export default App;

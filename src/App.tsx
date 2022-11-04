import { Navigate, Route, Routes, useNavigate } from 'react-router';
import { QueryClient, QueryClientProvider } from 'react-query';

// Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Config
import { configureAPI } from 'utils/api';

// Context
import { AuthContext } from 'context/AuthContext';
import { useAuthHook } from 'context/useAuthHook';
import { useLayoutHook } from 'context/useLayoutHook';
import { LayoutContext } from 'context/LayoutContext';

// Pages
import { Checkin } from 'pages/Checkin';
import { Checkout } from 'pages/Checkout';
import { Home } from 'pages';
import { ThankYou } from 'pages/ThankYou';
import { Login } from 'pages/Auth/Login';

// Components
import { Layout } from 'common/components/Layouts';
import { Helmet } from 'common/components/Helmet';
import { AbsoluteSpinner } from 'common/components/Spinners';

// Declarations
const queryClient = new QueryClient();

const App = () => {
  const navigate = useNavigate();
  const data = useAuthHook();
  const { isAuthenticated, handleLogout, loadingAuth } = data;

  const layout = useLayoutHook({ isAuthenticated });

  // Handlers
  configureAPI({
    token: data.auth?.token,
    onSignOut: handleLogout,
    isNotFound: () => navigate('/404page'),
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ ...data }}>
        <LayoutContext.Provider value={{ ...layout }}>
          <Layout>
            <ToastContainer
              position="bottom-center"
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              theme="colored"
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            {loadingAuth && <AbsoluteSpinner show={true} />}
            {!isAuthenticated && !loadingAuth && (
              <Routes>
                <Route
                  path="/login"
                  element={
                    <Helmet title="Authentication" component={<Login />} />
                  }
                />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            )}
            {isAuthenticated && !loadingAuth && (
              <Routes>
                <Route
                  path="/"
                  element={<Helmet title="Home" component={<Home />} />}
                />
                <Route
                  path="/checkin"
                  element={<Helmet title="Check-in" component={<Checkin />} />}
                />
                <Route
                  path="/checkout"
                  element={
                    <Helmet title="Check-out" component={<Checkout />} />
                  }
                />
                <Route
                  path="/thank-you/:action"
                  element={
                    <Helmet title="Thank You" component={<ThankYou />} />
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            )}
          </Layout>
        </LayoutContext.Provider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export default App;

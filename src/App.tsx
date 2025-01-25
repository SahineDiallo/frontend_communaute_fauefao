// src/App.jsx

import { BrowserRouter as Router } from 'react-router-dom'; 
import { Provider } from 'react-redux';
import AppRoutes from './components/routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <AppRoutes />
          <ToastContainer
              position="top-right" // Position at the top-right
              autoClose={5000} // Auto-close notifications after 5 seconds
              hideProgressBar={false} // Show progress bar
              newestOnTop={false} // New notifications appear below older ones
              closeOnClick // Close notifications when clicked
              rtl={false} // Left-to-right layout
              pauseOnFocusLoss // Pause notifications when the window loses focus
              draggable // Allow dragging to dismiss
              pauseOnHover // Pause notifications when hovered
            />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;

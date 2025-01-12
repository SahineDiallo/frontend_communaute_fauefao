// src/App.jsx

import { BrowserRouter as Router } from 'react-router-dom'; 
import { Provider } from 'react-redux';
import store from './store/store';
import AppRoutes from './components/routes';



function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppRoutes />
      </Router>
    </Provider>
  );
}

export default App;

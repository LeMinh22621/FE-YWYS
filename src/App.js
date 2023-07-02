import { ToastContainer } from 'react-toastify';
import './App.css';
import AppRouter from './routes/AppRouter';

function App() {
  return(
    <>
      <AppRouter/>
      <ToastContainer/>
    </>
  );
}

export default App;

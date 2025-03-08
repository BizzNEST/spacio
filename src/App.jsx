import './App.css';
import { RouterProvider } from 'react-router-dom';
import { useRouter } from './pages/Routes.jsx';

const routes = useRouter();

function App() {
  return (
    <RouterProvider router={routes}></RouterProvider>
  );
}

export default App;

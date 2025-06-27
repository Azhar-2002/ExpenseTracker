import { Navigate } from 'react-router-dom';
import './App.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import { Toaster } from "@/components/ui/sonner"

const appRouter = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" /> },
  { path: "/login", element: <Login /> },
  { path: "/home", element: <Home /> },
  { path: "/signup", element: <Signup /> },
]);
function App() {
  return (
   <div>
    <RouterProvider router={appRouter} />
    <Toaster/>
   </div>
  )
}

export default App;

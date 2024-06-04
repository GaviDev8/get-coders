import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App';
import Error from './pages/ErrorPage';
import Home from './pages/home';
import About from './pages/about';
// import Contact from './pages/ContactPage';
// import Project from './pages/ProjectPage';
// import Resume from "./pages/ResumePage"


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
    //   {
    //     path: '/Project',
    //     element: <Project />,
    //   },
    //   {
    //     path: '/Contact',
    //     element: <Contact />,
    //   },
    //   {
    //     path: '/Resume',
    //     element: <Resume />,
    //   },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
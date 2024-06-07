import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App';
import Error from './pages/ErrorPage';
import Home from './pages/home';
import About from './pages/about';
import Jobs from './pages/jobs';
import Profile from './pages/profile';
import JobInfo from './pages/jobInfo';


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
      {
        path: '/jobs',
        element: <Jobs />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/jobs/:jobId',
        element: <JobInfo />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
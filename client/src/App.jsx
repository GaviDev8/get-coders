import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
// import "./style.css";

function App() {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div className="app-container d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
          <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
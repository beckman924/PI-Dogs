import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styles from "./App.css";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import BreedCreate from "./components/BreedCreate/BreedCreate";
import Detail from "./components/Detail/Detail";
import ErrorPage from "./components/ErrorPage/ErrorPage";
function App() {
  return (
    <div className={styles.App}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/dogs" element={<Home />}></Route>
          <Route path="/dog" element={<BreedCreate />}></Route>
          <Route path="/dogs/:id" element={<Detail />} />
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

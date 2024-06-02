import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import { MainContainer } from './Components/UI/MainContainer';
import { Dashboard } from "./Pages/Dashboard";

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
          <Route element={<MainContainer />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
      </Routes>
    </Router>
  );
}

export default App;
// import ReactDOM from "react-dom/client";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import App from "./App"; // Ensure this path is correct
// import "./index.css";

// const Main = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<App />} />
//       </Routes>
//     </Router>
//   );
// };

// ReactDOM.createRoot(document.getElementById("root")).render(<Main />);

/////////////////////////////////////// Latest //////////////////////////////////////////////////////////////////////////////////////////////////

import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App"; // Ensure this path is correct
import "./index.css";

const Main = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);

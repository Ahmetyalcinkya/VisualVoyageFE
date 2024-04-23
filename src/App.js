import { Route, Routes } from "react-router-dom";
import Authentication from "./Pages/Authentication/Authentication";
import Message from "./Pages/Message/Message";
import HomePage from "./Pages/Home/HomePage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/message" element={<Message />} />
        <Route path="/*" element={<Authentication />} />
      </Routes>
    </div>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import Authentication from "./Pages/Authentication/Authentication";
import Message from "./Pages/Message/Message";
import HomePage from "./Pages/Home/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserProfileAction } from "./Redux/Auth/auth.action";

function App() {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("vv-jwt");

  useEffect(() => {
    dispatch(getUserProfileAction(jwt));
  }, [jwt]);
  return (
    <div>
      <Routes>
        <Route
          path="/*"
          element={auth.user ? <HomePage /> : <Authentication />}
        />
        <Route path="/message" element={<Message />} />
        <Route path="/*" element={<Authentication />} />
      </Routes>
    </div>
  );
}

export default App;

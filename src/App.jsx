import { useEffect } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import AppLayout from "./component/AppLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const App = () => {
  // const [Loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.authStatus);

  useEffect(() => {
    // setLoader(true);
    authStatus ? navigate("/readblog") : navigate("/login");
  }, []);

  return (
    <>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

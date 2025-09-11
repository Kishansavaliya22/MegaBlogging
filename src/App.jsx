import { useEffect } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import AppLayout from "./component/AppLayout";

const App = () => {
  // const [Loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.authStatus);

  useEffect(() => {
    // setLoader(true);
    authStatus ? navigate("/readblog") : navigate("/");
  }, [authStatus, navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}></Route>
      </Routes>
    </>
  );
};

export default App;

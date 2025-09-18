import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./component/AppLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import appwriteAuth from "./appwrite/appwriteAuth";
import { storeLogin, storeLogout } from "./store/authSlice";
import BlogPost from "./pages/BlogPost";
import Post from "./pages/AddPost";
import EditPost from "./pages/EditPost";
import AddPost from "./pages/AddPost";

const App = () => {
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // setLoader(true);
    appwriteAuth
      .getCurrentUser()
      .then((userData) => {
        // console.log(userData);

        if ("type" in userData) {
          dispatch(storeLogout());
        } else {
          dispatch(storeLogin(userData));
        }
      })
      .finally(() => setLoader(false));
  }, [dispatch]);

  return !loader ? (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="readblog" element={<BlogPost />}>
          <Route path=":id" element={<Post />} />
          <Route path=":id/edit" element={<EditPost />} />
        </Route>
        <Route path="addpost" element={<AddPost />} />
      </Route>
    </Routes>
  ) : null;
};

export default App;

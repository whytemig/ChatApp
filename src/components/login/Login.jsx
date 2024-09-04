import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, database } from "../../library/firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "../../library/upload";

const Login = () => {
  const [avatar, setAvatar] = useState({ file: null, url: "" });
  const [loading, setLoading] = useState(false);

  //function to set Avatar
  function handleAvatar(e) {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0] || "https://avatar.iran.liara.run/public/43",
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    setLoading(true);
    const { username, email, password } = Object.fromEntries(formData);

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      //image upload
      const imgUrl = await upload(avatar.file);

      await setDoc(doc(database, "users", response.user.uid), {
        username,
        email,
        avatar: imgUrl,
        id: response.user.uid, // <- fixed typo here (response.user.uid)
        block: [],
      });
      await setDoc(
        doc(database, "userchats", response.user.uid), // <- corrected this part
        {
          chats: [],
        }
      );
      toast.success("Account Created!");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Welcome Back!!");
    } catch (error) {
      console.log(error);
      toast.error("Error: Invalid Credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login">
      {/* LOGIN SIDE */}
      <div className="items">
        <h2>Welcome to Cringe</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Enter your Email" name="email" />
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
          />
          <button type="submit" disabled={loading}>
            {loading ? "Loading.." : "Login"}
          </button>
        </form>
      </div>
      {/* LINE SEPARATOR */}
      <div className="line"></div>
      {/* SIGN UP SIDE */}
      <div className="items">
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="file">
            Upload an Image
            <img
              src={avatar.url || "https://avatar.iran.liara.run/public/43"}
              alt=""
            />
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleAvatar}
          />
          <input type="text" placeholder="Enter a Username" name="username" />
          <input type="text" placeholder="Enter your Email" name="email" />
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
          />
          <button type="submit" disabled={loading}>
            {loading ? "Loading.." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
const Login = () => {
  const [avatar, setAvatar] = useState({ file: null, url: "" });

  //function to set Avatar
  function handleAvatar(e) {
    console.log(e.target.files[0]);

    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  }

  function handleLogin(e) {
    e.preventDefault();
    toast.warn("hello");
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
          <button type="submit">Login</button>
        </form>
      </div>
      {/* LINE SEPARATOR */}
      <div className="line"></div>
      {/* SIGN UP SIDE */}
      <div className="items">
        <h2>Create an Account</h2>
        <form>
          <label htmlFor="file">
            Upload an Image
            <img
              src={
                avatar?.url
                  ? avatar?.url
                  : "https://avatar.iran.liara.run/public/43"
              }
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
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

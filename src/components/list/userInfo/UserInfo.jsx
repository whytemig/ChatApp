import "../userInfo/userinfo.css";
import { FaGithub } from "react-icons/fa";

function UserInfo() {
  return (
    <div className="userinfo">
      <div className="users">
        <img src="https://avatar.iran.liara.run/public/43" alt="" />
        <h2>Miguel Black</h2>
      </div>
      <div className="icons">
        <FaGithub size={24} />
      </div>
    </div>
  );
}

export default UserInfo;

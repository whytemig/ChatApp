import { useUserStore } from "../../../library/useStore";
import "../userInfo/userinfo.css";
import { FaGithub } from "react-icons/fa";

function UserInfo() {
  const { user } = useUserStore();

  return (
    <div className="userinfo">
      <div className="users">
        <img
          src={user?.avatar || "https://avatar.iran.liara.run/public/43"}
          alt=""
        />
        <h2>{user.username}</h2>
      </div>
      <div className="icons">
        <FaGithub size={24} />
      </div>
    </div>
  );
}

export default UserInfo;

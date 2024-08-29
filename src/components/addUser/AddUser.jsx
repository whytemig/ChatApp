import "./addUser.css";
const AddUser = () => {
  return (
    <div className="addUser">
      <form id="modal-form">
        <input
          type="text"
          className="modalInput"
          name="username"
          placeholder="Enter Username..."
        />
        <button id="modal-btn">Search</button>
      </form>
      <div className="aUser">
        <div className="userDetails">
          <img
            className="userAvatar"
            src="https://avatar.iran.liara.run/public/43"
            alt="user avatar"
          />
          <span className="userName">Jon Doe</span>
        </div>
        <button id="addbtn">Add User</button>
      </div>
    </div>
  );
};

export default AddUser;

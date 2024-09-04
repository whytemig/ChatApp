import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import "./addUser.css";
import { database } from "../../library/firebase";
import { useState } from "react";
import { useUserStore } from "../../library/useStore";

const AddUser = () => {
  const [user, setUser] = useState(null);
  const { user: userFromAuth } = useUserStore();

  async function handleSearch(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");

    try {
      //query method
      const userRef = collection(database, "users");
      const q = query(userRef, where("username", "==", username));
      //get the data
      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data());
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAddUser() {
    const chatRef = collection(database, "chats");
    const userChatsRef = collection(database, "userchats");
    try {
      const newChatRef = doc(chatRef);

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatsRef, userFromAuth?.id), {
        chats: arrayUnion({
          chatId: newChatRef?.id,
          lastMessage: "",
          receiverId: userFromAuth?.id,
          updatedat: Date.now(),
        }),
      });
      await updateDoc(doc(userChatsRef, userFromAuth?.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: userFromAuth?.id,
          updatedat: Date.now(),
        }),
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="addUser">
      <form id="modal-form" onSubmit={handleSearch}>
        <input
          type="text"
          className="modalInput"
          name="username"
          placeholder="Enter Username..."
        />
        <button id="modal-btn">Search</button>
      </form>
      {user ? (
        <div className="aUser">
          <div className="userDetails">
            <img
              className="userAvatar"
              src={user.avatar || "https://avatar.iran.liara.run/public/43"}
              alt="user avatar"
            />
            <span className="userName">{user?.username}</span>
          </div>
          <button id="addbtn" onClick={handleAddUser}>
            Add User
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default AddUser;

import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../library/chatStore";
import { auth, database } from "../../library/firebase";
import { useUserStore } from "../../library/useStore";
import "./detail.css";
import { FaArrowAltCircleDown } from "react-icons/fa";

const Detail = () => {
  const { user } = useUserStore();
  const { aUser, isReceiverBlocked, isCurrentUserBlocked, changeBlock } =
    useChatStore();

  //block function
  async function handleBlock() {
    if (!aUser) return;

    const userDocRef = doc(database, "users", user.id);
    try {
      await updateDoc(userDocRef, {
        block: isReceiverBlocked
          ? arrayRemove(aUser?.id)
          : arrayUnion(aUser?.id),
      });
      changeBlock();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="detail">
      <div className="user">
        <img
          src={aUser?.avatar || "https://avatar.iran.liara.run/public/43"}
          alt=""
        />
        <h2>{aUser?.username}</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
          accusantium provident sit ea quas, laboriosam natus ullam vel officia
          suscipit.
        </p>
      </div>
      <div className="info">
        {/* <div className="option">
          <div className="title">
            <span>Shared Pictures</span>
            <FaArrowAltCircleDown size={25} cursor={"pointer"} />
          </div>
          <div className="photos">
            <div className="photoItem">
              <img src="https://picsum.photos/id/237/200" alt="" />
              <span>Photo_Name.png</span>
            </div>
          </div>
        </div> */}
      </div>
      <div className="btns">
        <button className="block" onClick={handleBlock}>
          {isCurrentUserBlocked
            ? "You are Blocked"
            : isReceiverBlocked
            ? "User Blocked"
            : "Block"}
        </button>
        <button className="logout" onClick={() => auth.signOut()}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Detail;

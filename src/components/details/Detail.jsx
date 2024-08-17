import "./detail.css";
import { FaArrowAltCircleDown } from "react-icons/fa";

const Detail = () => {
  return (
    <div className="detail">
      <div className="user">
        <img src="https://avatar.iran.liara.run/public/43" alt="" />
        <h2>User Name</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
          accusantium provident sit ea quas, laboriosam natus ullam vel officia
          suscipit.
        </p>
      </div>
      <div className="info">
        <div className="option">
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
        </div>
      </div>
      <div className="btns">
        <button>Block</button>
      </div>
    </div>
  );
};

export default Detail;

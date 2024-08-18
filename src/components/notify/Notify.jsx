import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = () => {
  return (
    <div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default notify;

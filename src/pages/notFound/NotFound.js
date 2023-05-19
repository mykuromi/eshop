import { Link } from "react-router-dom";
import styles from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <div className={styles["not-found"]}>
      <div>
        <h2>404</h2>
        <p>Oops, pages not found.</p>
        <button className="--btn">
          <Link to="/">&larr; Back to home</Link>
        </button>
      </div>
    </div>
  );
};

export default NotFound;

import { useSelector } from "react-redux";
import styles from "./ReviewProducts.module.scss";
import { selectProducts } from "../../redux/slice/productSlice";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { selectUserID, selectUserName } from "../../redux/slice/authSlice";
import Card from "../card/Card";
import StarsRating from "react-star-rate";

const ReviewProducts = () => {
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  const { id } = useParams();
  const products = useSelector(selectProducts);
  const userID = useSelector(selectUserID);
  const userName = useSelector(selectUserName);

  const product = products.find((item) => item.id === id);
  const submitReview = (e) => {
    e.preventDefault();
  };

  return (
    <section>
      <div className={`container ${styles.review}`}>
        <h2>Review products</h2>
        <p>
          <b>Product name: </b> {product.name}
        </p>
        <img src={product.imageURL} alt={product.name} />
        <Card cardClass={styles.card}>
          <form onSubmit={(e) => submitReview(e)}>
            <label>Rating:</label>
            <StarsRating
              value={rate}
              onChange={(rate) => {
                setRate(rate);
              }}
            />
            <label>Review</label>
            <textarea
              value={review}
              required
              onChange={(e) => setReview(e.target.value)}
              cols="30"
              rows="10"
            ></textarea>
            <button type="submit" className="--btn --btn-primary">
              Submit review
            </button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default ReviewProducts;

import { Link } from "react-router-dom";
import styles from "./CheckoutSuccess.module.scss";

const CheckoutSuccess = () => {
  return (
    <section>
      <div className="container">
        <h2>Checkout successful</h2>
        <p>Thank you for your purchase.</p>
        <br />
        <Link to="/order-history">
          <button className="--btn --btn-primary">View order status</button>
        </Link>
      </div>
    </section>
  );
};

export default CheckoutSuccess;

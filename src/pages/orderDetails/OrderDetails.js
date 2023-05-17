import { Link, useParams } from "react-router-dom";
import styles from "./OrderDetails.module.scss";
import spinnerImg from "../../assets/spinner.jpg";
import useFetchDocument from "../../customHooks/useFetchDocument";
import { useEffect, useState } from "react";

const OrderDetails = () => {
  const [order, setorder] = useState(null);
  const { id } = useParams();
  const { document } = useFetchDocument("orders", id);

  useEffect(() => {
    setorder(document);
  }, [document]);

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Order details</h2>
        <div>
          <Link to="/order-history">&larr; Back to orders</Link>
        </div>
        <br />
        {order === null ? (
          <img src={spinnerImg} alt="Loading..." style={{ width: "50px" }} />
        ) : (
          <>
            <p>
              <b>Order ID</b> {order.id}
            </p>
            <p>
              <b>Order amount</b> {order.orderAmount}
            </p>
            <p>
              <b>Order status</b> {order.orderStatus}
            </p>
            <br />
            <table>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {order.cartItems.map((cart, index) => {
                  const { id, name, price, imageURL, cartQuantity } = cart;
                  return (
                    <tr key={id}>
                      <td>
                        <b>{index + 1}</b>
                      </td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img
                          src={imageURL}
                          alt={name}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>${price}</td>
                      <td>{cartQuantity}</td>
                      <td>${(price * cartQuantity).toFixed(2)}</td>
                      <td className={styles.icons}>
                        <Link to={`/review-product/${id}`}>
                          <button className="--btn --btn-primary">
                            Review product
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </section>
  );
};

export default OrderDetails;

import useFetchCollection from "../../customHooks/useFetchCollection";
import styles from "./OrderHistory.module.scss";

const OrderHistory = () => {
  const { data, isLoading } = useFetchCollection("orders");

  return (
    <div>
      <h2>Order history</h2>
    </div>
  );
};

export default OrderHistory;

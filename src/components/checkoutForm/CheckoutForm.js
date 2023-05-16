import styles from "./CheckoutForm.module.scss";
import spinnerImg from "../../assets/spinner.jpg";
import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Card from "../card/Card";
import CheckoutSummary from "../checkoutSummary/CheckoutSummary";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      // not loaded
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <>
      <section>
        <div className={`container ${styles.checkout}`}>
          <h2>Checkout</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <Card cardClass={styles.card}>
                <CheckoutSummary />
              </Card>
            </div>
            <div>
              <Card cardClass={`${styles.card} ${styles.pay}`}>
                <h3>Stripe checkout</h3>
                <PaymentElement id={styles["payment-element"]} />
                <button
                  disabled={isLoading || !stripe || !elements}
                  id="submit"
                  className={styles.button}
                >
                  <span id="button-text">
                    {isLoading ? (
                      <img
                        src={spinnerImg}
                        alt="Loading..."
                        style={{ width: "20px" }}
                      />
                    ) : (
                      "Pay now"
                    )}
                  </span>
                </button>
                {/* Show any error or success messages */}
                {message && <div id={styles["payment-message"]}>{message}</div>}
              </Card>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default CheckoutForm;

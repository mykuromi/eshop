import { useParams } from "react-router-dom";
import styles from "./ProductDetails.module.scss";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";

const ProductDetails = () => {
  const { id } = useParams();

  const [proudct, setProduct] = useState(null);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log(docSnap.data());
    } else {
    }
  };

  return (
    <div>
      <h2>ProductDetails</h2>
    </div>
  );
};

export default ProductDetails;

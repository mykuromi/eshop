import { useState } from "react";
import Card from "../../card/Card";
import styles from "./AddProduct.module.scss";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";

const AddProduct = () => {
  const categories = [
    { id: 1, name: "Laptop" },
    { id: 2, name: "Electronics" },
    { id: 3, name: "Fashion" },
    { id: 4, name: "Phone" },
  ];

  const [product, setProduct] = useState({
    name: "",
    imageURL: "",
    price: 0,
    category: "",
    brand: "",
    desc: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const storage = getStorage();
    const stroageRef = ref(storage, `eshop/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(stroageRef, file);
  };

  const addProduct = (e) => {
    e.preventDefault();
    console.log(product);
  };

  return (
    <div className={styles.product}>
      <h1>Add New Product</h1>
      <form onSubmit={addProduct}>
        <Card cardClass={styles.card}>
          <label>Product Name:</label>
          <input
            type="text"
            placeholder="Product Name"
            required
            name="name"
            value={product.name}
            onChange={(e) => handleInputChange(e)}
          />

          <label>Product Image:</label>
          <Card cardClass={styles.group}>
            <div className={styles.progress}>
              <div className={styles["progress-bar"]} style={{ width: "50%" }}>
                Uploading 50%
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              placeholder="Product Image"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />
            <input
              type="text"
              // required
              placeholder="Image URL"
              name="imageURL"
              value={product.imageURL}
              disabled
            />
          </Card>

          <label>Product Price:</label>
          <input
            type="text"
            placeholder="Product Price"
            required
            name="price"
            value={product.price}
            onChange={(e) => handleInputChange(e)}
          />

          <label>Product Category:</label>
          <select
            required
            name="category"
            value={product.category}
            onChange={(e) => handleInputChange(e)}
          >
            <option value="" disable>
              -- Choose Product Category --
            </option>
            {categories.map((cat) => {
              return (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              );
            })}
          </select>

          <label>Product Company/Brand:</label>
          <input
            type="text"
            placeholder="Product Brand"
            required
            name="brand"
            value={product.brand}
            onChange={(e) => handleInputChange(e)}
          />

          <label>Product Description:</label>
          <textarea
            name="desc"
            required
            value={product.desc}
            onChange={(e) => handleInputChange(e)}
            cols="30"
            rows="10"
          ></textarea>

          <button className="--btn --btn-primary">Save Product</button>
        </Card>
      </form>
    </div>
  );
};

export default AddProduct;

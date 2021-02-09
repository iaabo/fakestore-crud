import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

import Product from "./Product";
import AddProduct from "./AddProduct";
import "./Product.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Fetch Product Data
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((response) => setProducts(response));
  }, []);

  //Delete Product
  const handleRemove = (id) =>
    setProducts(products.filter((product) => product.id !== id));

  //Add Product
  const addProduct = (newProduct) => {
    setProducts([{ ...newProduct, id: uuidv4() }, ...products]);
    console.log(...products);
  };

  //Edit Product

  const editProduct = (e, editedProduct) => {
    e.preventDefault();
    const newProductList = products.map((product) =>
      product.id === editedProduct.id ? editedProduct : product
    );
    setProducts(newProductList);
  };

  return (
    <div>
      <div className="container">
        <h1 className="title">Store Inventory</h1>

        {/*   Add Product Modal when clicking the Add Product button */}

        <Button className="button" variant="secondary" onClick={handleShow}>
          Add Product
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton className="product-title">
            Add Product
          </Modal.Header>
          <Modal.Body>
            <AddProduct addProduct={addProduct} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Go Back to Inventory
            </Button>
          </Modal.Footer>
        </Modal>

        {/*  Counter for the number of products in inventory */}
        <p>
          <b>Total:</b> {products.length} products
        </p>
      </div>

      {/* List of Products */}

      <div className="container">
        <Table>
          <tr>
            <th style={{ width: "150px" }}>#</th>
            <th style={{ width: "200px" }}>Title</th>
            <th style={{ width: "100px" }}>Category</th>
            <th style={{ width: "100px" }}>Price</th>
            <th style={{ width: "100px" }}>Image</th>
            <th style={{ width: "50px" }}>Check</th>
            <th style={{ width: "50px" }}>Update</th>
            <th style={{ width: "50px" }}>Delete</th>
          </tr>
        </Table>
        {products.map((product) => (
          <Product
            {...product}
            key={product.id}
            handleRemove={handleRemove}
            editProduct={editProduct}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;

import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "react-bootstrap";
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

  return (
    <div>
      <div className="container">
        <h1 className="title">Store Inventory</h1>
        <Button className="button" variant="secondary" onClick={handleShow}>
          Add Product
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton className="product-title">
            Add Product
          </Modal.Header>
          <Modal.Body>
            <AddProduct />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Return
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Add Product
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className="container">
        <Table>
          <tr>
            <th style={{ width: "20px" }}>#</th>
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
          <Product {...product} key={product.id} handleRemove={handleRemove} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;

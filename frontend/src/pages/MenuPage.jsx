// src/pages/MenuPage.jsx

import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, Row, Col, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import { CartContext } from '../components/CartContext';
import API from '../utils/api';
import '../styles/Menu.css';

export default function MenuPage() {
  const { category } = useParams(); // e.g., breakfast, snacks
  const userType = localStorage.getItem("userType");
  const { addToCart } = useContext(CartContext);

  const [items, setItems] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", price: "", image: "", _id: "" });

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/menu/${category}`);
        setItems(res.data);
        setQuantities(res.data.map(() => 1));
      } catch (err) {
        console.error("Menu fetch error:", err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [category]);

  // Customer interactions
  const increment = (i) => setQuantities(q => q.map((qty, idx) => idx === i ? qty + 1 : qty));
  const decrement = (i) => setQuantities(q => q.map((qty, idx) => idx === i && qty > 1 ? qty - 1 : qty));
  const add = (item, i) => addToCart({ ...item, quantity: quantities[i] });

  // Admin actions
  const handleDelete = async (_id) => {
    try {
      await API.delete(`/menu/${_id}`);
      const res = await API.get(`/menu/${category}`);
      setItems(res.data);
      setQuantities(res.data.map(() => 1));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const openEditModal = (item) => {
    setEditForm(item);
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      await API.put(`/menu/${editForm._id}`, editForm);
      setShowModal(false);
      const res = await API.get(`/menu/${category}`);
      setItems(res.data);
      setQuantities(res.data.map(() => 1));
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-capitalize">{category.replace("-", " ")} Menu</h2>

      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : items.length === 0 ? (
        <Alert variant="info">No items found in this category.</Alert>
      ) : (
        <Row>
          {items.map((item, i) => (
            <Col md={4} key={item._id} className="mb-4">
              <Card>
                <Card.Img variant="top" src={item.image} alt={item.name} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>Price: ₹{item.price}</Card.Text>

                  {userType === "admin" ? (
                    <>
                      <Button variant="warning" onClick={() => openEditModal(item)}>Edit</Button>{" "}
                      <Button variant="danger" onClick={() => handleDelete(item._id)}>Delete</Button>
                    </>
                  ) : (
                    <>
                      <div className="d-flex align-items-center">
                        <Button variant="secondary" onClick={() => decrement(i)}>-</Button>
                        <span className="mx-2">{quantities[i]}</span>
                        <Button variant="secondary" onClick={() => increment(i)}>+</Button>
                      </div>
                      <Button variant="primary" className="mt-2" onClick={() => add(item, i)}>
                        Add to Cart
                      </Button>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* 🛠 Modal for Admin */}
      {userType === "admin" && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton><Modal.Title>Edit Item</Modal.Title></Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Control
                className="mb-3"
                placeholder="Name"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              />
              <Form.Control
                className="mb-3"
                placeholder="Price"
                type="number"
                value={editForm.price}
                onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
              />
              <Form.Control
                className="mb-3"
                placeholder="Image URL"
                value={editForm.image}
                onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
              />
              <Button variant="success" onClick={handleSave}>Save</Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}
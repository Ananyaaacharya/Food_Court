// MenuPage.jsx (FINAL update with image fallback and display handling)

import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Row, Col, Modal, Form, Spinner } from 'react-bootstrap';
import { CartContext } from '../components/CartContext';
import API from '../utils/api';
import VendorNavbar from "../components/VendorNavbar";
import CustomerNavbar from "../components/CustomerNavbar";
import Swal from 'sweetalert2';
import '../styles/MenuPage.css';

export default function MenuPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");
  const { addToCart } = useContext(CartContext);

  const [items, setItems] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editForm, setEditForm] = useState({ name: "", price: "", _id: "" });
  const [showEditModal, setShowEditModal] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newItemForm, setNewItemForm] = useState({ name: "", price: "", category, imageFile: null });

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/menu/${category}`);
        setItems(res.data);
        setQuantities(res.data.map(() => 1));
      } catch (err) {
        console.error("Fetch error:", err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [category]);

  const increment = (i) => setQuantities(q => q.map((qty, idx) => idx === i ? qty + 1 : qty));
  const decrement = (i) => setQuantities(q => q.map((qty, idx) => idx === i && qty > 1 ? qty - 1 : qty));

  const add = (item, i) => {
    addToCart({ ...item, quantity: quantities[i] });
    Swal.fire({
      icon: 'success',
      title: 'Added to Cart!',
      text: 'Go and check your cart.',
      showCancelButton: true,
      confirmButtonText: 'Go to Cart',
      cancelButtonText: 'Stay Here',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/cart');
      }
    });
  };

  const openEditModal = (item) => {
    setEditForm({ name: item.name, price: item.price, _id: item._id });
    setShowEditModal(true);
  };

  const handleEditSave = async () => {
    try {
      await API.put(`/menu/${editForm._id}`, {
        name: editForm.name,
        price: editForm.price
      });
      setShowEditModal(false);
      const res = await API.get(`/menu/${category}`);
      setItems(res.data);
      setQuantities(res.data.map(() => 1));
    } catch (err) {
      console.error("Edit error:", err);
    }
  };

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

  const handleAddNewItem = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newItemForm.name);
      formData.append("price", newItemForm.price);
      formData.append("category", newItemForm.category);
      formData.append("image", newItemForm.imageFile);

      await API.post("/menu", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setShowAddModal(false);
      setNewItemForm({ name: "", price: "", category, imageFile: null });

      const res = await API.get(`/menu/${category}`);
      setItems(res.data);
      setQuantities(res.data.map(() => 1));
    } catch (err) {
      console.error("Add item error:", err);
    }
  };

  return (
    <>
      {userType === "admin" ? <VendorNavbar /> : <CustomerNavbar />}

      <div className="menu-container container-fluid">
        <h2 className="mb-4 text-capitalize">{category.replace("-", " ")} Menu</h2>

        {loading ? (
          <div className="text-center"><Spinner animation="border" /></div>
        ) : (
          <Row>
            {items.map((item, i) => (
              <Col md={4} key={item._id} className="mb-4">
                <div className="position-relative">
                  {userType === "admin" && (
                    <div className="admin-actions">
                      <Button variant="warning" size="sm" onClick={() => openEditModal(item)} className="me-2">✏️ Edit</Button>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(item._id)}>🗑️ Delete</Button>
                    </div>
                  )}
                  <Card>
                    <Card.Img
                      variant="top"
                      src={
                        item.image
                          ? `http://localhost:5000${item.image}`
                          : 'https://via.placeholder.com/300x250?text=No+Image'
                      }
                      alt={item.name}
                      style={{ height: '250px', objectFit: 'cover' }}
                    />
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>Price: ₹{item.price}</Card.Text>
                      {userType === "customer" && (
                        <>
                          <div className="d-flex align-items-center justify-content-center">
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
                </div>
              </Col>
            ))}
          </Row>
        )}

        {userType === "admin" && (
          <Button
            variant="success"
            className="position-fixed bottom-0 end-0 m-4 rounded-circle"
            style={{ width: '60px', height: '60px', fontSize: '24px' }}
            onClick={() => setShowAddModal(true)}
          >
            +
          </Button>
        )}

        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton><Modal.Title>Edit Item</Modal.Title></Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Control className="mb-3" placeholder="Name" value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
              <Form.Control className="mb-3" placeholder="Price" type="number" value={editForm.price}
                onChange={(e) => setEditForm({ ...editForm, price: e.target.value })} />
              <Button variant="success" onClick={handleEditSave}>Save</Button>
            </Form>
          </Modal.Body>
        </Modal>

        <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
          <Modal.Header closeButton><Modal.Title>Add New Item</Modal.Title></Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Control className="mb-3" placeholder="Name" value={newItemForm.name}
                onChange={(e) => setNewItemForm({ ...newItemForm, name: e.target.value })} />
              <Form.Control className="mb-3" placeholder="Price" type="number" value={newItemForm.price}
                onChange={(e) => setNewItemForm({ ...newItemForm, price: e.target.value })} />
              <Form.Group className="mb-3">
                <Form.Label>Upload Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewItemForm({ ...newItemForm, imageFile: e.target.files[0] })}
                />
              </Form.Group>
              <Button variant="primary" onClick={handleAddNewItem}>Add Item</Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

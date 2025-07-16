// src/pages/CartPage.jsx
import React, { useContext } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { CartContext } from '../components/CartContext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    // Redirect to profile to continue with payment
    navigate('/profile');
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty. Browse the menu to add items.</p>
      ) : (
        <>
          <Row>
            {cartItems.map((item, index) => (
              <Col md={4} key={index} className="mb-4">
                <Card>
                  <Card.Img
                    variant="top"
                    src={
                      item.image
                        ? item.image.startsWith('/')
                          ? `http://localhost:5000${item.image}`
                          : item.image
                        : '/default.jpg'
                    }
                    alt={item.name}
                    style={{ height: '250px', objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>Price: ₹{item.price}</Card.Text>
                    <Card.Text>Quantity: {item.quantity}</Card.Text>
                    <Card.Text>Total: ₹{item.price * item.quantity}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <h3 className="mt-4">Grand Total: ₹{totalPrice}</h3>

          <div className="mt-3">
            <Button variant="success" onClick={handlePlaceOrder}>
              ✅ Place Order
            </Button>
            <Button
              variant="secondary"
              className="ms-2"
              onClick={clearCart}
            >
              🧹 Clear Cart
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;

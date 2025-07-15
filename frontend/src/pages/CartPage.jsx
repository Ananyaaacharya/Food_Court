import React, { useContext } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { CartContext } from '../components/CartContext'; 

const CartPage = () => {
  const { cartItems, clearCart } = useContext(CartContext); 

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Cart</h2>
      <Row>
        {cartItems.map((item, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card>
              <Card.Img variant="top" src={item.image} alt={item.name} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>Price: Rs.{item.price}</Card.Text>
                <Card.Text>Quantity: {item.quantity}</Card.Text>
                <Card.Text>Total: Rs.{item.price * item.quantity}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <h3>Total Price: Rs.{totalPrice}</h3>
      <Button variant="primary" onClick={() => alert('Order placed successfully!')}>Place Order</Button>
      <Button variant="secondary" className="ml-2" onClick={clearCart}>Clear Cart</Button>
    </div>
  );
};

export default CartPage;

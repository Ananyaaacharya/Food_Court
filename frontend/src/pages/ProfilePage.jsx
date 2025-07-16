// ProfilePage.jsx (restrict token generation to once)

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import { Card, Button, Form, Container, Alert } from 'react-bootstrap';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [paymentMode, setPaymentMode] = useState('');
  const [token, setToken] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const tokenValue = localStorage.getItem('token');
        if (!tokenValue) {
          console.warn("No token found. Redirecting to login.");
          navigate('/login');
          return;
        }

        console.log("Token in ProfilePage:", tokenValue);

        const res = await API.get('/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${tokenValue}`
          }
        });

        console.log("User profile data:", res.data);
        setUser(res.data);
      } catch (err) {
        console.error("Profile fetch failed:", err);
        navigate('/login');
      }
    };
    fetchProfile();
  }, [navigate]);

  const generateToken = async () => {
    if (token !== null) return; // 🔐 Prevent multiple generations

    const randomToken = Math.floor(1000 + Math.random() * 9000);
    setToken(randomToken);
    setConfirmed(true);
    setShowSuccess(false);

    try {
      await API.post('/api/profile/payment', {
        paymentMode,
        token: randomToken
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setShowSuccess(true);
    } catch (err) {
      console.error("Failed to save token:", err);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Place Order - User Profile</h2>
      {user ? (
        <Card className="p-4">
          <h5>Name: {user.fullName}</h5>
          <h6>Email: {user.email}</h6>
          <h6>Role: {user.userType}</h6>

          <Form.Group className="mt-4">
            <Form.Label>Select Payment Mode</Form.Label>
            <Form.Select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)} disabled={token !== null}>
              <option value="">-- Choose --</option>
              <option value="UPI">UPI</option>
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
            </Form.Select>
          </Form.Group>

          <Button className="mt-3" onClick={generateToken} disabled={!paymentMode || token !== null}>
            Confirm & Generate Token
          </Button>

          {token && (
            <Alert variant="info" className="mt-4">
              <strong>Your Order Token:</strong> <span className="fs-4">{token}</span>
            </Alert>
          )}

          {showSuccess && (
            <Alert variant="success" className="mt-3">
              ✅ Token generated and saved successfully!
            </Alert>
          )}

        </Card>
      ) : (
        <p>Loading user profile...</p>
      )}
    </Container>
  );
}

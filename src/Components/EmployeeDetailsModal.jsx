import React from "react";
import { Modal, Button, Row, Col, Image } from "react-bootstrap";
export default function EmployeeDetailsModal({ show, onHide, user, onShortlist }) {
  if (!user) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {user.firstName} {user.lastName} {user.company?.title && `- ${user.company.title}`}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row>
          <Col md={3} className="text-center">
            <Image
              src={user.image}
              roundedCircle
              alt={`${user.firstName} ${user.lastName}`}
              fluid
            />
          </Col>
          <Col md={9}>
            <p><strong>Age:</strong> {user.age}</p>
            <p><strong>Gender:</strong> {user.gender}</p>
            <p><strong>Birth Date:</strong> {user.birthDate}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Address:</strong> {user.address.address}, {user.address.city}, {user.address.state}, {user.address.country} - {user.address.postalCode}</p>
            <p><strong>Company:</strong> {user.company.name}, {user.company.department}, {user.company.title}</p>
            <p><strong>University:</strong> {user.university}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Bank:</strong> {user.bank.cardType} - {user.bank.cardNumber} (Exp: {user.bank.cardExpire})</p>
            <p><strong>Crypto:</strong> {user.crypto.coin}, {user.crypto.wallet}, {user.crypto.network}</p>
            <p><strong>IP:</strong> {user.ip}</p>
            <p><strong>MAC Address:</strong> {user.macAddress}</p>
            <p><strong>User Agent:</strong> {user.userAgent}</p>
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button 
        variant="primary" 
        onClick={() => {
            onShortlist(user);
            onHide();  // ✅ closes modal
        }}
        >
        Shortlist
        </Button>        
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

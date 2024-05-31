import React from "react";
import { Alert } from "react-bootstrap";

const CustomAlert = ({ type, title, messages, visible, onClose }) => {
  return (
    <>
      {visible && (
        <Alert
          style={{ width: "400px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
          variant={type}
          onClose={onClose}
          dismissible
        >
          <Alert.Heading>{title}</Alert.Heading>
          {messages.map((message) => (
            <p key={message}>{message}</p>
          ))}
        </Alert>
      )}
    </>
  );
};

export default CustomAlert;

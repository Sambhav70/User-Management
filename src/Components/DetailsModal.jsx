import React from "react";
import ModalDialog, {
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalBody,
} from "@atlaskit/modal-dialog";
import Button, { ButtonGroup } from "@atlaskit/button";

// Safe getter for deeply nested properties
const getSafeValue = (obj, path, defaultValue = "-") => {
  try {
    if (!obj) return defaultValue;
    const keys = path.split(".");
    let current = obj;
    for (const key of keys) {
      if (current == null || typeof current !== "object") {
        return defaultValue;
      }
      current = current[key];
    }
    return current == null || current === "" ? defaultValue : current;
  } catch {
    return defaultValue;
  }
};

export default function DetailsModal({ user, onClose, onShortlist }) {
  if (!user) return null;

  return (
    <ModalDialog onClose={onClose} width="large">
      <ModalHeader>
        <ModalTitle>
          {`${getSafeValue(user, "firstName")} ${getSafeValue(
            user,
            "lastName"
          )}`}{" "}
          {getSafeValue(user, "company.title") !== "-" &&
            `- ${getSafeValue(user, "company.title")}`}
        </ModalTitle>
      </ModalHeader>

      <ModalBody>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "12px",
            fontSize: "14px",
            lineHeight: "1.5",
          }}
        >
          {/* Personal Info */}
          <div>
            <h4 style={{ margin: "0 0 8px 0", color: "#6B778C" }}>
              Personal Information
            </h4>
            <p><strong>Age:</strong> {getSafeValue(user, "age")}</p>
            <p><strong>Gender:</strong> {getSafeValue(user, "gender")}</p>
            <p><strong>Username:</strong> {getSafeValue(user, "username")}</p>
            <p><strong>Birthdate:</strong> {getSafeValue(user, "birthDate")}</p>
            <p><strong>Blood Group:</strong> {getSafeValue(user, "bloodGroup")}</p>
            <p><strong>Eye Color:</strong> {getSafeValue(user, "eyeColor")}</p>
            <p><strong>Height:</strong> {getSafeValue(user, "height")}</p>
            <p><strong>Weight:</strong> {getSafeValue(user, "weight")}</p>
            <p>
              <strong>Hair:</strong>{" "}
              {`${getSafeValue(user, "hair.color")} (${getSafeValue(
                user,
                "hair.type"
              )})`}
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{ margin: "0 0 8px 0", color: "#6B778C" }}>
              Contact Information
            </h4>
            <p><strong>Email:</strong> {getSafeValue(user, "email")}</p>
            <p><strong>Phone:</strong> {getSafeValue(user, "phone")}</p>
            <p>
              <strong>Address:</strong>{" "}
              {`${getSafeValue(user, "address.address")}, ${getSafeValue(
                user,
                "address.city"
              )}, ${getSafeValue(user, "address.state")} ${getSafeValue(
                user,
                "address.postalCode"
              )}`}
            </p>
          </div>

          {/* Professional & Education */}
          <div>
            <h4 style={{ margin: "0 0 8px 0", color: "#6B778C" }}>
              Professional & Education
            </h4>
            <p><strong>Company:</strong> {getSafeValue(user, "company.name")}</p>
            <p><strong>Title:</strong> {getSafeValue(user, "company.title")}</p>
            <p><strong>Department:</strong> {getSafeValue(user, "company.department")}</p>
            <p><strong>University:</strong> {getSafeValue(user, "university")}</p>
            <p><strong>Role:</strong> {getSafeValue(user, "role")}</p>
          </div>

          {/* Financial Info */}
          <div>
            <h4 style={{ margin: "0 0 8px 0", color: "#6B778C" }}>
              Financial Information
            </h4>
            <p>
              <strong>Bank:</strong>{" "}
              {`${getSafeValue(user, "bank.cardType")} - ${getSafeValue(
                user,
                "bank.cardNumber"
              )}`}
            </p>
            <p><strong>Currency:</strong> {getSafeValue(user, "bank.currency")}</p>
            <p><strong>IBAN:</strong> {getSafeValue(user, "bank.iban")}</p>
            <p>
              <strong>Crypto:</strong>{" "}
              {`${getSafeValue(user, "crypto.coin")} (${getSafeValue(
                user,
                "crypto.network"
              )})`}
            </p>
            <p><strong>Wallet:</strong> {getSafeValue(user, "crypto.wallet")}</p>
          </div>
        </div>
      </ModalBody>

      <ModalFooter>
        <ButtonGroup label="Modal actions">
          <Button
            appearance="primary"
            onClick={() => {
              onShortlist?.(user);
              onClose?.();
            }}
          >
            Shortlist
          </Button>
          <Button appearance="subtle" onClick={onClose}>
            Close
          </Button>
        </ButtonGroup>
      </ModalFooter>
    </ModalDialog>
  );
}

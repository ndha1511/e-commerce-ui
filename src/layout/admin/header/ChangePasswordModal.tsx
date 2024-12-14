import React, { useState } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import {
  useChangePasswordMutation,

} from "../../../services/auth.service";
import { Eye, EyeSlash } from "react-bootstrap-icons";
interface UserChange {
  user: string;
  show: boolean;
  onHide: () => void;
}

const ChangePasswordModal = ({ user, show, onHide }: UserChange) => {
  const [changePassword] = useChangePasswordMutation();

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = (field: string) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field as keyof typeof showPassword],
    });
  };

  const validatePassword = (password: string): boolean => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;

    return passwordRegex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = formData;

    if (!validatePassword(newPassword)) {
      alert(
        "Mật khẩu mới phải dài ít nhất 8 ký tự, chứa ít nhất một chữ in hoa, một chữ số và một ký tự đặc biệt."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Mật khẩu mới và nhập lại mật khẩu không khớp!");
      return;
    }

    try {
      await changePassword({
        email: user,
        oldPassword: oldPassword,
        newPassword: newPassword,
      }).unwrap();
      alert("Đổi mật khẩu thành công!");
      onHide();
    } catch (error) {
      alert("Có lỗi xảy ra khi đổi mật khẩu. Vui lòng thử lại.");
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Đổi mật khẩu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="oldPassword">
              <Form.Label>Mật khẩu cũ</Form.Label>
              <InputGroup>
                <Form.Control
                  className="no-shadow"
                  type={showPassword.oldPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu cũ"
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  required
                />
                <InputGroup.Text
                  onClick={() => togglePasswordVisibility("oldPassword")}
                  style={{ cursor: "pointer" }}
                >
                  {showPassword.oldPassword ? <EyeSlash /> : <Eye />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="newPassword">
              <Form.Label>Mật khẩu mới</Form.Label>
              <InputGroup>
                <Form.Control
                  className="no-shadow"
                  type={showPassword.newPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu mới"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                />
                <InputGroup.Text
                  onClick={() => togglePasswordVisibility("newPassword")}
                  style={{ cursor: "pointer" }}
                >
                  {showPassword.newPassword ? <EyeSlash /> : <Eye />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Nhập lại mật khẩu mới</Form.Label>
              <InputGroup>
                <Form.Control
                  className="no-shadow"
                  type={showPassword.confirmPassword ? "text" : "password"}
                  placeholder="Nhập lại mật khẩu mới"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <InputGroup.Text
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  style={{ cursor: "pointer" }}
                >
                  {showPassword.confirmPassword ? <EyeSlash /> : <Eye />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Button variant="primary" type="submit">
              Đổi mật khẩu
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ChangePasswordModal;

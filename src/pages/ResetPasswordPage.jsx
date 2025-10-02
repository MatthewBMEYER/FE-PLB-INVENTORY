import { useState } from "react";
import { useParams } from "react-router-dom";
import { resetPassword } from "../api/auth";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await resetPassword(token, newPassword);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Error Reset Password");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input type="password" placeholder="New Password" onChange={(e) => setNewPassword(e.target.value)}/>
        <button type="submit">Reset</button>
      </form>
    </div>
  );
}

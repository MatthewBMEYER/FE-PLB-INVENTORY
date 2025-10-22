import { useState } from "react";
import { forgetPassword } from "../api/auth";

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await forgetPassword(email);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Error Forget Password");
    }
  };

  return (
    <div>
      <h2>Forget Password</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
}

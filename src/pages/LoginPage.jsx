import { useState } from "react";
import { loginUser } from "../api/auth";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      alert(res.message);
    } catch (err) {
      alert(err.response?.data?.message || "Error Login");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })}/>
        <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })}/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

import { useState } from "react";
import { registerUser } from "../api/auth";

export default function RegisterPage() {
  const [form, setForm] = useState({ nama_user: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(form);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Error Register");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Nama" onChange={(e) => setForm({ ...form, nama_user: e.target.value })}/>
        <input type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })}/>
        <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })}/>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

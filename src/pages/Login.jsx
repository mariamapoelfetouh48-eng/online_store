
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../contexts/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      setError("");

      const response = await api.post("/auth/login", {
        email: email,
        password: password,
      });

      console.log(response.data);

      const token = response.data.token;

      localStorage.setItem("token", token);

      setUser(response.data.user);

      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  }

  return (
    <div>
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p>{error}</p>}

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;


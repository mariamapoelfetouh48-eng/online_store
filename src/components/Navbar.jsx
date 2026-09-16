
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  return (
    <nav>
      <h2>Online Store</h2>

      <div>
        <a href="/">Home</a>

        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <a href="/login">Login</a>
        )}

        <a href="/cart">
          Cart ({cart.length})
        </a>
      </div>
    </nav>
  );
}

export default Navbar;


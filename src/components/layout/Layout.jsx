import Navbar from "../Navbar";

function Layout({ children }) {
  return (
    <div>
      <Navbar />

      <main>
        {children}
      </main>

      <footer>
        Footer
      </footer>
    </div>
  );
}

export default Layout;
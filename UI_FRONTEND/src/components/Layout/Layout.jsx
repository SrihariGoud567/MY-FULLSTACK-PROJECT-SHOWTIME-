import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-black text-yellow-400">
      <Navbar />
      <main className="flex-grow px-6">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;

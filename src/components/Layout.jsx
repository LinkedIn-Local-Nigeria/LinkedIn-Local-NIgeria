import Footer from "./Footer";
import Navbar from "./NavBar";

const Layout = ({ children }) => {
  return (
    <>
      {" "}
      {/* Top padding to prevent navbar from overlapping */}
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;

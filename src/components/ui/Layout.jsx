import PropTypes from "prop-types";
import Footer from "../Footer";
import Navbar from "../NavBar";

const Layout = ({ children }) => {
  return (
    <>
      {/* Top padding to prevent navbar from overlapping */}
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

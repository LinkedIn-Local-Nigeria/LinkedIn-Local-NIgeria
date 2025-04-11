import { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { footerLinks } from "./constants/footerlinks";
import Button from "./ui/Button";
import Container from "./ui/Container";

const Footer = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subscribed:", formData);
    setFormData({ firstName: "", email: "" }); // Clear the form after submission is successful
  };

  return (
    <footer className="py-5 mt-10 text-gray-600 bg-[#F8FAFC] border-t md:px-16">
      <Container>
        {/* Newsletter Section */}
        <div className="p-6 mx-auto mb-16 rounded-md lg:p-16 max-w-7xl newsletter-bg-desktop newsletter-bg-mobile">
          <h4 className="pb-4 text-4xl font-semibold text-gray-100 font-poppins">
            Subscribe to our newsletter
          </h4>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-4 mt-5 lg:grid-cols-3"
            aria-label="NewsLetter Subscription Form"
          >
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              required
              aria-required="true"
              value={formData.firstName}
              onChange={handleChange}
              className="h-12 px-4 text-sm text-gray-100 bg-blue-600 border border-gray-300 rounded font-manrope placeholder:text-gray-100 focus:outline-none focus:border-blue-200"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              aria-required="true"
              value={formData.email}
              onChange={handleChange}
              className="h-12 px-4 text-sm text-gray-100 bg-blue-600 border border-gray-300 rounded font-manrope placeholder:text-gray-100 focus:outline-none focus:border-blue-200"
            />
            <Button className="h-12 bg-black hover:bg-gray-800">
              Subscribe Now
            </Button>
          </form>
        </div>

        {/* Footer Main Section */}
        <div className="flex flex-col justify-between gap-20 mx-auto my-10 lg:my-24 lg:flex-row">
          <div className="flex flex-col items-start space-y-4">
            <a
              href="/"
              className="text-2xl font-bold text-transparent font-poppins bg-gradient-to-r from-blue-500 to-black bg-clip-text"
            >
              LLN &apos;25
            </a>

            {/* socials */}
            <div className="flex space-x-4 text-gray-600">
              <a href="#" className="p-2 border rounded-full bg-none">
                <FaFacebookF
                  className=" hover:text-blue-600"
                  aria-label="Facebook"
                />
              </a>
              <a href="#" className="p-2 border rounded-full bg-none">
                <FaTwitter
                  className="hover:text-blue-400"
                  aria-label="Twitter"
                />
              </a>
              <a href="#" className="p-2 border rounded-full bg-none">
                <FaInstagram
                  className="hover:text-pink-500"
                  aria-label="Instagram"
                />
              </a>
              <a href="#" className="p-2 border rounded-full bg-none">
                <FaLinkedinIn
                  className="hover:text-blue-700"
                  aria-label="LinkedIn"
                />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          <div className="grid gap-10 text-left lg:gap-40 sm:grid-cols-2 md:col-span-3 md:grid-cols-3">
            {footerLinks.map((section, idx) => (
              <div key={idx}>
                <h4 className="mb-3 font-semibold text-blue-600 text-medium font-poppins">
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="block text-sm text-gray-500 font-manrope hover:text-blue-600"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-5 mt-10 text-sm tracking-wide text-center text-gray-500 border-t font-manrope">
          &copy;copyrights {new Date().getFullYear()} LinkedIn Local Nigeria.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

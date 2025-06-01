import {
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

import Button from "./ui/Button";
import Container from "./ui/Container";
import { footerLinks } from "./constants/footerlinks";
import { useState } from "react";

const Footer = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");


  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxqnSCngwQ7llqZ8ZtBEgxpMxaWDIPgGqtT-j_pyvdWODlR_0zvk9znDvFYCjvk5owxvA/exec";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Form submitted with data:", formData);
    
    // Validate form data
    if (!formData.firstName.trim() || !formData.email.trim()) {
      setSubmitMessage("Please fill in all required fields.");
      setTimeout(() => setSubmitMessage(""), 5000);
      return;
    }
    
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      console.log("Sending request to:", GOOGLE_SCRIPT_URL);
      
      // Try sending as URL-encoded form data instead of JSON
      const formDataToSend = new URLSearchParams();
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('email', formData.email);
      
      console.log("Sending form data:", formDataToSend.toString());
      
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formDataToSend,
      });

      console.log( response + "Request sent successfully");
      
      // Since we're using no-cors mode, we can't read the response
      // But if we reach this point without error, submission likely succeeded
      setSubmitMessage("Thank you for subscribing! We'll be in touch soon.");
      setFormData({ firstName: "", email: "" });
      
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitMessage(""), 5000);
      
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitMessage("Sorry, there was an error. Please try again later.");
      
      // Clear error message after 5 seconds
      setTimeout(() => setSubmitMessage(""), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="py-5 text-gray-600 bg-[#F8FAFC] border-t md:px-16">
      <Container>
        {/* Newsletter Section */}
        <div className="p-6 mx-auto mb-16 rounded-md lg:p-16 max-w-7xl newsletter-bg-desktop newsletter-bg-mobile">
          <h4 className="pb-4 text-4xl font-semibold text-gray-100 font-poppins">
            Subscribe to our newsletter
          </h4>
          
          {/* Success/Error Message */}
          {submitMessage && (
            <div className={`mb-4 p-3 rounded ${
              submitMessage.includes('Thank you') 
                ? 'bg-green-100 text-green-700 border border-green-300' 
                : 'bg-red-100 text-red-700 border border-red-300'
            }`}>
              {submitMessage}
            </div>
          )}
          
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
              disabled={isSubmitting}
              className="h-12 px-4 text-sm text-gray-100 bg-blue-600 border border-gray-300 rounded font-manrope placeholder:text-gray-100 focus:outline-none focus:border-blue-200 disabled:opacity-50"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              aria-required="true"
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
              className="h-12 px-4 text-sm text-gray-100 bg-blue-600 border border-gray-300 rounded font-manrope placeholder:text-gray-100 focus:outline-none focus:border-blue-200 disabled:opacity-50"
            />
            <Button 
              type="submit"
              className="h-12 bg-black hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe Now"}
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
              <a href="https://x.com/LinkedinLocalN" className="p-2 border rounded-full bg-none">
                <FaTwitter
                  className="hover:text-blue-400"
                  aria-label="Twitter"
                />
              </a>
              <a href="https://www.instagram.com/linkedinlocalnigeria/" className="p-2 border rounded-full bg-none">
                <FaInstagram
                  className="hover:text-pink-500"
                  aria-label="Instagram"
                />
              </a>
              <a href="https://www.linkedin.com/company/linkedin-local-nigeriaa/" className="p-2 border rounded-full bg-none">
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
                <h4 className="mb-3 font-semibold text-[#0076B2] text-medium font-poppins">
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
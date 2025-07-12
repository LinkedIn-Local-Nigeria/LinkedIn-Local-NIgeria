import {
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

import Button from "./ui/Button";
import Container from "./ui/Container";
import { footerLinks } from "./constants/footerlinks";
import toast from "react-hot-toast";
import { useState } from "react";

const Footer = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwQOoz486dNB4bV7BjM4RaGJ7d4kDSJuMSa7Qw8BFs0FoWsYichBps8y1IoYf6O36I5GQ/exec";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName.trim() || !formData.email.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    console.log('=== REACT FORM DEBUG START ===');
    console.log('Form data to submit:', formData);

    try {      
      setTimeout(async () => {
        try {
          console.log('Trying body URLSearchParams as backup...');
          
          const bodyParams = new URLSearchParams();
          bodyParams.append("firstName", formData.firstName.trim());
          bodyParams.append("email", formData.email.trim());
          
          await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: bodyParams,
            mode: "no-cors",
          });
          
          console.log('Body URLSearchParams method completed');
          
        } catch (bodyError) {
          console.error('Body method error:', bodyError);
        }
      }, 500);

      toast.success("Thank you for subscribing!");
      setFormData({ firstName: "", email: "" });
      console.log('✅ Form submission completed successfully');

    } catch (error) {
      console.error("❌ Primary submission error:", error);
      
      try {
        console.log('Trying manual form construction...');
        
        const manualBody = `firstName=${encodeURIComponent(formData.firstName.trim())}&email=${encodeURIComponent(formData.email.trim())}`;
        console.log('Manual body:', manualBody);
        
        await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: manualBody,
          mode: "no-cors",
        });
        
        console.log('Manual form construction completed');
        toast.success("Thank you for subscribing!");
        setFormData({ firstName: "", email: "" });
        
      } catch (manualError) {
        console.error("Manual form construction error:", manualError);
        toast.error("Something went wrong. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
      console.log('=== REACT FORM DEBUG END ===');
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

        <div className="flex flex-col justify-between gap-20 mx-auto my-10 lg:my-24 lg:flex-row">
          <div className="flex flex-col items-start space-y-4">
            <a
              href="/"
              className="text-2xl font-bold text-transparent font-poppins bg-gradient-to-r from-blue-500 to-black bg-clip-text"
            >
              LLN &apos;25
            </a>

            <div className="flex space-x-4 text-gray-600">
              <a
                href="https://x.com/LinkedinLocalN"
                className="p-2 border rounded-full bg-none"
              >
                <FaTwitter className="hover:text-blue-400" />
              </a>
              <a
                href="https://www.instagram.com/linkedinlocalnigeria/"
                className="p-2 border rounded-full bg-none"
              >
                <FaInstagram className="hover:text-pink-500" />
              </a>
              <a
                href="https://www.linkedin.com/company/linkedin-local-nigeriaa/"
                className="p-2 border rounded-full bg-none"
              >
                <FaLinkedinIn className="hover:text-blue-700" />
              </a>
            </div>
          </div>

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
          &copy; {new Date().getFullYear()} LinkedIn Local Nigeria.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
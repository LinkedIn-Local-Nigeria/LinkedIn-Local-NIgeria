import React from "react";
import { Link } from "react-router-dom";
import Container from "./ui/Container";
import BlogImg1 from "../assets/business.png";
import NavBar from "./NavBar";
import Footer from "./Footer";

// Placeholder images
import BlogImg2 from "../assets/possible.png";
import BlogImg3 from "../assets/throwback.png";

const blogPosts = [
  {
    title: "The Power of Community in Career Tra...",
    date: "5/16/2025",
    image: BlogImg1,
    link: "/blog/power-of-community",
  },
  {
    title: "Behind the Scenes: Organizing a LinkedIn Local Ev...",
    date: "5/16/2025",
    image: BlogImg2,
    link: "/blog/behind-the-scenes",
  },
  {
    title: "Moments We Won't Forget: LLN in Pi...",
    date: "5/16/2025",
    image: BlogImg3,
    link: "/blog/moments-we-wont-forget",
  },
];

const Blog = () => {
  return (
    <div className="bg-white min-h-screen w-full">
      <NavBar />
      <div className="pt-24"> {/* Add top padding to account for fixed NavBar */}
        <section className="py-16">
          <div className="max-w-screen-xl mx-auto px-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center min-h-[400px]">
              {/* Left: Text */}
              <div className="max-w-md md:ml-auto mx-auto text-center md:text-left flex flex-col justify-center">
                <h1 className="text-4xl md:text-6xl font-extrabold text-[#1790D0] mb-4 leading-tight text-center md:text-left">
                  Insights From<br />Our Blog and<br />Community
                </h1>
                <p className="text-gray-600 text-base mb-6 text-center md:text-left">Latest conversations, tips, and thought leadership from LinkedIn Local Nigeria.</p>
                <div className="flex justify-center md:justify-start">
                  <Link to="/community" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1790D0] text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition text-base">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2Z"/></svg>
                    Join Our Community
                  </Link>
                </div>
              </div>
              {/* Right: Image */}
              <div className="flex justify-center md:-ml-16">
                <img src={BlogImg1} alt="LinkedIn" style={{ width: 1000, height: 350 }} className="rounded-xl object-cover max-w-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Blog List Section (Updated) */}
        <section className="py-12 mb-8">
          <Container>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#1790D0]">From The Local to The Global</h2>
              <Link to="/blog" className="text-[#1790D0] font-semibold hover:underline flex items-center gap-1">VIEW ALL <span>&rarr;</span></Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {blogPosts.map((post, idx) => (
                <div key={idx} className="flex flex-col items-center mx-auto w-full max-w-xs">
                  <img src={post.image} alt={post.title} className="h-96 w-full object-cover rounded-xl mb-4" />
                  <div className="w-full">
                    <h3 className="font-medium text-base text-gray-800 mb-2">{post.title}</h3>
                    <span className="text-gray-500 text-sm">{post.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Newsletter Signup Section (Updated) */}
        <section className="py-8">
          <Container>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-blue-900 font-extrabold text-2xl md:text-3xl max-w-md text-left md:pr-8">
                Join 1,000+ Curious Professionals In Getting Smarter Every Week
              </div>
              <div className="bg-[#0077B5] rounded-xl p-8 flex flex-col gap-4 min-w-[320px] w-full md:w-auto relative overflow-hidden min-h-[260px] md:min-h-[320px] justify-center">
                <div className="text-white text-lg font-semibold mb-2">Subscribe to our newsletter</div>
                <form className="flex flex-col sm:flex-row gap-2">
                  <input type="text" placeholder="First name" className="px-4 py-2 rounded-md outline-none text-gray-900" />
                  <input type="email" placeholder="Email address" className="px-4 py-2 rounded-md outline-none text-gray-900" />
                  <button type="submit" className="bg-black text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-800 transition">Subscribe Now</button>
                </form>
                {/* Decorative bottom-right rounded effect */}
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-white rounded-br-xl" style={{borderTopLeftRadius:'100%'}}></div>
              </div>
            </div>
          </Container>
        </section>

        {/* Podcast Section */}
        <section className="py-16">
          <Container>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-blue-900">The Podcast for Growth-Minded Professionals</h2>
              <Link to="/podcasts" className="text-blue-600 font-semibold hover:underline flex items-center gap-1">VIEW ALL <span>&rarr;</span></Link>
            </div>
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <div className="relative">
                <img src={BlogImg2} alt="Podcast" className="w-full h-96 object-cover" style={{height: 400}} />
                <button className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white/80 rounded-full p-3 shadow-lg">
                    <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="9.5,7.5 16.5,12 9.5,16.5" fill="#2563eb"/></svg>
                  </span>
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-white text-base font-medium">Empowering professionals on LinkedIn to grow 11x faster with strategic design & development.</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Resource Library Section (Screenshot Accurate) */}
        <section className="py-16 bg-white">
          <Container>
            <h2 className="text-2xl md:text-5xl font-extrabold text-[#1790D0] text-center mb-10">Get The Scoop From Our Resource Library</h2>
            <div className="grid grid-cols-3 gap-6">
              {/* Top Left */}
              <div className="flex flex-col items-center bg-white rounded-xl overflow-hidden shadow">
                <img src="/src/assets/EventImage1.png" alt="Resource 1" className="w-full h-80 object-cover" />
                <div className="p-2 text-center text-sm font-medium">Mastering LinkedIn for Career Growth</div>
              </div>
              {/* Top Center (Even Taller) */}
              <div className="flex flex-col items-center bg-white rounded-xl overflow-hidden shadow">
                <img src="/src/assets/Image_1.svg" alt="Resource 2" className="w-full h-[28rem] object-cover" />
                <div className="p-2 text-center text-sm font-medium">Brand Identity</div>
              </div>
              {/* Top Right */}
              <div className="flex flex-col items-center bg-white rounded-xl overflow-hidden shadow">
                <img src="/src/assets/EventImage2.jpg" alt="Resource 3" className="w-full h-80 object-cover" />
                <div className="p-2 text-center text-sm font-medium">Top Skills Recruiters Are Looking for in 2025</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-6">
              {/* Bottom Left */}
              <div className="flex flex-col items-center bg-white rounded-xl overflow-hidden shadow">
                <img src="/src/assets/Image_2.svg" alt="Resource 4" className="w-full h-80 object-cover" />
                <div className="p-2 text-center text-sm font-medium">Thriving in Community: Why LinkedIn Local Matters</div>
              </div>
              {/* Bottom Center (White Card, Compact) */}
              <div className="flex flex-col items-center bg-white rounded-xl overflow-hidden shadow justify-between mt-2" style={{height: '11rem'}}>
                <div className="flex-1 flex flex-col items-center justify-center p-2">
                  <div className="text-base font-bold text-[#1A2A4B] text-center mb-1">How to attract and stand out with a distinct<br/> <span className='text-lg text-[#1790D0]'>Brand Identity</span></div>
                  <div className="grid grid-cols-3 gap-1 mt-1">
                    <div className="flex flex-col items-center"><span className="font-bold">Logo</span><span className="text-xs">Visual mark</span></div>
                    <div className="flex flex-col items-center"><span className="font-bold">Aa</span><span className="text-xs">Typography</span></div>
                    <div className="flex flex-col items-center"><span className="font-bold">Colours</span><span className="text-xs">Palette</span></div>
                    <div className="flex flex-col items-center"><span className="font-bold">Tagline</span><span className="text-xs">Brief edge</span></div>
                    <div className="flex flex-col items-center"><span className="font-bold">Imagery</span><span className="text-xs">Visual style</span></div>
                    <div className="flex flex-col items-center"><span className="font-bold">Layout</span><span className="text-xs">Composition</span></div>
                  </div>
                </div>
                <div className="p-1 text-center text-xs font-medium">Personal Branding in the Digital Age</div>
              </div>
              {/* Bottom Right */}
              <div className="flex flex-col items-center bg-white rounded-xl overflow-hidden shadow">
                <img src="/src/assets/Image_4.svg" alt="Resource 6" className="w-full h-80 object-cover" />
                <div className="p-2 text-center text-sm font-medium">From Networking to Net-Worth: Building Authentic Connections</div>
              </div>
            </div>
          </Container>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Blog; 
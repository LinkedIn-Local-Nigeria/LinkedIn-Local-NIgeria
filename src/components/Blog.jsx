import BlogImg1 from "../assets/people.png";
import BlogImg2 from "../assets/possible.png";
import BlogImg3 from "../assets/throwback.png";
import Container from "./ui/Container";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

// Placeholder images



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
      <div className="pt-24"> 
        <section className="py-16">
          <div className="max-w-screen-xl mx-auto px-4">
            <div
              className="grid grid-cols-1 md:grid-cols-2 items-center"
              style={{ gap: 57 }}
            >
              <div
                style={{ width: 569, height: 368, borderRadius: 9.22 }}
                className="flex flex-col justify-center text-left -mt-16 ml-16"
              >
                <h1 className="md:text-5xl font-extrabold text-[#1790D0] leading-tight mb-4 text-left">
                  Your Front Row Seat <br />
                  to Nigeria’s Career <br />
                  Evolution
                </h1>
                <p className="text-gray-700 text-[20px] mb-6 text-left">
                  From networking wins to workplace wisdom.<br />
                  Stay inspired, stay informed.
                </p>
                <div className="text-left">
                  <a href="/community" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1790D0] text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition text-base">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2Z"/></svg>
                    Join Our Community
                  </a>
                </div>
              </div>
              {/* Right: Image */}
              <div className="flex justify-center items-center">
                <img
                  src="/images/linkedin.png"
                  alt="LinkedIn"
                  style={{ width: 663, height: 393, borderRadius: 9.22 }}
                  className="object-cover bg-[#0a192f]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Add large space after the first section */}
        <div className="mb-24"></div>

        {/* Blog List Section (Updated) */}
        <section className="py-12 mb-8">
          <Container>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#1790D0] mb-12">From The Local to The Global</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 justify-center">
              {blogPosts.map((post, idx) => (
                <div key={idx} className="flex flex-col items-center max-w-[530px] w-full rounded-xl">
                  <img src={post.image} alt={post.title} style={{ width: 530, height: 477, borderRadius: 10 }} className="object-cover mb-3" />
                  <div className="flex flex-col flex-1 w-full">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-base text-gray-800 truncate max-w-[60%]">{post.title}</h3>
                      <Link to={post.link} className="text-[#1790D0] font-bold flex items-center gap-1 text-sm whitespace-nowrap">READ MORE <span className="font-bold">&rarr;</span></Link>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <img src={`https://randomuser.me/api/portraits/med/men/${idx+10}.jpg`} alt="avatar" className="w-6 h-6 rounded-full" />
                      <span className="text-xs font-semibold text-gray-700">{idx === 0 ? 'Bola Ade' : idx === 1 ? 'Chika Precious' : 'Emeka Obi'}</span>
                      <span className="text-xs text-gray-500">{post.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

      </div>
      <Footer />
    </div>
  );
};

export default Blog; 
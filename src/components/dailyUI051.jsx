import { motion } from "framer-motion";
import { ArrowRight, Download, File } from "lucide-react";
import { useEffect, useState } from "react";
import { BsGithub, BsLinkedin, BsTwitterX, BsYoutube } from "react-icons/bs";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";

function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return scrollPosition;
}

export default function PresPage() {
  const scrollPosition = useScrollPosition();
  const isScrolled = scrollPosition > 50;
  return (
    <>
      <motion.nav
        className={`
    flex justify-between items-center z-50 fixed
    ${
      isScrolled
        ? "top-4 mx-auto w-[100%] px-8 py-4 rounded-xl bg-zinc-900/90 backdrop-blur-md shadow-lg"
        : "sticky top-0 left-0 mx-auto w-full py-2 px-8 bg-zinc-800"
    }
     transition-all duration-300 ease-in-out
  `}
        initial={false}
        animate={{
          y: isScrolled ? 0 : 0,
          opacity: 1,
          scale: isScrolled ? 0.98 : 1,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      >
        <motion.img
          src="/iosec.png"
          className={`object-cover transition-all duration-300 ${
            isScrolled ? "h-12" : "h-16"
          }`}
          alt="IoSec Logo"
        />

        <ul className="flex items-center space-x-12 text-zinc-300 ">
          {["Home", "About", "Press", "Contact"].map((item) => (
            <motion.li key={item}>
              <a
                href="#"
                className={`
            font-['Poppins'] relative py-2
            ${isScrolled ? "text-sm" : "text-base"}
            transition-all duration-300 hover:text-white
          `}
              >
                {item}
                <span className="absolute left-0 right-0 bottom-0 h-px bg-white/0 group-hover:bg-white/100 transition-all duration-300" />
              </a>
            </motion.li>
          ))}
        </ul>
      </motion.nav>
      <header className="text-center min-h-screen flex flex-col justify-center items-center relative">
        <div className="absolute inset-0 w-full h-full -z-1 flex items-center justify-center overflow-hidden">
          <img
            src="/iosecbg.jpg"
            className="w-[98%] h-[98%] rounded-2xl object-cover ring-2 ring-zinc-900/70 ring-offset-3"
            alt=""
          />
          <div className="absolute w-[98%] h-[98%] rounded-2xl bg-black/40" />
        </div>
        <h1 className="text-5xl font-bold mb-4 font-['Poppins'] max-w-2/4 tracking-wide leading-snug bg-gradient-to-br from-zinc-500 to-white bg-clip-text text-transparent">
          Powering a Safer Future with Intelligent Connectivity
        </h1>
        <p className="text-lg text-zinc-400 mb-8 font-['DM_Sans'] max-w-2/4">
          <span className="font-bold">IoSec</span> merges AI and IoT to redefine
          digital and physical security — from smart infrastructures to
          autonomous systems
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <motion.button
            className="group relative px-8 py-4 bg-zinc-900 text-white rounded-lg font-['Poppins'] overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-zinc-800 to-zinc-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center justify-center gap-3">
              <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium tracking-wide">
                Download Press Kit
              </span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white/20 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>
          </motion.button>

          <motion.button
            className="group relative px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg font-['Poppins'] overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center justify-center gap-3">
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
              <span className="font-medium tracking-wide">Latest Release</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white/20 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>
          </motion.button>
        </div>
      </header>
      <section className="min-h-screen font-['DM Sans']">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-10 w-full">
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <div className="relative z-10 mb-4">
              <h2 className="text-2xl md:text-3xl ml-4 pl-2 font-['Poppins'] w-fit pr-4 bg-zinc-100 z-10 font-bold text-zinc-900">
                Latest Releases
              </h2>
              <div className="absolute h-[1px] w-full -z-1 top-1/2 -translate-y-1/2 bg-zinc-700" />
            </div>

            <div className="relative w-full h-[22rem] overflow-hidden bg-zinc-900 text-white p-6 md:p-10 shadow-lg rounded-2xl">
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-['Poppins'] font-semibold mb-2">
                  Introducing Sentinel-X
                </h3>
                <p className="text-base md:text-lg text-zinc-300 max-w-2xl font-['DM_Sans']">
                  Our new AI-driven IoT security platform empowers industries
                  with adaptive ML models that predict and neutralize zero-day
                  threats across connected devices.
                </p>
                <button className="mt-6 px-6 py-2 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all">
                  Read Full Release
                </button>
              </div>
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558002038-1055907df827?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9tZSUyMHNlY3VyaXR5fGVufDB8MHwwfHx8Mg%3D%3D')] bg-cover bg-center opacity-20" />
            </div>
          </div>

          {/* Research & Publications */}
          <div className="col-span-1 md:col-span-2 h-fit relative overflow-hidden">
            <div className="relative z-10 p-4">
              <h3 className="text-lg md:text-2xl ml-4 pl-2 font-['Poppins'] w-fit pr-4 bg-zinc-100 z-10 font-semibold text-zinc-900">
                Research & Publications
              </h3>
              <div className="absolute h-[1px] w-full -z-1 top-1/2 -translate-y-1/2 bg-zinc-700" />
            </div>

            <motion.div
              className="flex space-x-6 p-4 cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: -900, right: 0 }}
            >
              {[
                {
                  title: "Predictive Edge Security in IoT Networks",
                  abstract:
                    "A novel approach to securing IoT networks using predictive algorithms and machine learning, achieving 99.9% threat detection rate with minimal latency impact.",
                  publishedIn: "IEEE Internet of Things Journal",
                  date: "Oct, 2025",
                  authors: ["Dr. Sarah Chen", "Prof. Alex Kumar"],
                  image: "/res1.png",
                },
                {
                  title: "Federated Learning for Distributed IoT Security",
                  abstract:
                    "Implementation of privacy-preserving federated learning models across distributed IoT networks, enabling collaborative threat detection without compromising data privacy.",
                  publishedIn: "Nature Cybersecurity",
                  date: "Sept, 2025",
                  authors: ["Dr. James Wilson", "Dr. Priya Patel"],
                  image: "/res2.png",
                },
                {
                  title: "Reinforcement Learning in Threat Detection",
                  abstract:
                    "Advanced reinforcement learning techniques for real-time threat detection and mitigation in IoT environments, reducing false positives by 87%.",
                  publishedIn: "ACM Transactions on Security",
                  date: "Aug, 2025",
                  authors: ["Prof. Michael Zhang", "Dr. Lisa Brown"],
                  image: "/res3.png",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="min-w-[20rem] md:min-w-[34rem] h-[19rem] bg-zinc-50 rounded-xl shadow-sm flex overflow-hidden hover:shadow-md transition-all group border border-zinc-200"
                >
                  <div className="w-1/3 md:w-2/5 h-full relative flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/40 to-transparent" />
                  </div>

                  <div className="flex-1 p-4 md:p-6 flex flex-col">
                    <div className="flex flex-col justify-between h-full space-y-3">
                      <div>
                        <h4 className="text-lg md:text-xl font-semibold text-zinc-900 font-['Poppins'] group-hover:text-zinc-700 transition-colors">
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 font-[DM_Sans] text-sm text-zinc-600">
                          <span className="font-medium text-zinc-900">
                            {item.publishedIn}
                          </span>
                          <span>•</span>
                          <span>{item.date}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 text-sm text-zinc-500 font-[DM_Sans]">
                        {item.authors.map((author, idx) => (
                          <span
                            key={idx}
                            className="hover:text-zinc-900 cursor-pointer transition-colors"
                          >
                            {author}
                            {idx < item.authors.length - 1 ? "," : ""}
                          </span>
                        ))}
                      </div>

                      <p className="text-sm text-zinc-600 line-clamp-3 font-[DM_Sans]">
                        {item.abstract}
                      </p>

                      <div className="pt-3 border-t border-zinc-200">
                        <motion.button
                          className="group flex items-center gap-2 text-sm font-medium text-zinc-900 hover:text-zinc-700 font-['Poppins'] w-full justify-start"
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center gap-2">
                            <File className="w-4 h-4 text-zinc-900 group-hover:text-zinc-700 transition-colors" />
                            <span className="relative">
                              Read Full Paper
                              <span className="absolute -bottom-1 left-0 w-full h-px bg-zinc-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                            </span>
                          </div>
                          <span className="text-lg group-hover:translate-x-1 transition-transform duration-300">
                            <ArrowRight size={16} />
                          </span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Achievements */}
          <div className="col-span-1 h-[24rem] relative overflow-hidden">
            <div className="relative z-10 p-4">
              <h3 className="text-xl md:text-2xl flex items-center justify-between font-['Poppins'] font-semibold text-zinc-900">
                <span className="bg-white ml-4 pl-2">Achievements</span>
                <span className="text-xs bg-zinc-100 px-3 py-1 rounded-full">
                  2025
                </span>
              </h3>
              <div className="absolute h-[1px] w-full -z-1 top-1/2 -translate-y-1/2 bottom-0 bg-zinc-700" />
            </div>

            <div className="absolute inset-0 mt-16 overflow-hidden">
              <motion.div
                className="flex flex-col items-center space-y-4 p-4"
                drag="y"
                dragConstraints={{ top: -300, bottom: 0 }}
              >
                {[
                  {
                    title: "CES Innovation Award",
                    date: "January 2025",
                    category: "Security Innovation",
                    description: "Recognition for breakthrough in IoT security",
                    image:
                      "https://iprsoftwaremedia.com/214/files/20210/5ff4cea62cfac224fc7e7daf_ces2021_innovationawardsboi-png/ces2021_innovationawardsboi-png_mid.png",
                    bgColor: "from-white/20 to-cyan-600/20",
                  },
                  {
                    title: "Series A Funding",
                    date: "March 2025",
                    amount: "$10M",
                    description:
                      "Led by Sequoia Capital with participation from Y Combinator",
                    image:
                      "https://www.shutterstock.com/image-photo/grant-funding-symbol-concept-words-260nw-2258519013.jpg",
                    bgColor: "from-white/20 to-zinc-600/20",
                  },
                  {
                    title: "Forbes 30 Under 30",
                    date: "June 2025",
                    category: "Enterprise Technology",
                    description: "Recognized for innovation in cybersecurity",
                    image:
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwJUBBX2GRfyrka5ZOIIdhh1uV_3v8OoSlxQ&s",
                    bgColor: "from-zinc-800/50 to-zinc-600/20",
                  },
                ].map((ach, i) => (
                  <div key={i} className="w-full group cursor-pointer">
                    <div className="relative overflow-hidden rounded-xl bg-zinc-50 border border-zinc-200 hover:bg-zinc-100 transition-colors">
                      <div className="flex p-4 gap-4">
                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={ach.image}
                            alt={ach.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <h4 className="font-semibold text-lg text-black mb-1">
                            {ach.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-black mb-2">
                            <span>{ach.date}</span>
                            {ach.category && (
                              <>
                                <span>•</span>
                                <span>{ach.category}</span>
                              </>
                            )}
                          </div>
                          <p className="text-sm text-black/70 line-clamp-2">
                            {ach.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-zinc-900 py-16 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="space-y-2 mb-16">
            <motion.div
              className="flex items-center gap-2 mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="h-px w-12 bg-zinc-400" />
              <span className="text-zinc-500 font-[DM_Sans] text-sm tracking-wider">
                MEDIA RECOGNITION
              </span>
            </motion.div>
            <motion.h2
              className="text-4xl md:text-5xl font-['Poppins'] font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Featured In
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 relative group">
              <motion.div
                className="relative h-full rounded-2xl overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src="https://t4.ftcdn.net/jpg/01/79/45/27/360_F_179452748_yIZdedWSFoZ4a6cufoaiWBhzOPdyEpm3.jpg"
                  alt="TechCrunch Feature"
                  className="absolute inset-0 w-full h-full object-cover brightness-50 group-hover:brightness-40 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                <div className="absolute bottom-0 p-8 w-full">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src="https://tramwayventures.com/wp-content/uploads/2022/10/techcrunch-logo-1024x346.png"
                      alt="TechCrunch"
                      className="h-8 w-auto brightness-200"
                    />
                    <span className="text-zinc-400 text-sm font-[DM_Sans]">
                      Featured Story • Oct 2025
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-3 font-['Poppins']">
                    "IoSec's Revolutionary Approach to Edge Security"
                  </h3>
                  <p className="text-zinc-300 line-clamp-2 mb-4 font-[DM_Sans]">
                    An in-depth look at how IoSec is transforming the IoT
                    security landscape with its groundbreaking AI-driven
                    solutions.
                  </p>
                  <motion.button
                    className="flex items-center gap-2 text-white group/btn"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-sm font-medium font-['Poppins']">
                      Read Full Article
                    </span>
                    <ArrowRight
                      size={16}
                      className="group-hover/btn:translate-x-1 transition-transform"
                    />
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Additional Coverage */}
            <div className="space-y-6">
              {[
                {
                  publisher: "Wired",
                  title: "The Future of IoT Security",
                  date: "Sept 2025",
                  logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT55JLqPEdII30C5sfmtbXD7t2ZBkaoJPiC3A&s",
                },
                {
                  publisher: "Forbes",
                  title: "Top 10 Security Startups",
                  date: "Aug 2025",
                  logo: "https://www.nicepng.com/png/full/42-423482_forbes-logo-forbes-logo-png-transparent.png",
                },
                {
                  publisher: "IEEE Spectrum",
                  title: "Edge Computing Revolution",
                  date: "July 2025",
                  logo: "https://logonoid.com/images/ieee-logo.png",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="group bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 hover:bg-zinc-800 transition-colors border border-zinc-700/50"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <img
                      src={item.logo}
                      alt={item.publisher}
                      className="h-6 w-auto brightness-200"
                    />
                    <span className="text-xs text-zinc-500 font-[DM_Sans]">
                      {item.date}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-4 font-['Poppins']">
                    {item.title}
                  </h4>
                  <motion.button
                    className="flex items-center gap-2 text-zinc-400 group/btn"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-sm font-['Poppins']">Read More</span>
                    <ArrowRight
                      size={14}
                      className="group-hover/btn:translate-x-1 transition-transform"
                    />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <motion.button
              className="group relative px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/10 text-white rounded-lg font-['Poppins'] overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center gap-3">
                <span className="font-medium">View Press Archive</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>
          </div>
        </div>
      </section>

      <section className="relative py-24 bg-zinc-50 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.20]">
          <img
            src="/herobg.jpg"
            className="w-full h-full object-cover rotate-y-180"
            alt=""
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative">
          {/* Section Header */}
          <div className="mb-16">
            <motion.div
              className="flex items-center gap-2 mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="h-px w-12 bg-zinc-400" />
              <span className="text-zinc-500 font-[DM_Sans] text-sm tracking-wider">
                ABOUT THE COMPANY
              </span>
            </motion.div>

            <motion.h2
              className="text-4xl md:text-5xl font-['Poppins'] font-bold text-zinc-900 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Redefining Security for an Intelligent World
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            <div className="space-y-8">
              <motion.p
                className="text-lg text-zinc-600 leading-relaxed font-[DM_Sans]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                At{" "}
                <span className="font-semibold text-zinc-900">
                  IoSec Technologies
                </span>
                , we are redefining how connected devices stay secure in an
                increasingly intelligent world. Founded in 2022 by a team of
                engineers and data scientists, our mission is simple yet
                transformative — to merge the power of
                <span className="inline-flex items-center px-3 py-1 mx-1 bg-zinc-300 text-zinc-900 rounded-full text-sm">
                  Artificial Intelligence
                </span>{" "}
                with the precision of
                <span className="inline-flex items-center px-3 py-1 mx-1 bg-zinc-300 text-zinc-900 rounded-full text-sm">
                  IoT
                </span>
                to build predictive, self-learning security systems that
                safeguard the digital ecosystem.
              </motion.p>

              <motion.p
                className="text-zinc-600 font-[DM_Sans] leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                What started as a research-driven initiative within university
                labs has evolved into a fast-growing deep-tech startup pushing
                the boundaries of Edge Security and Predictive Threat Detection.
                Our proprietary AI models anticipate and neutralize cyber
                threats in milliseconds, without compromising network latency —
                achieving{" "}
                <span className="font-semibold text-zinc-900">
                  99.9% accuracy in threat prediction
                </span>
                .
              </motion.p>

              <motion.div
                className="grid grid-cols-2 gap-8 py-8 border-y border-zinc-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div>
                  <div className="text-3xl font-bold text-zinc-900 mb-2">
                    99.9%
                  </div>
                  <div className="text-sm text-zinc-500 font-[DM_Sans]">
                    Threat Detection Accuracy
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-zinc-900 mb-2">
                    &lt;5ms
                  </div>
                  <div className="text-sm text-zinc-500 font-[DM_Sans]">
                    Response Latency
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Timeline */}
            <div className="relative">
              <div className="absolute left-3 top-3 h-full w-[1px] bg-zinc-200" />

              {[
                {
                  year: "2022",
                  title: "Foundation",
                  description:
                    "Founded with a vision to secure IoT at the edge",
                },
                {
                  year: "2023",
                  title: "First Prototype",
                  description:
                    "Released our first AI-based IoT Security Gateway prototype",
                },
                {
                  year: "2024",
                  title: "Recognition",
                  description: "Top 10 Emerging Security Startups by TechWorld",
                },
                {
                  year: "2025",
                  title: "Research Excellence",
                  description:
                    "3 peer-reviewed papers & university partnerships",
                },
              ].map((milestone, i) => (
                <motion.div
                  key={milestone.year}
                  className="relative pl-12 pb-12 last:pb-0"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="absolute left-0 top-0 w-7 h-7 rounded-full bg-zinc-100 border-4 border-white shadow-sm flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-zinc-600" />
                  </div>
                  <div className="text-sm text-zinc-500 mb-1 font-[DM_Sans]">
                    {milestone.year}
                  </div>
                  <h4 className="text-lg font-semibold text-zinc-900 mb-2 font-['Poppins']">
                    {milestone.title}
                  </h4>
                  <p className="text-zinc-600 font-[DM_Sans]">
                    {milestone.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom Quote */}
          <motion.div
            className="mt-20 text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xl md:text-2xl text-zinc-900 font-[DM_Sans] italic">
              "Because in a world where devices think — security must think
              faster."
            </p>
          </motion.div>
        </div>
      </section>

      <footer className="bg-zinc-900 relative overflow-hidden">
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="bg-zinc-50 rounded-2xl p-8 md:p-12 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-semibold text-zinc-900 mb-4 font-['Poppins']">
                    Press & Media Inquiries
                  </h3>
                  <p className="text-zinc-600 mb-8 font-['DM_Sans']">
                    We're open to interviews, feature requests, and media
                    collaborations.
                  </p>

                  <div className="space-y-4 font-['DM_Sans']">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center">
                        <MdEmail className="w-5 h-5 text-zinc-700" />
                      </div>
                      <div>
                        <a
                          href="mailto:press@sentrax.ai"
                          className="text-zinc-900 hover:text-zinc-600 transition-colors"
                        >
                          press@iosec.ai
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center">
                        <MdPhone className="w-5 h-5 text-zinc-700" />
                      </div>
                      <div>
                        <a
                          href="tel:+15552450893"
                          className="text-zinc-900 hover:text-zinc-600 transition-colors"
                        >
                          +1 (555) 245-0893
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center">
                        <MdLocationOn className="w-5 h-5 text-zinc-700" />
                      </div>
                      <div>
                        <address className="text-zinc-900 not-italic">
                          IoSec Technologies, San Francisco, CA
                        </address>
                      </div>
                    </div>
                  </div>
                </div>

                <form className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-zinc-700 mb-1 font-[Poppins]"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 rounded-lg bg-white border border-zinc-200 focus:ring-1 focus:ring-offset-2 focus:ring-zinc-600 focus:border-transparent transition-colors font-[DM_Sans]"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="organization"
                      className="block text-sm font-medium text-zinc-700 mb-1 font-[Poppins]"
                    >
                      Organization / Media Outlet
                    </label>
                    <input
                      type="text"
                      id="organization"
                      className="w-full px-4 py-3 rounded-lg bg-white border border-zinc-200 focus:ring-1 focus:ring-offset-2 focus:ring-zinc-600 focus:border-transparent transition-colors font-[DM_Sans]"
                      placeholder="Your organization"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-zinc-700 mb-1 font-[Poppins]"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-white border border-zinc-200 focus:ring-1 focus:ring-offset-2 focus:ring-zinc-600 focus:border-transparent transition-colors font-[DM_Sans]"
                      placeholder="Your inquiry"
                    />
                  </div>

                  <motion.button
                    type="button"
                    className="w-full px-8 py-4 bg-zinc-900 text-white rounded-lg font-['Poppins'] overflow-hidden relative group"
                    whileHover={{ scale: 0.96 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-zinc-800 to-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-[Poppins]" />
                    <span className="relative">Send Message</span>
                  </motion.button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="relative border-t border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {/* Branding */}
              <div className="lg:col-span-2">
                <img src="/iosec.png" alt="IoSec" className="h-16 mb-6" />
                <p className="text-zinc-400 mb-8 font-['DM_Sans']">
                  Engineering the future of secure, intelligent connectivity.
                </p>
                <div className="flex items-center gap-6">
                  {["linkedin", "twitter", "youtube", "github"].map(
                    (platform) => (
                      <a
                        key={platform}
                        href="#"
                        className="text-zinc-500 hover:text-white transition-colors"
                      >
                        <span className="sr-only">{platform}</span>
                        {platform === "linkedin" && <BsLinkedin size={24} />}
                        {platform === "twitter" && <BsTwitterX size={24} />}
                        {platform === "youtube" && <BsYoutube size={24} />}
                        {platform === "github" && <BsGithub size={24} />}
                      </a>
                    )
                  )}
                </div>
              </div>

              <div className="space-x-8 flex sm:flex-col md:flex-row items-start justify-between w-full col-span-2">
                <div>
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 font-['Poppins']">
                    Company
                  </h4>
                  <ul className="space-y-3">
                    {["About Us", "Careers", "Research"].map((item) => (
                      <motion.li
                        key={item}
                        whileHover={{ x: 5 }}
                        className="cursor-pointer"
                      >
                        <a
                          href="#"
                          className="text-zinc-400 hover:text-white transition-all font-['DM_Sans']"
                        >
                          {item}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 font-['Poppins']">
                    Resources
                  </h4>
                  <ul className="space-y-3">
                    {["Press Kit", "Media Assets", "Brand Guidelines"].map(
                      (item) => (
                        <motion.li
                          key={item}
                          whileHover={{ x: 5 }}
                          className="cursor-pointer"
                        >
                          <a
                            href="#"
                            className="text-zinc-400 hover:text-white transition-colors font-['DM_Sans']"
                          >
                            {item}
                          </a>
                        </motion.li>
                      )
                    )}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 font-['Poppins']">
                    Legal
                  </h4>
                  <ul className="space-y-3">
                    {["Privacy Policy", "Terms of Use"].map((item) => (
                      <motion.li
                        key={item}
                        whileHover={{ x: 5 }}
                        className="cursor-pointer"
                      >
                        {" "}
                        <a
                          href="#"
                          className="text-zinc-400 hover:text-white transition-colors font-['DM_Sans']"
                        >
                          {item}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-zinc-800 text-center">
              <p className="text-zinc-500 text-sm font-['Poppins']">
                © 2025 IoSec Technologies. All Rights Reserved.
              </p>
              <p className="text-zinc-600 text-sm mt-2 font-['DM_Sans'] max-w-2xl mx-auto">
                We secure the connected world with AI-powered IoT defense that
                predicts and prevents threats in real time. At IoSec,
                intelligence meets protection to build trust in every
                connection.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

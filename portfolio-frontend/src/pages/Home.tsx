import { useEffect } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Leadership from "../components/Leadership";
import Certificates from "../components/Certificates";
import Updates from "../components/Updates";
import Contact from "../components/Contact";
import Navbar from "../components/Navbar";
import { trackPageView } from "../services/api";

function Home() {
  useEffect(() => {
    trackPageView("/");
  }, []);

  return (
    <main className="pb-24">
      <Hero />
      <About />
      <Skills />
      <Leadership />
      <Certificates />
      <Updates />
      <Contact />
      <Navbar />
    </main>
  );
}

export default Home;

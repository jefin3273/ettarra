// page.tsx
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Main-Nav";
import Footer from "./components/Footer";
import CardSection from "./components/CardSection";

export default function Page() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CardSection />
      <Footer />
    </div>
  );
}

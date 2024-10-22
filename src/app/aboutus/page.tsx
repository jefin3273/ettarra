import Image from "next/image";
import { Coffee, MapPin, Phone, Mail, Clock } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="bg-[#FFF8F0] min-h-screen">
      {/* Hero Section with Dark Overlay */}
      <section className="container mx-auto relative">
        <div className="relative h-[250px] w-full">
          <Image
            src="/Ettara_shop.jpg"
            alt="Ettarra Coffee Shop"
            layout="fill"
            objectFit="cover"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          {/* Overlay Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white">
              ABOUT US
            </h1>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-[#8B4513] mb-6">Our Story</h2>
        <div>
          <p className="text-[#5A3E36] mb-4">
            At Ettarra Café, coffee isn’t just a drink—it’s an experience, a
            story brewed in every cup. Founded by siblings An'na and Tam'ma, who
            grew up cherishing the aroma of freshly roasted beans, Ettarra Café
            is the culmination of their shared love for coffee and hospitality.
            Nestled in the heart of Mumbai, Ettarra blends the charm of classic
            Western coffee culture with the richness of South Indian coffee
            traditions. Our café is more than just a place to grab a quick cup;
            it’s a haven for coffee lovers, a cozy escape from the bustling city
            streets, where every sip tells the tale of its origins.
          </p>
          <h2 className="font-bold mb-2">The Coffee We Serve</h2>
          <p className="text-[#5A3E36] mb-4">
            Our beans are handpicked from the lush coffee plantations of
            Chikmagalur, Coorg, Wayanad, and other iconic coffee-growing regions
            in Southern India. These carefully curated beans are roasted to
            perfection to bring out a deep, rich flavor that resonates with our
            commitment to quality. Whether it’s our signature house blend or a
            single-origin brew, each cup is prepared with passion, using
            innovative brewing techniques that honor both tradition and
            modernity. Our menu also offers a delightful fusion of Western baked
            goods and local treats, including the irresistible South Indian
            banana chips that pair perfectly with our coffee.
          </p>
          <h2 className="font-bold mb-2">The Ettarra Experience</h2>
          <p className="text-[#5A3E36] mb-4">
            At Ettarra, we believe in more than just serving coffee. We aim to
            create a community—a warm, welcoming space where conversations flow
            as freely as the coffee. Whether you're here to relax with a book,
            meet friends, or get some work done, Ettarra Café is your go-to spot
            for an unforgettable coffee experience. Come visit us, savor the
            Ettarra difference, and let the taste of our coffee linger with you
            long after you’ve left.
          </p>
        </div>
      </section>

      {/* Our Coffee Section */}
      <section className="bg-[#E6CCB2] py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#8B4513] mb-6">Our Coffee</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-[#5A3E36] mb-2">
                Magic Beans from the Hills
              </h3>
              <p className="text-[#5A3E36]">
                Our addictive magic beverage was first introduced in India in
                Chikmagalur. Legend has it that a Sufi brought and planted these
                beans in the hills, and the rest is history.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#5A3E36] mb-2">
                Tradition Meets Innovation
              </h3>
              <p className="text-[#5A3E36]">
                We celebrate authentic coffee while embracing modern techniques.
                This shows in our beans sourced from traditional plantations and
                our innovative brewing methods.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#5A3E36] mb-2">
                The Ettarra Difference
              </h3>
              <p className="text-[#5A3E36]">
                That cup of joe is complemented here with Western bakes and the
                quintessential South Indian Banana chips—this is where the
                Ettarra difference truly lies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <Coffee className="w-12 h-12 mx-auto text-[#8B4513]" />
            <p className="text-2xl font-bold text-[#5A3E36] mt-2">4.9/5</p>
            <p className="text-[#8B4513]">Zomato rating</p>
          </div>
          <div>
            <Coffee className="w-12 h-12 mx-auto text-[#8B4513]" />
            <p className="text-2xl font-bold text-[#5A3E36] mt-2">25,000+</p>
            <p className="text-[#8B4513]">Cups Served</p>
          </div>
          <div>
            <Coffee className="w-12 h-12 mx-auto text-[#8B4513]" />
            <p className="text-2xl font-bold text-[#5A3E36] mt-2">29,000+</p>
            <p className="text-[#8B4513]">Bowls Banana chips served</p>
          </div>
          <div>
            <Coffee className="w-12 h-12 mx-auto text-[#8B4513]" />
            <p className="text-2xl font-bold text-[#5A3E36] mt-2">
              Featured in
            </p>
            <p className="text-[#8B4513]">Mumbai Foodie, CurlyTails</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-[#E6CCB2] py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#8B4513] mb-6">Visit Us</h2>
          <div>
            <div className="flex items-center mb-4">
              <MapPin className="w-6 h-6 text-[#8B4513] mr-2" />
              <p className="text-[#5A3E36]">
                Juhu Residency Boutique Hotel, Mumbai, Maharashtra 400049
              </p>
            </div>
            <div className="flex items-center mb-4">
              <Phone className="w-6 h-6 text-[#8B4513] mr-2" />
              <p className="text-[#5A3E36]">+91 98256 03145</p>
            </div>
            <div className="flex items-center mb-4">
              <Mail className="w-6 h-6 text-[#8B4513] mr-2" />
              <p className="text-[#5A3E36]">care@ettarracoffee.in</p>
            </div>
            <div className="flex items-center">
              <Clock className="w-6 h-6 text-[#8B4513] mr-2" />
              <p className="text-[#5A3E36]">Open 24/7 for Dine-In</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

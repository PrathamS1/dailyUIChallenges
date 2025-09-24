import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";

// Color theme constants
const COLORS = {
  primary: "#FF6B50",
  secondary: "#3A2C2A",
  accent: "#FFD580",
  background: "#FFE0CB",
  text: {
    primary: "#2B1A15",

    secondary: "#7A3E2B",

    light: "#FFFFFF",
  },
  divider: "#F5D8C4",
};

// Menu items data
const specialItems = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZvb2R8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1484980972926-edee96e0960d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGZvb2R8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1600803907087-f56d462fd26b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fGZvb2R8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzJ8fGZvb2R8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAwfHxmb29kfGVufDB8fDB8fHww",
  },
];

const menuItems = {
  topPicks: [
    {
      name: "Paneer Butter Masala",
      ingredients: "Soft paneer, tomato-butter gravy, Indian spices",
      price: "₹340",
      image:
        "https://images.unsplash.com/photo-1701579231378-3726490a407b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFuZWVyJTIwYnV0dGVyJTIwbWFzYWxhfGVufDB8fDB8fHww",
    },
    {
      name: "Pasta Alfredo",
      ingredients: "Creamy white sauce, parmesan, fettuccine pasta",
      price: "₹420",
      image:
        "https://images.unsplash.com/photo-1662197480393-2a82030b7b83?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UGFzdGElMjBBbGZyZWRvfGVufDB8fDB8fHww",
    },
    {
      name: "Ratatouille",
      ingredients: "French-style roasted vegetables, herbs, olive oil",
      price: "₹460",
      image:
        "https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UmF0YXRvdWlsbGV8ZW58MHx8MHx8fDA%3D",
    },
    {
      name: "Kung Pao Chicken",
      ingredients: "Spicy stir-fried chicken, peanuts, Sichuan chili",
      price: "₹490",
      image:
        "https://www.chilipeppermadness.com/wp-content/uploads/2021/03/Kung-Pao-Chicken-SQ.jpg",
    },
    {
      name: "Hyderabadi Biryani",
      ingredients: "Fragrant basmati rice, saffron, Indian spices",
      price: "₹450",
      image:
        "https://images.unsplash.com/photo-1701579231305-d84d8af9a3fd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SHlkZXJhYmFkaSUyMEJpcnlhbml8ZW58MHx8MHx8fDA%3D",
    },
    {
      name: "Coq au Vin",
      ingredients: "French braised chicken, red wine, mushrooms",
      price: "₹580",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9GkYT_fC4ToUVI6DzQ9qwf9EJ-Rp1vgOlpw&s",
    },
  ],

  vegetarian: [
    {
      name: "Margherita Pizza",
      ingredients: "Tomato sauce, mozzarella, fresh basil",
      price: "₹360",
      image:
        "https://images.unsplash.com/photo-1680405620826-83b0f0f61b28?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fE1hcmdoZXJpdGElMjBQaXp6YXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Vegetable Spring Rolls",
      ingredients: "Crispy rolls, mixed veggies, sweet chili sauce",
      price: "₹240",
      image:
        "https://saltedmint.com/wp-content/uploads/2024/01/Vegetable-Spring-Rolls-4.jpg",
    },
    {
      name: "Palak Paneer",
      ingredients: "Spinach purée, paneer cubes, mild spices",
      price: "₹320",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH_DiTDlIMrrunji-AQ9P-qyK445J27gkTtQ&s",
    },
    {
      name: "Ravioli Ricotta e Spinaci",
      ingredients: "House-made ravioli, ricotta, spinach, sage butter",
      price: "₹440",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUyR3WhEPlSM5f6oxSAdpNF-ZuqUL7EPvGzw&s",
    },
    {
      name: "Vegetable Manchurian",
      ingredients: "Fried vegetable balls, Indo-Chinese soy gravy",
      price: "₹280",
      image: "https://i.ytimg.com/vi/xkMbJCtaaqA/maxresdefault.jpg",
    },
    {
      name: "Ratatouille Provençal",
      ingredients: "Classic French dish, eggplant, zucchini, herbs",
      price: "₹400",
      image:
        "https://ellerepublic.de/wp-content/uploads/2024/06/Ratatouille-Rezept-3-of-4.jpg",
    },
    {
      name: "Dosa with Sambar",
      ingredients: "Crispy South Indian crepe, lentil stew, chutneys",
      price: "₹220",
      image:
        "https://www.foodiaq.com/wp-content/uploads/2024/11/Dosa-with-sambar.jpg",
    },
    {
      name: "Caprese Salad",
      ingredients: "Fresh mozzarella, tomatoes, basil, olive oil",
      price: "₹300",
      image:
        "https://www.thespruceeats.com/thmb/2pjgFA7_nbZtlXr68BECvf6fO48=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/caprese-salad-tomato-salad-2217097-hero-03-75a0b89b30aa4a52b10fe4fdd9abfeb5.jpg",
    },
  ],

  mainCourse: [
    {
      name: "Paneer Butter Masala",
      ingredients: "Paneer cubes in rich tomato-butter gravy",
      price: "₹280",
      image:
        "https://images.unsplash.com/photo-1701579231378-3726490a407b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFuZWVyJTIwYnV0dGVyJTIwbWFzYWxhfGVufDB8fDB8fHww",
    },
    {
      name: "Chicken Tikka Masala",
      ingredients: "Char-grilled chicken in spiced tomato cream sauce",
      price: "₹320",
      image:
        "https://www.seriouseats.com/thmb/DbQHUK2yNCALBnZE-H1M2AKLkok=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/chicken-tikka-masala-for-the-grill-recipe-hero-2_1-cb493f49e30140efbffec162d5f2d1d7.JPG",
    },
    {
      name: "Dal Makhani",
      ingredients: "Slow-cooked black lentils with butter & cream",
      price: "₹220",
      image:
        "https://www.pureindianfoods.com/cdn/shop/articles/Dal-Makhani.webp?v=1753479167",
    },
    {
      name: "Mutton Rogan Josh",
      ingredients: "Tender lamb in Kashmiri red curry",
      price: "₹420",
      image:
        "https://s3-ap-south-1.amazonaws.com/betterbutterbucket-silver/madhumita-sathishkumar15537787405c9cc834723a8.jpeg",
    },
    {
      name: "Palak Paneer",
      ingredients: "Paneer simmered in spinach purée with spices",
      price: "₹260",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH_DiTDlIMrrunji-AQ9P-qyK445J27gkTtQ&s",
    },
    {
      name: "Butter Chicken",
      ingredients: "Smoky chicken in creamy butter-tomato gravy",
      price: "₹350",
      image:
        "https://www.spiceroots.com/spiceroots/wp-content/uploads/2008/05/butterchicken-1024x682-1.jpg",
    },
    {
      name: "Vegetable Korma",
      ingredients: "Seasonal veggies in mild cashew-cream sauce",
      price: "₹240",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlkGfJSQKetatcjZQzG_94Ev1XUZOhocJSgg&s",
    },
  ],
  breads: [
    {
      name: "Tandoori Roti",
      ingredients: "Whole wheat flatbread cooked in tandoor",
      price: "₹40",
      image:
        "https://cdn.shopify.com/s/files/1/0551/8009/9722/files/4_b1ca596e-51a9-4fae-b067-071a80f26a14_480x480.png?v=1716792199",
    },
    {
      name: "Butter Naan",
      ingredients: "Soft refined flour naan glazed with butter",
      price: "₹60",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu0yBjOvU4BwUI5r6tJhYU5CQlAYOrqHphIg&s",
    },
    {
      name: "Garlic Naan",
      ingredients: "Naan infused with garlic & coriander",
      price: "₹70",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv57y0qUwzd3IGSXbs5ZwwGF5a-zVHnmgmEQ&s",
    },
    {
      name: "Lachha Paratha",
      ingredients: "Multi-layered flaky tawa bread",
      price: "₹80",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOFBytmultfdbFium2PSR7mRx_N-MRUE73Rw&s",
    },
    {
      name: "Missi Roti",
      ingredients: "Gram flour & wheat roti with spices",
      price: "₹55",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmWs9sg91Eu33KAfU2PqW_VOqULn9YxqQw_Q&s",
    },
    {
      name: "Stuffed Kulcha",
      ingredients: "Amritsari kulcha with spiced potato filling",
      price: "₹90",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTviQaZux0-q1Dg7SqYZfkUbP9rFRYQmjW4Bw&s",
    },
  ],
};

export default function FoodMenu() {
  return (
    <div className="min-h-screen bg-[#FFE0CB] py-8 px-4 relative">
      <div className="absolute inset-10 flex items-center gap-4 h-fit w-fit justify-center">
      <img src="/rest-logo.png" className="w-14 h-14 object-cover rounded-full shadow-lg" alt="restaurant logo" />
      <h3
        className="text-2xl font-bold font-['Playfair_Display']"
        style={{ color: COLORS.text.primary }}
        >
        Royal Delicacy
      </h3>
        </div>
      <nav
        className={`max-w-xl mx-auto mb-12 rounded-full shadow-2xl py-4 px-8 sticky top-4 z-50`}
        style={{ backgroundColor: COLORS.primary }}
      >
        <ul className="flex justify-around items-center">
          {["Home", "Menu", "About Us", "Contact"].map((item) => (
            <li key={item}>
              <span
                className="font-regular font-['Lato'] transition-colors cursor-pointer px-8 rounded-full py-2"
                style={{
                  color: item === "Menu" ? "inherit" : COLORS.text.light,
                  backgroundColor:
                    item === "Menu" ? COLORS.background : "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = COLORS.secondary;
                  e.currentTarget.style.backgroundColor = COLORS.background;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget.style.color =
                    item === "Menu" ? "inherit" : COLORS.text.light),
                    (e.currentTarget.style.backgroundColor =
                      item === "Menu" ? COLORS.background : "transparent");
                }}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      </nav>

      {/* Header section */}
      <header className="max-w-6xl mx-auto mb-16 flex flex-col items-center justify-center">
        <h1
          className="text-6xl font-bold text-center mb-12 max-w-2xl font-['Playfair_Display']"
          style={{ color: COLORS.secondary }}
        >
          From Our Kitchen to Your Heart{" "}
          <span className="block text-xl mt-4 font-normal text-gray-600 font-['Lato']">
            Experience Fine Dining at its Best <br />A Journey of Taste,
            Texture, and Aroma
          </span>
        </h1>
        <div className="relative flex justify-center mb-16 w-fit">
          {specialItems.map((item, index) => {
            const angles = [-6, 5, -6, 5, -6];
            return (
              <motion.div
                key={item.id}
                className="relative rounded-2xl overflow-hidden cursor-pointer -ml-10 first:ml-0"
                style={{
                  rotate: `${angles[index] || 0}deg`,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.55)",
                  transformOrigin: "bottom center",
                  zIndex: specialItems.length - index,
                }}
                whileHover={{
                  scale: 1.08,
                  y: -20,
                  zIndex: 20,
                  transition: { duration: 0.25 },
                }}
              >
                <img
                  src={item.image}
                  alt="Special Item"
                  className="w-[13rem] h-[16rem] object-cover rounded-xl"
                />
              </motion.div>
            );
          })}
        </div>
      </header>

      {/* Menu sections*/}
      <div className="max-w-6xl mx-auto">
        {/* Top picks section */}
        <section className="mb-20 px-6 md:px-12">
          <div className="flex items-center mb-12">
            <div className="h-[2px] flex-grow bg-gradient-to-r from-transparent via-[#b5651d] to-transparent"></div>
            <h2
              className={`text-3xl md:text-4xl font-bold px-6 tracking-wide uppercase font-['Playfair_Display']`}
              style={{ color: COLORS.text.secondary }}
            >
              Chef's Top Picks
            </h2>
            <div className="h-[2px] flex-grow bg-gradient-to-r from-transparent via-[#b5651d] to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {menuItems.topPicks.map((item) => (
              <div
                key={item.name}
                className="flex gap-4 items-start border-b"
                style={{ borderColor: COLORS.divider }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md shadow-sm group-hover:scale-105 transition-transform duration-300"
                />

                <div className="flex-1">
                  <div className="flex justify-between items-baseline font-['Lato']">
                    <h3
                      style={{ color: COLORS.text.secondary }}
                      className="text-lg font-semibold"
                    >
                      {item.name}
                    </h3>
                    <p
                      style={{ color: COLORS.primary }}
                      className="text-md font-bold whitespace-nowrap ml-4"
                    >
                      {item.price}
                    </p>
                  </div>
                  <p
                    style={{ color: COLORS.secondary }}
                    className="mt-1 text-sm italic leading-snug"
                  >
                    {item.ingredients}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Vegetarian section */}
        <section className="mb-20 px-6 md:px-12">
          <div className="flex items-center mb-12">
            <div className="h-[2px] flex-grow bg-gradient-to-r from-transparent via-[#b5651d] to-transparent"></div>
            <h2
              className="text-3xl md:text-4xl font-bold px-6 tracking-wide uppercase font-['Playfair_Display']"
              style={{ color: COLORS.text.secondary }}
            >
              Vegetarian Delights
            </h2>
            <div className="h-[2px] flex-grow bg-gradient-to-r from-transparent via-[#b5651d] to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {menuItems.vegetarian.map((item) => (
              <div
                key={item.name}
                className="flex gap-4 items-start border-b"
                style={{ borderColor: COLORS.divider }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md shadow-sm group-hover:scale-105 transition-transform duration-300"
                />

                <div className="flex-1">
                  <div className="flex justify-between items-baseline font-['Lato']">
                    <h3
                      style={{ color: COLORS.text.secondary }}
                      className="text-lg font-semibold"
                    >
                      {item.name}
                    </h3>
                    <p
                      style={{ color: COLORS.primary }}
                      className="text-md font-bold whitespace-nowrap ml-4"
                    >
                      {item.price}
                    </p>
                  </div>
                  <p
                    style={{ color: COLORS.secondary }}
                    className="mt-1 text-sm italic leading-snug"
                  >
                    {item.ingredients}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* main course section */}
        <section className="mb-20 px-6 md:px-12">
          <div className="flex items-center mb-12">
            <div className="h-[2px] flex-grow bg-gradient-to-r from-transparent via-[#b5651d] to-transparent"></div>
            <h2
              className="text-3xl md:text-4xl font-bold px-6 tracking-wide uppercase font-['Playfair_Display']"
              style={{ color: COLORS.text.secondary }}
            >
              Main Course
            </h2>
            <div className="h-[2px] flex-grow bg-gradient-to-r from-transparent via-[#b5651d] to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {menuItems.mainCourse.map((item) => (
              <div
                key={item.name}
                className="flex gap-4 items-start border-b"
                style={{ borderColor: COLORS.divider }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md shadow-sm group-hover:scale-105 transition-transform duration-300"
                />

                <div className="flex-1">
                  <div className="flex justify-between items-baseline font-['Lato']">
                    <h3
                      style={{ color: COLORS.text.secondary }}
                      className="text-lg font-semibold"
                    >
                      {item.name}
                    </h3>
                    <p
                      style={{ color: COLORS.primary }}
                      className="text-md font-bold whitespace-nowrap ml-4"
                    >
                      {item.price}
                    </p>
                  </div>
                  <p
                    style={{ color: COLORS.secondary }}
                    className="mt-1 text-sm italic leading-snug"
                  >
                    {item.ingredients}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* breads section */}
        <section className="mb-20 px-6 md:px-12">
          <div className="flex items-center mb-12">
            <div className="h-[2px] flex-grow bg-gradient-to-r from-transparent via-[#b5651d] to-transparent"></div>
            <h2
              className="text-3xl md:text-4xl font-bold px-6 tracking-wide uppercase font-['Playfair_Display']"
              style={{ color: COLORS.text.secondary }}
            >
              Breads
            </h2>
            <div className="h-[2px] flex-grow bg-gradient-to-r from-transparent via-[#b5651d] to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {menuItems.breads.map((item) => (
              <div
                key={item.name}
                className="flex gap-4 items-start border-b"
                style={{ borderColor: COLORS.divider }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md shadow-sm group-hover:scale-105 transition-transform duration-300"
                />

                <div className="flex-1">
                  <div className="flex justify-between items-baseline font-['Lato']">
                    <h3
                      style={{ color: COLORS.text.secondary }}
                      className="text-lg font-semibold"
                    >
                      {item.name}
                    </h3>
                    <p
                      style={{ color: COLORS.primary }}
                      className="text-md font-bold whitespace-nowrap ml-4"
                    >
                      {item.price}
                    </p>
                  </div>
                  <p
                    style={{ color: COLORS.secondary }}
                    className="mt-1 text-sm italic leading-snug"
                  >
                    {item.ingredients}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <footer className="bg-secondary text-white mt-20">
        <div
          className="relative bg-cover bg-center py-20 px-6 md:px-16 text-center z-10"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZvb2QlMjByZXN0YXVyYW50fGVufDB8fDB8fHww')",
          }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-3xl mx-auto">
            <h2
              className="text-4xl md:text-6xl font-extrabold tracking-wide mb-6 font-['Lato']"
              style={{ color: COLORS.accent }}
            >
              “Crafting Flavors, Creating Memories”
            </h2>
            <p className="text-lg md:text-xl text-white leading-relaxed font-['Lato']">
              Our passion is more than food — it’s about curating an experience
              of warmth, authenticity, and trust. At{" "}
              <span className="font-semibold">Royal Delicacy</span>, every dish
              is a promise of freshness, flavor, and hospitality.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-16 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3
              className="text-2xl font-bold mb-4 font-['Playfair_Display']"
              style={{ color: COLORS.text.primary }}
            >
              Royal Delicacy
            </h3>
            <p className="text-md text-gray-700 leading-relaxed font-['Lato']">
              Serving authentic flavors since 1998. Our chefs bring you a
              perfect blend of tradition and innovation in every plate.
            </p>
          </div>

          <div>
            <h4
              className="text-lg font-semibold mb-4 font-['Lato']"
              style={{ color: COLORS.text.primary }}
            >
              Explore
            </h4>
            <ul className="space-y-2 text-[#7A3E2B] w-fit font-['Lato']">
              <li className="hover:text-[#FF6B50] transition-colors cursor-pointer">
                Menu
              </li>
              <li className="hover:text-[#FF6B50] transition-colors cursor-pointer">
                About Us
              </li>
              <li className="hover:text-[#FF6B50] transition-colors cursor-pointer">
                Reservations
              </li>
              <li className="hover:text-[#FF6B50] transition-colors cursor-pointer">
                Contact
              </li>
            </ul>
          </div>

          <div>
            <h4
              className="text-lg font-semibold mb-4 font-['Lato']"
              style={{ color: COLORS.text.primary }}
            >
              Get in Touch
            </h4>
            <ul className="space-y-2 text-gray-700 font-['Lato']">
              <li className="flex items-center gap-2">
                <Phone size={18} /> +91 11122 21122
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} /> contact@royaldelicacy.com
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={18} /> Building No. 42, 4th Street, Pune
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              <a
                href="#"
                className="p-2 rounded-full bg-[#FF6B50] text-secondary hover:bg-[#3A2C2A] hover:text-secondary transition-colors"
              >
                <FaFacebook size={18} />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-[#FF6B50] text-secondary hover:bg-[#3A2C2A] hover:text-secondary transition-colors"
              >
                <AiFillInstagram size={18} />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-[#FF6B50] text-secondary hover:bg-[#3A2C2A] hover:text-secondary transition-colors"
              >
                <FaSquareXTwitter size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#3A2C2A] text-center py-4 text-sm text-[#2B1A15] font-['Lato']">
          © {new Date().getFullYear()} Your Restaurant. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

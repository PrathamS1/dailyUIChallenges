import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Heart, User, Search, Minus, X, ChevronUp, ChevronDown } from "lucide-react";
import BackToHome from "./BackToHome";
import { IoIceCream } from "react-icons/io5";

// Melting SVG Component
const MeltingSVG = () => (
  <svg
    className="absolute top-0 left-0 w-96 h-96 opacity-100"
    viewBox="0 0 400 400"
    fill="none"
  >
    <motion.path
      d="M0,0 Q50,100 0,200 Q80,250 0,300 Q60,350 0,400 L0,0 Z"
      fill="url(#meltGradient)"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.3 }}
      transition={{ duration: 2, ease: "easeOut" }}
    />
    <defs>
      <linearGradient id="meltGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#DDFEA0" stopOpacity="0.8" />
        <stop offset="50%" stopColor="#8BFFDC" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#22c55e" stopOpacity="0.4" />
      </linearGradient>
    </defs>
  </svg>
);

// Ice Cream Stamp Component with real images
const IceCreamStamp = ({
  className,
  delay = 0,
  imageUrl,
  size = "w-16 h-16",
}) => (
  <motion.div
    initial={{ scale: 0, rotate: -180 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ delay, type: "spring", stiffness: 100 }}
    className={`absolute ${className}`}
  >
    <img
      src={imageUrl}
      alt="Ice cream"
      className={`${size} object-contain rounded-full shadow-lg`}
    />
  </motion.div>
);

const IceCreamShop = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedCake, setSelectedCake] = useState(0);

  // Cake data
  const cakeData = [
    { id: 101, name: "Chocolate Fudge Cake", price: 24.99, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=600&fit=crop", description: "Rich chocolate cake with layers of fudge" },
    { id: 102, name: "Vanilla Birthday Cake", price: 22.99, image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&h=600&fit=crop", description: "Classic vanilla cake perfect for celebrations" },
    { id: 103, name: "Red Velvet Delight", price: 26.99, image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&h=600&fit=crop", description: "Smooth red velvet with cream cheese frosting" },
    { id: 104, name: "Strawberry Shortcake", price: 23.99, image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=600&fit=crop", description: "Fresh strawberries with fluffy cream" },
    { id: 105, name: "Lemon Drizzle Cake", price: 21.99, image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=600&h=600&fit=crop", description: "Zesty lemon cake with sweet glaze" },
    { id: 106, name: "Carrot Cake Supreme", price: 25.99, image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&h=600&fit=crop", description: "Moist carrot cake with walnuts and cream cheese" },
    { id: 107, name: "Black Forest Cake", price: 28.99, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&h=600&fit=crop", description: "Chocolate cake with cherries and whipped cream" },
    { id: 108, name: "Tiramisu Cake", price: 27.99, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&h=600&fit=crop", description: "Coffee-soaked layers with mascarpone" },
    { id: 109, name: "Cheesecake Classic", price: 24.99, image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&h=600&fit=crop", description: "Creamy New York style cheesecake" },
    { id: 110, name: "Funfetti Celebration", price: 23.99, image: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=600&h=600&fit=crop", description: "Colorful sprinkle cake for any party" },
    { id: 111, name: "Chocolate Mousse Cake", price: 29.99, image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&h=600&fit=crop", description: "Light chocolate mousse with dark chocolate" },
    { id: 112, name: "Banana Cream Cake", price: 22.99, image: "https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=600&h=600&fit=crop", description: "Fresh banana layers with vanilla cream" },
    { id: 113, name: "Opera Cake", price: 31.99, image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=600&h=600&fit=crop", description: "Elegant French cake with chocolate glaze" },
    { id: 114, name: "Coconut Layer Cake", price: 24.99, image: "https://images.unsplash.com/photo-1607478900766-efe13248b125?w=600&h=600&fit=crop", description: "Tropical coconut cake with coconut flakes" },
    { id: 115, name: "Pineapple Upside Down", price: 23.99, image: "https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=600&h=600&fit=crop", description: "Classic upside-down cake with caramelized pineapple" }
  ];

  // Ice cream data with 10 items per category
  const iceCreamData = {
    scoops: [
      { id: 1, name: "Vanilla Bean", price: 4.99, image: "https://as1.ftcdn.net/jpg/01/18/71/98/1000_F_118719864_Kzba5xhMdIZ8A62q5BXML2EIh513UdFf.jpg" },
      { id: 2, name: "Chocolate Fudge", price: 5.49, image: "https://img.pikbest.com/png-images/20241027/strawberry-ice-cream-scoop-isolated-on-transparent-or-white-background-png_11012520.png!sw800" },
      { id: 3, name: "Strawberry", price: 5.29, image: "https://thumbs.dreamstime.com/b/solitary-pink-strawberry-ice-cream-scoop-isolated-white-background-top-view-371965843.jpg" },
      { id: 4, name: "Mint Chip", price: 5.79, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV_dJ3kHftIzO6XhbUCxwe1hTO1mpBZcyiYOh5c4ovy4GFaS7KS9fxt0_GeqfTu_gwvy8&usqp=CAU" },
      { id: 5, name: "Cookies & Cream", price: 6.29, image: "https://www.shutterstock.com/image-photo/coffee-liqueur-ice-cream-scoop-600nw-2405211763.jpg" },
      { id: 6, name: "Pistachio", price: 6.49, image: "https://img.freepik.com/premium-psd/mango-ice-cream-scoop-isolated-transparent-background_1319831-1188.jpg?w=360" },
      { id: 7, name: "Rocky Road", price: 6.79, image: "https://static.vecteezy.com/system/resources/previews/055/985/076/non_2x/creamy-scoop-of-rainbow-ice-cream-bursting-with-colors-isolated-on-a-transparent-background-free-png.png" },
      { id: 8, name: "Caramel Swirl", price: 5.99, image: "https://www.shutterstock.com/image-photo/caramel-swirl-ice-cream-scoop-600nw-2594180251.jpg" },
      { id: 9, name: "Blueberry Cheesecake", price: 6.99, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKYdVwsl984seaCr4LUPyu2nJF8F57alEe7Q&s" },
      { id: 10, name: "Mango Sorbet", price: 5.49, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGlz40tiT12c_2E3N1ZQMRxaBT4Kim1mlQCA&s" }
    ],
    cones: [
      { id: 11, name: "Classic Waffle", price: 2.99, image: "/ice2.png" },
      { id: 12, name: "Sugar Cone", price: 1.99, image: "https://images.unsplash.com/photo-1614014077943-840960ce6694?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGljZSUyMGNyZWFtfGVufDB8MXwwfHx8Mg%3D%3D?w=300&h=600&fit=crop&crop=bottom" },
      { id: 13, name: "Chocolate Dipped", price: 3.49, image: "https://images.unsplash.com/photo-1576506295286-5cda18df43e7?w=300&h=500&fit=crop&crop=center" },
      { id: 14, name: "Pretzel Cone", price: 3.99, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnzH-h0Hyxf661F1Cy1b0VWRfmG_YIRQKvSA&s?w=300&h=500&fit=crop&crop=center" },
      { id: 15, name: "Waffle Bowl", price: 3.29, image: "https://images.unsplash.com/photo-1695234502713-9084080ea54f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fGljZSUyMGNyZWFtfGVufDB8MXwwfHx8Mg%3D%3D" },
      { id: 16, name: "Coconut Cone", price: 4.49, image: "https://images.unsplash.com/photo-1683575755175-ee135650246a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI2fHxpY2UlMjBjcmVhbXxlbnwwfDF8MHx8fDI%3D" },
      { id: 17, name: "Cinnamon Cone", price: 3.79, image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=300&h=500&fit=crop&crop=center" },
      { id: 18, name: "Honey Cone", price: 3.19, image: "https://images.unsplash.com/photo-1657312135093-31035a7044cf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGljZSUyMGNyZWFtJTIwY29uZXxlbnwwfDF8MHx8fDI%3D" },
      { id: 19, name: "Strawberry Cone", price: 3.89, image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=300&h=500&fit=crop&crop=center" },
      { id: 20, name: "Chocolate Waffle", price: 4.29, image: "https://images.unsplash.com/photo-1692757093911-a01734108a94?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGljZSUyMGNyZWFtJTIwY29uZXxlbnwwfDF8MHx8fDI%3D" }
    ],
    sundaes: [
      { id: 21, name: "Hot Fudge Sundae", price: 8.99, image: "https://images.unsplash.com/photo-1560008581-09826d1de69e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aWNlJTIwY3JlYW0lMjBzdW5kYWV8ZW58MHwxfDB8fHwy" },
      { id: 22, name: "Caramel Delight", price: 9.49, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=500&fit=crop&crop=center" },
      { id: 23, name: "Berry Blast", price: 9.99, image: "https://images.unsplash.com/photo-1646318754907-dc7c0d236a97?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aWNlJTIwY3JlYW0lMjBzdW5kYWV8ZW58MHwxfDB8fHwy" },
      { id: 24, name: "Chocolate Volcano", price: 10.99, image: "https://images.unsplash.com/photo-1669127045641-0ae683639570?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aWNlJTIwY3JlYW0lMjBzdW5kYWV8ZW58MHwxfDB8fHwy" },
      { id: 25, name: "Banana Split", price: 11.49, image: "https://images.unsplash.com/photo-1718985344972-d0eaf1ba5d72?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aWNlJTIwY3JlYW0lMjBzdW5kYWV8ZW58MHwxfDB8fHwy" },
      { id: 26, name: "Strawberry Dream", price: 9.79, image: "https://images.unsplash.com/photo-1698129863040-3bbb7791f4b3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGljZSUyMGNyZWFtJTIwc3VuZGFlfGVufDB8MXwwfHx8Mg%3D%3D" },
      { id: 27, name: "Oreo Paradise", price: 10.29, image: "https://images.unsplash.com/photo-1698129841252-8c959a3696c3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGljZSUyMGNyZWFtJTIwc3VuZGFlfGVufDB8MXwwfHx8Mg%3D%3D" },
      { id: 28, name: "Peanut Butter Cup", price: 10.79, image: "https://images.unsplash.com/photo-1579462107238-0ff854b04810?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fGljZSUyMGNyZWFtJTIwc3VuZGFlfGVufDB8MXwwfHx8Mg%3D%3D" },
      { id: 29, name: "Cookie Dough Madness", price: 11.99, image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=500&fit=crop&crop=center" },
      { id: 30, name: "Triple Chocolate", price: 12.49, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBmk8O_VMc4Ab-vcC0JbpeOEjfMo9DB29a5A&s?w=400&h=500&fit=crop&crop=center" }
    ]
  };

  const [selectedCategory, setSelectedCategory] = useState('scoops');

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(cartItem =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      } else {
        const newCart = prevCart.filter(cartItem => cartItem.id !== itemId);
        if (newCart.length === 0) {
          setShowCart(false);
        }
        return newCart;
      }
    });
  };

  const getItemQuantity = (itemId) => {
    const item = cart.find(cartItem => cartItem.id === itemId);
    return item ? item.quantity : 0;
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 relative overflow-hidden" style={{background: 'linear-gradient(to bottom right, #f0fdf4, #ecfdf5, #ccfbf1)'}}>
      <BackToHome />

      {/* Melting Effect */}
      <MeltingSVG />

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6">
        {/* Logo */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center space-x-2"
        >
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white">
            <span className="text-gray-700 font-bold text-lg">
                <IoIceCream size={36} />
            </span>
          </div>
          <span className="text-xl font-bold text-black">
            Scoopy
          </span>
        </motion.div>

        {/* Navigation Menu */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`hidden md:flex items-center space-x-2 ml-12 px-8 py-3 rounded-full transition-all duration-300 ${
            isScrolled 
              ? 'bg-[#f7931e]/40 backdrop-blur-md shadow-lg border border-white/30' 
              : ''
          }`}
        >
          <a
            href="#"
            className="text-gray-700 hover:bg-[#C3FEB3] px-4 rounded-4xl py-1 font-medium transition-colors"
          >
            Home
          </a>
          <a
            href="#"
            className="text-gray-700 hover:bg-[#C3FEB3] px-4 rounded-4xl py-1 font-medium transition-colors"
          >
            Flavors
          </a>
          <a
            href="#"
            className="text-gray-700 hover:bg-[#C3FEB3] px-4 rounded-4xl py-1 font-medium transition-colors"
          >
            Cakes
          </a>
          <a
            href="#"
            className="text-gray-700 hover:bg-[#C3FEB3] px-4 rounded-4xl py-1 font-medium transition-colors"
          >
            Catering
          </a>
          <a
            href="#"
            className="text-gray-700 hover:bg-[#C3FEB3] px-4 rounded-4xl py-1 font-medium transition-colors"
          >
            About
          </a>
        </motion.div>

        {/* Right Icons */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center space-x-4 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-white/30"
        >
          <Search className="w-6 h-6 text-gray-700 hover:text-green-600 cursor-pointer transition-colors" />
          <Heart className="w-6 h-6 text-gray-700 hover:text-green-600 cursor-pointer transition-colors" />
          <User className="w-6 h-6 text-gray-700 hover:text-green-600 cursor-pointer transition-colors" />
          <div className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-green-600 cursor-pointer transition-colors" />
            <span className="absolute -top-2 -right-2 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center" style={{backgroundColor: '#ff6b35'}}>
              {getTotalItems()}
            </span>
          </div>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center px-8 bg-gradient-to-br from-[#DDFEA0]/20 to-[#8BFFDC]/20 pt-20">
      <div className="absolute bg-white/50 backdrop-blur-sm w-50 h-50 rounded-full -bottom-24 left-1/2 -translate-x-1/2 pointer-events-none z-50">

      </div>

        {/* Ice Cream Stamps scattered around hero */}
        <IceCreamStamp
          className="top-32 left-16 md:left-24"
          delay={2.0}
          imageUrl="https://as1.ftcdn.net/jpg/01/18/71/98/1000_F_118719864_Kzba5xhMdIZ8A62q5BXML2EIh513UdFf.jpg"
          size="w-12 h-12 md:w-16 md:h-16"
        />
        <IceCreamStamp
          className="top-40 right-20 md:right-32"
          delay={2.2}
          imageUrl="https://img.pikbest.com/png-images/20241027/strawberry-ice-cream-scoop-isolated-on-transparent-or-white-background-png_11012520.png!sw800"
          size="w-10 h-10 md:w-14 md:h-14"
        />
        <IceCreamStamp
          className="top-56 left-8 md:left-16"
          delay={2.4}
          imageUrl="https://thumbs.dreamstime.com/b/solitary-pink-strawberry-ice-cream-scoop-isolated-white-background-top-view-371965843.jpg"
          size="w-8 h-8 md:w-12 md:h-12"
        />
        <IceCreamStamp
          className="top-28 right-8 md:right-16"
          delay={2.6}
          imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV_dJ3kHftIzO6XhbUCxwe1hTO1mpBZcyiYOh5c4ovy4GFaS7KS9fxt0_GeqfTu_gwvy8&usqp=CAU"
          size="w-14 h-14 md:w-18 md:h-18"
        />
        <IceCreamStamp
          className="top-72 left-32 md:left-48"
          delay={2.8}
          imageUrl="https://www.shutterstock.com/image-photo/coffee-liqueur-ice-cream-scoop-600nw-2405211763.jpg"
          size="w-10 h-10 md:w-14 md:h-14"
        />
        <IceCreamStamp
          className="top-80 right-24 md:right-40"
          delay={3.0}
          imageUrl="https://img.freepik.com/premium-psd/mango-ice-cream-scoop-isolated-transparent-background_1319831-1188.jpg?w=360"
          size="w-12 h-12 md:w-16 md:h-16"
        />
        <IceCreamStamp
          className="top-96 left-20 md:left-36"
          delay={3.2}
          imageUrl="https://static.vecteezy.com/system/resources/previews/055/985/076/non_2x/creamy-scoop-of-rainbow-ice-cream-bursting-with-colors-isolated-on-a-transparent-background-free-png.png"
          size="w-8 h-8 md:w-12 md:h-12"
        />
        <IceCreamStamp
          className="top-52 right-48 md:right-64 hidden md:block"
          delay={3.4}
          imageUrl="https://www.shutterstock.com/image-photo/caramel-swirl-ice-cream-scoop-600nw-2594180251.jpg"
          size="w-10 h-10 md:w-14 md:h-14"
        />
        <IceCreamStamp
          className="top-36 left-48 md:left-72 hidden md:block"
          delay={3.6}
          imageUrl="https://www.shutterstock.com/image-photo/caramel-swirl-ice-cream-scoop-600nw-2594180251.jpg"
          size="w-12 h-12 md:w-16 md:h-16"
        />
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold mt-10 bagel-fat-one-regular">
            <span className="text-black">
              Where Every Day
            </span>
            <br />
            <span className="text-black">
              is Sundae
            </span>
          </h1>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ scale: 0, y: 50, opacity: 0, rotateX: -90 }}
          animate={{ scale: 1, y: 0, opacity: 1, rotateX: 0 }}
          transition={{
            duration: 0.8,
            delay: 1.2,
            type: "spring",
            stiffness: 200,
            damping: 15,
            opacity: { duration: 0.8, delay: 1.2, ease: "easeOut" }
          }}
          whileHover={{ 
            scale: 1.08, 
            y: -5,
            boxShadow: "0 20px 40px rgba(247, 147, 30, 0.3)",
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95, y: 0 }}
          className="relative text-white z-50 px-12 py-4 rounded-full text-sm font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 mb-16 overflow-hidden group"
          style={{background: 'linear-gradient(to right, #ff6b35, #f7931e)'}}
        >
          {/* Animated background overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-400 opacity-0 group-hover:opacity-100"
            initial={{ x: "-100%" }}
            whileHover={{ x: "0%" }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Button text with subtle animation */}
          <motion.span
            className="relative z-10 flex items-center gap-2"
            whileHover={{ x: 2 }}
            transition={{ duration: 0.2 }}
          >
            Create Your Own Sundae
          </motion.span>
        </motion.button>

        {/* Ice Cream Display - 5 Ice Creams Layout */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="relative w-full max-w-4xl mx-auto h-96"
        >
          <motion.div
            initial={{ scale: 0, rotate: 25 }}
            animate={{ scale: 1, rotate: 55 }}
            transition={{
              scale: { duration: 0.8, delay: 1.8 },
              rotate: { duration: 0.8, delay: 1.8 },
            }}
            style={{ transformOrigin: "bottom center" }}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20"
          >
            <motion.img
              src="/ice5.png"
              alt="Main ice cream"
              className="w-full h-[24rem] object-cover drop-shadow-2xl"
            />
          </motion.div>
          <motion.div
            initial={{ scale: 0, rotate: 25 }}
            animate={{ scale: 1, rotate: 30 }}
            transition={{
              scale: { duration: 0.8, delay: 1.8 },
              rotate: { duration: 0.8, delay: 1.8 },
            }}
            style={{ transformOrigin: "bottom center" }}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20"
          >
            <motion.img
              src="/ice2.png"
              alt="Main ice cream"
              className="w-full h-[28rem] object-cover drop-shadow-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: -55 }}
            transition={{
              scale: { duration: 0.8, delay: 1.6 },
              rotate: { duration: 0.8, delay: 1.6 },
            }}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20"
            style={{ transformOrigin: "bottom center" }}
          >
            <motion.img
              src="/ice4.png"
              alt="Main ice cream"
              className="w-full h-[24rem] object-cover drop-shadow-2xl"
            />
          </motion.div>
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: -30 }}
            transition={{
              scale: { duration: 0.8, delay: 1.6 },
              rotate: { duration: 0.8, delay: 1.6 },
            }}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20"
            style={{ transformOrigin: "bottom center" }}
          >
            <motion.img
              src="/ice3.png"
              alt="Main ice cream"
              className="w-full h-[26rem] object-cover drop-shadow-2xl"
            />
          </motion.div>

          <motion.div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20">
            <motion.img
              src="/ice2.png"
              alt="Main ice cream"
              className="w-full h-[32rem] object-cover drop-shadow-2xl"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Ice Cream Listing Section */}
      <div className="relative z-10 py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-black">
                Our Delicious
              </span>
              <br />
              <span className="text-black">
                Ice Cream Menu
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              From classic vanilla to the wildest creations—find your flavor adventure
            </p>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mb-12"
          >
            <div className="flex space-x-8 bg-white/50 backdrop-blur-sm rounded-2xl p-4">
              {Object.entries(iceCreamData).map(([category, items]) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className="flex flex-col items-center space-y-3 p-4 rounded-xl transition-all duration-300"
                >
                  {/* Circular Category Image */}
                  <div className={`w-20 h-20 rounded-full overflow-hidden shadow-lg transition-all duration-300 ${
                    selectedCategory === category 
                      ? 'ring-4 ring-orange-400 shadow-xl scale-110' 
                      : 'hover:shadow-xl'
                  }`}>
                    <img
                      src={items[0].image}
                      alt={category}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Category Name */}
                  <div className="text-center">
                    <span className={`font-semibold text-sm capitalize transition-colors duration-300 ${
                      selectedCategory === category
                        ? 'text-orange-600'
                        : 'text-gray-700'
                    }`}>
                      {category}
                    </span>
                    <div className="text-xs text-gray-500 mt-1">
                      {items.length} items
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Ice Cream Listing */}
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8"
          >
            {iceCreamData[selectedCategory].map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative group cursor-pointer"
                onClick={() => addToCart(item)}
              >
                {/* Remove Badge */}
                {getItemQuantity(item.id) > 0 && (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromCart(item.id);
                    }}
                    className="absolute -top-2 -right-2 z-10 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <Minus className="w-3 h-3" />
                  </motion.button>
                )}

                {/* Image Container */}
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative mb-3"
                >
                  {selectedCategory === 'scoops' && (
                    <div className="w-full aspect-square rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  {selectedCategory === 'cones' && (
                    <div className="w-full aspect-[3/4] rounded-lg overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  {selectedCategory === 'sundaes' && (
                    <div className="w-full aspect-[4/5] rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Quantity Badge */}
                  {getItemQuantity(item.id) > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg"
                      style={{background: 'linear-gradient(to right, #ff6b35, #f7931e)'}}
                    >
                      {getItemQuantity(item.id)}
                    </motion.div>
                  )}
                </motion.div>

                {/* Item Info */}
                <div className="text-center">
                  <h4 className="font-semibold text-gray-800 text-sm md:text-base mb-1 line-clamp-2">
                    {item.name}
                  </h4>
                  <p className="font-bold text-lg" style={{color: '#ff6b35'}}>
                    ${item.price}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Cake Section */}
      <div className="relative z-10 py-20 px-8 bg-gradient-to-br from-[#DDFEA0]/10 to-[#8BFFDC]/10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-black">
                Handcrafted
              </span>
              <br />
              <span className="text-black">
                Ice Cream Cakes
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Perfect for celebrations or just because you deserve something special
            </p>
          </motion.div>

          {/* Cake Display - Left Preview, Right Listing */}
          <div className="flex flex-col lg:flex-row gap-8 h-[600px]">
            {/* Left Side - Simple Cake Preview */}
            <div className="lg:w-1/2 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="sticky top-8 h-[600px] flex items-center justify-center"
              >
                {/* Main Cake Display - Image Only */}
                <motion.div
                  key={selectedCake}
                  initial={{ x: 300, opacity: 0, scale: 0.8 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  exit={{ x: -300, opacity: 0, scale: 0.8 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 100, 
                    damping: 20,
                    duration: 0.8 
                  }}
                  className="w-96 h-96 rounded-3xl overflow-hidden shadow-2xl"
                >
                  <img
                    src={cakeData[selectedCake].image}
                    alt={cakeData[selectedCake].name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Right Side - Scrollable Cake Listing */}
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-gray-100 pr-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                  {cakeData.map((cake, index) => (
                    <motion.div
                      key={cake.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className={`relative group cursor-pointer p-4 rounded-2xl transition-all duration-300 ${
                        selectedCake === index
                          ? 'bg-orange-50 border-2 border-orange-400 shadow-lg'
                          : 'bg-white border-2 border-transparent hover:border-orange-200 shadow-md hover:shadow-lg'
                      }`}
                      onClick={() => setSelectedCake(index)}
                    >
                      {/* Add to Cart Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(cake);
                        }}
                        className="absolute top-2 right-2 z-10 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-orange-600 transition-colors shadow-lg opacity-0 group-hover:opacity-100"
                      >
                        +
                      </motion.button>

                      {/* Quantity Badge */}
                      {getItemQuantity(cake.id) > 0 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg z-20"
                          style={{background: 'linear-gradient(to right, #ff6b35, #f7931e)'}}
                        >
                          {getItemQuantity(cake.id)}
                        </motion.div>
                      )}

                      <div className="flex gap-4">
                        {/* Cake Thumbnail */}
                        <div className="w-20 h-20 rounded-xl overflow-hidden shadow-md flex-shrink-0">
                          <img
                            src={cake.image}
                            alt={cake.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Cake Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-800 text-sm mb-1 line-clamp-1">
                            {cake.name}
                          </h4>
                          <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                            {cake.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <p className="font-bold text-lg" style={{color: '#ff6b35'}}>
                              ${cake.price}
                            </p>
                            {selectedCake === index && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="text-orange-500 text-xs font-medium bg-orange-100 px-2 py-1 rounded-full"
                              >
                                Featured
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Toast & Expandable Modal */}
      <AnimatePresence>
        {cart.length > 0 && (
          <div className="fixed bottom-6 right-6 z-50">
            {/* Expanded Cart Modal */}
            <AnimatePresence>
              {showCart && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="absolute bottom-16 right-0 bg-white rounded-2xl shadow-2xl p-6 w-80 max-h-96 overflow-hidden mb-2"
                >
                  {/* Cart Header */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5" style={{color: '#ff6b35'}} />
                      Your Cart
                    </h3>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowCart(false)}
                      className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-600" />
                    </motion.button>
                  </div>

                  {/* Cart Items */}
                  <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3 bg-gray-50 rounded-lg p-3"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800 text-sm">{item.name}</h4>
                          <p className="text-sm font-bold" style={{color: '#ff6b35'}}>${item.price}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 rounded-full text-xs font-medium text-gray-700" style={{backgroundColor: '#DDFEA0'}}>
                            x{item.quantity}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeFromCart(item.id)}
                            className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Cart Actions */}
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-gray-800">Total:</span>
                      <span className="text-xl font-bold" style={{color: '#ff6b35'}}>${getTotalPrice()}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                      style={{background: 'linear-gradient(to right, #ff6b35, #f7931e)'}}
                    >
                      Checkout ({getTotalItems()} items)
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Cart Toast */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="relative"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCart(!showCart)}
                className="bg-white border-2 border-orange-400 p-4 rounded-full shadow-2xl flex items-center gap-3 min-w-max hover:border-orange-500 transition-colors duration-300"
              >
                <ShoppingCart className="w-5 h-5 text-orange-500" />
                <div className="flex items-center gap-2 text-gray-800">
                  <span className="text-sm font-bold">{getTotalItems()} items</span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm font-bold text-orange-500">${getTotalPrice()}</span>
                </div>
                <motion.div
                  animate={{ rotate: showCart ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronUp className="w-4 h-4 text-gray-600" />
                </motion.div>
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Custom CSS for cone shape */}
      <style jsx>{`
        .clip-triangle {
          clip-path: polygon(50% 100%, 0 0, 100% 0);
        }
        
        /* Custom scrollbar */
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        
        .scrollbar-thumb-orange-400::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollbar-thumb-orange-400::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        
        .scrollbar-thumb-orange-400::-webkit-scrollbar-thumb {
          background: #fb923c;
          border-radius: 10px;
        }
        
        .scrollbar-thumb-orange-400::-webkit-scrollbar-thumb:hover {
          background: #f97316;
        }
        
        .scrollbar-track-gray-100::-webkit-scrollbar-track {
          background: #f3f4f6;
        }
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default IceCreamShop;

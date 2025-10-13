// ShoppingCart.jsx
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Trash2,
  Tag,
  Package,
  Truck,
  CreditCard,
  Home,
  Plus,
  Minus,
  ArrowRight,
  Search,
  User2Icon,
  Check,
  Bookmark,
} from "lucide-react";
import { IoIosArrowForward } from "react-icons/io";
import { FaLanguage } from "react-icons/fa";

export default function ShoppingCartUI() {
  const initial = [
    {
      id: "p1",
      name: "Aurora Wireless Headphones",
      desc: "Active noise cancellation · 30h battery",
      price: 129.0,
      qty: 1,
      img: "https://zebronics.com/cdn/shop/files/Zeb-Thunderpro-blue-pic1.jpg?v=1709289196&width=2048",
    },
    {
      id: "p2",
      name: "Solstice Smartwatch",
      desc: "Heart-rate & GPS · 7-day battery",
      price: 199.0,
      qty: 1,
      img: "https://rukminim2.flixcart.com/image/480/640/xif0q/smartwatch/s/i/u/-original-imah76jt64ffmwg4.jpeg?q=90",
    },
    {
      id: "p3",
      name: "KINGONE Upgraded Stylus Pen",
      desc: "iPad Pencil · Ultra High Precision",
      price: 39.0,
      qty: 2,
      img: "https://m.media-amazon.com/images/I/613jbjQTn8L._AC_UY327_FMwebp_QL65_.jpg",
    },
  ];

  const [items, setItems] = useState(initial);
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(null);
  const [addressOpen, setAddressOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const subtotal = useMemo(
    () => items.reduce((s, it) => s + it.price * it.qty, 0),
    [items]
  );
  const shipping = useMemo(() => (subtotal > 150 ? 0 : 9.99), [subtotal]);
  const tax = useMemo(() => subtotal * 0.08, [subtotal]);
  const discount = useMemo(() => {
    if (!applied) return 0;
    if (applied.type === "percent") return (subtotal * applied.value) / 100;
    if (applied.type === "flat") return applied.value;
    return 0;
  }, [applied, subtotal]);
  const total = Math.max(0, subtotal + shipping + tax - discount);

  const changeQty = (id, delta) =>
    setItems((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, qty: Math.max(1, p.qty + delta) } : p))
        .filter(Boolean)
    );

  const remove = (id) => setItems((prev) => prev.filter((p) => p.id !== id));

  const applyCoupon = () => {
    const code = coupon.trim().toLowerCase();
    if (code === "duo10") setApplied({ code: "DUO10", type: "percent", value: 10 });
    else if (code === "flat5") setApplied({ code: "FLAT5", type: "flat", value: 5 });
    else setApplied({ code: coupon, type: "invalid", value: 0 });
  };

  const hoverCard = { scale: 1.01 };
  const btnTap = { scale: 0.97 };
  const fade = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-slate-800">
      <style>{`
        .duo-scroll::-webkit-scrollbar { width: 8px; height: 8px; }
        .duo-scroll::-webkit-scrollbar-thumb { background: rgba(14,116,144,0.28); border-radius: 10px; }
        .duo-scroll { scrollbar-width: thin; scrollbar-color: rgba(14,116,144,0.28) transparent; }
        .img-duotone { filter: saturate(0.9) contrast(0.95); }
      `}</style>

      <header className="sticky top-0 z-40 backdrop-blur-sm bg-white/60 border-b border-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-16 font-[Poppins]">

            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <img src="/logo.png" className="w-16" alt="" />
                <h1 className="font-bold text-2xl">Trosto</h1>
              </div>

              <div className="hidden md:flex items-center gap-6 ml-8 text-sm text-slate-600">
                <a className="hover:bg-[#1c1c1c] hover:p-2 rounded-lg transition-all ease-in hover:text-white hover:cursor-pointer">Home</a>
                <a className="hover:bg-[#1c1c1c] hover:p-2 rounded-lg transition-all ease-in hover:text-white hover:cursor-pointer">Shop</a>
                <a className="hover:bg-[#1c1c1c] hover:p-2 rounded-lg transition-all ease-in hover:text-white hover:cursor-pointer">Collections</a>
                <a className="hover:bg-[#1c1c1c] hover:p-2 rounded-lg transition-all ease-in hover:text-white hover:cursor-pointer">About</a>
              </div>
            </div>
            <div className="w-1/3 relative">
            <input type="text" className="border-1 border-black/20 bg-gray-100/20 w-full rounded-lg px-5 py-2" placeholder="Search for products" />
            <Search size={14} className="absolute top-1/2 -translate-y-1/2 right-4 opacity-80"/>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg bg-white shadow-sm">
                <FaLanguage size={16} />
                English
              </button>

              <button
                className="relative inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1c1c1c] text-white shadow-md"
                aria-label="view cart"
              >
                <ShoppingCart size={16} />
                <span className="hidden sm:inline text-sm font-medium">Cart</span>
                <span className="absolute -top-2 -right-2 bg-white text-[#1c1c1c] text-xs font-semibold px-2 py-0.5 rounded-full shadow-sm">
                  {items.length}
                </span>
              </button>
              <button className="p-2 rounded-full bg-[#bec1c2]">
                <User2Icon/>
              </button>
            </div>

          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <section className="lg:col-span-8">
            <motion.div
              initial="hidden"
              animate="show"
              variants={fade}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[#1c1c1c] flex items-center gap-1 font-[DM_Sans]">
                    <span className="text-xs font-medium opacity-75">
                      Home
                      </span>
                    <div className="flex items-center justify-center">
                      <div className="w-[5px] h-[5px] rounded-full bg-gray-400"/>
                      <IoIosArrowForward size={16} className="-mx-1 opacity-75"/>
                    </div>
                    <span className="font-semibold text-xs">

                    Shopping Cart
                    </span>
                  </div>
                  <h2 className="text-2xl font-semibold mt-1 font-[Poppins]">Your Shopping Cart</h2>
                  <p className="text-sm text-slate-500 mt-1 font-[DM_Sans]">
                    Make sure everything looks right before checkout.
                  </p>
                </div>

                <div className="text-sm">
                  <button className="px-3 py-1 rounded-md text-black/60 cursor-pointer hover:text-[#1c1c1c] bg-[#1c1c1c]/10 hover:bg-[#1c1c1c]/16 transition-all ease-in font-[Poppins]">
                    Continue shopping
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <div className="rounded-xl overflow-hidden">
                  <div className="max-h-[56vh] overflow-y-auto duo-scroll px-2 py-1">
                    <AnimatePresence>
                      {items.map((it) => (
                        <motion.article
                          key={it.id}
                          layout
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          whileHover={hoverCard}
                          transition={{ type: "spring", stiffness: 220, damping: 20 }}
                          className="group mb-4 bg-white rounded-xl p-4 flex gap-4 items-center shadow-sm"
                        >
                          <img
                            src={it.img}
                            alt={it.name}
                            className="w-28 h-full rounded-lg object-cover img-duotone"
                          />

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="text-sm font-medium text-slate-800 truncate font-[Poppins]">
                                  {it.name}
                                </div>
                                <div className="text-xs text-slate-500 mt-1 font-[DM_Sans]">{it.desc}</div>
                              </div>

                              <div className="text-right">
                                <div className="text-sm text-slate-600 font-medium font-[DM_Sans]">${it.price}</div>
                              </div>
                            </div>

                            <div className="mt-3 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <motion.button
                                  whileTap={btnTap}
                                  onClick={() => changeQty(it.id, -1)}
                                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#1c1c1c]/8 text-[#1c1c1c]"
                                  aria-label="decrease"
                                >
                                  <Minus size={16} />
                                </motion.button>

                                <div className="w-10 text-center text-sm font-medium font-[DM_Sans]">{it.qty}</div>

                                <motion.button
                                  whileTap={btnTap}
                                  onClick={() => changeQty(it.id, 1)}
                                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#1c1c1c]/8 text-[#1c1c1c]"
                                  aria-label="increase"
                                >
                                  <Plus size={16} />
                                </motion.button>

                                <motion.button
                                  whileTap={btnTap}
                                  onClick={() => remove(it.id)}
                                  className="ml-3 flex items-center gap-2 text-sm text-slate-600 hover:bg-red-500/30 hover:text-slate-900 transition-all p-2 rounded-lg"
                                  aria-label="remove"
                                >
                                  <Trash2 size={16} />
                                  <span className="hidden sm:inline font-[DM_Sans]">Remove</span>
                                </motion.button>

                                <button className="ml-2 text-sm text-[#1c1c1c] hover:scale-120 cursor-pointer transition-all ease-in"><Bookmark size={18}/></button>
                              </div>

                              <div className="text-sm text-slate-700 font-medium">
                                ${(it.qty * it.price).toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </motion.article>
                      ))}
                    </AnimatePresence>

                    {items.length === 0 && (
                      <div className="py-12 text-center text-slate-500">
                        <h3 className="text-lg font-medium font-[Poppins]">Your cart is empty</h3>
                        <p className="mt-2 font-[DM_Sans]">Explore products and add them to your cart.</p>
                        <div className="mt-4">
                          <button
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1c1c1c] text-white font-[Poppins]"
                            onClick={() => setItems(initial)}
                          >
                            <ShoppingCart size={16} /> Restore demo items
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-end font-[Poppins]">
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 rounded-lg bg-[#1c1c1c] text-white shadow-sm">Save cart</button>
                    <button
                      className="px-4 py-2 rounded-lg bg-white text-[#1c1c1c] border-transparent"
                      onClick={() => setItems([])}
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <aside className="lg:col-span-4">
            <motion.div
              className="sticky top-6 bg-white rounded-2xl p-5 shadow-md"
              initial="hidden"
              animate="show"
              variants={fade}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="mt-1 text-lg font-semibold font-[Poppins]">Order summary</h3>
                </div>
                <div className="text-sm text-slate-500 font-[DM_Sans]">{items.length} items</div>
              </div>

              <div className="space-y-3 font-[DM_Sans]">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-md bg-[#1c1c1c]/8">
                      <Package size={16} color="#1c1c1c" />
                    </div>
                    <div>Subtotal</div>
                  </div>
                  <div className="font-medium">${subtotal.toFixed(2)}</div>
                </div>

                <div className="flex items-center justify-between text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-md bg-[#1c1c1c]/8">
                      <Truck size={16} color="#1c1c1c" />
                    </div>
                    <div>Shipping</div>
                  </div>
                  <div className="font-medium">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</div>
                </div>

                <div className="flex items-center justify-between text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-md bg-[#1c1c1c]/8">
                      <CreditCard size={16} color="#1c1c1c" />
                    </div>
                    <div>Tax</div>
                  </div>
                  <div className="font-medium">${tax.toFixed(2)}</div>
                </div>

                {applied && applied.type !== "invalid" && (
                  <div className="flex items-center justify-between text-sm text-emerald-600">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-md bg-emerald-50">
                        <Tag size={16} color="#16A34A" />
                      </div>
                      <div>Coupon ({applied.code})</div>
                    </div>
                    <div className="font-medium">- ${discount.toFixed(2)}</div>
                  </div>
                )}
              </div>

              <div className="mt-4 border-t border-transparent pt-4 font-[Poppins]">
                <div className="flex items-center justify-between text-lg font-semibold">
                  <div>Total</div>
                  <div>${total.toFixed(2)}</div>
                </div>
              </div>

              <div className="mt-4">
                <label className="sr-only font-[Poppins]">Coupon</label>
                <div className="flex gap-2">
                  <input
                    className="flex-1 px-3 py-2 rounded-lg bg-[#F6FDFF] border-0 focus:outline-none"
                    placeholder="Try DUO10 or FLAT5 font-[DM_Sans]"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <motion.button
                    whileTap={btnTap}
                    onClick={applyCoupon}
                    className="px-3 py-2 rounded-lg bg-[#1c1c1c] text-white font-[Poppins]"
                  >
                    Apply
                  </motion.button>
                </div>
                {applied && applied.type === "invalid" && (
                  <div className="mt-2 text-xs text-red-500 font-[DM_Sans]">Coupon not recognized</div>
                )}
                {applied && applied.type !== "invalid" && (
                  <div className="mt-2 text-xs text-emerald-600 flex items-center gap-2 font-[DM_Sans]">Applied {applied.code} <Check size={12}/></div>
                )}
              </div>

              <div className="mt-4">
                <motion.button
                  whileTap={btnTap}
                  onClick={() => setAddressOpen((s) => !s)}
                  className="w-full p-3 rounded-lg bg-[#F6FDFF] flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Home size={18} color="#1c1c1c" />
                    <div className="text-sm text-slate-700 font-[Poppins]">Shipping address</div>
                  </div>
                  <div className="text-sm text-[#1c1c1c] font-[DM_Sans]">{addressOpen ? "Edit" : "Add"}</div>
                </motion.button>

                {addressOpen && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 space-y-2 font-[DM_Sans]">
                    <input className="w-full px-3 py-2 rounded-lg bg-[#FAFEFF]" placeholder="Full name" />
                    <input className="w-full px-3 py-2 rounded-lg bg-[#FAFEFF]" placeholder="Street, city, ZIP" />
                    <button className="w-full px-3 py-2 rounded-lg bg-[#1c1c1c] text-white font-[Poppins]">Save address</button>
                  </motion.div>
                )}
              </div>

              <div className="mt-4 font-[Poppins]">
                <div className="text-sm font-medium">Payment</div>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setPaymentMethod("card")}
                    className={`flex items-center gap-2 justify-center px-2 py-2 rounded-lg ${
                      paymentMethod === "card" ? "bg-[#1c1c1c] text-white" : "bg-[#F6FDFF] text-slate-700"
                    }`}
                  >
                    <CreditCard size={16} />
                    <span className="text-xs">Card</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod("upi")}
                    className={`flex items-center gap-2 justify-center px-2 py-2 rounded-lg ${
                      paymentMethod === "upi" ? "bg-[#1c1c1c] text-white" : "bg-[#F6FDFF] text-slate-700"
                    }`}
                  >
                    UPI
                  </button>
                  <button
                    onClick={() => setPaymentMethod("wallet")}
                    className={`flex items-center gap-2 justify-center px-2 py-2 rounded-lg ${
                      paymentMethod === "wallet" ? "bg-[#1c1c1c] text-white" : "bg-[#F6FDFF] text-slate-700"
                    }`}
                  >
                    Wallet
                  </button>
                </div>
              </div>

              <div className="mt-6 space-y-3 font-[Poppins]">
                <motion.button
                  whileTap={btnTap}
                  className="w-full px-4 py-3 rounded-lg bg-gradient-to-br from-[#1c1c1c] to-[#2d2d2d] text-white font-medium flex items-center justify-center gap-2 shadow-lg"
                >
                  Checkout
                  <ArrowRight size={16} />
                  <span className="sr-only">for amount</span>
                </motion.button>

                <button className="w-full px-4 py-3 rounded-lg bg-white text-[#1c1c1c]">Continue shopping</button>
              </div>
            </motion.div>
          </aside>
        </div>
      </main>

      <div className="fixed left-0 right-0 bottom-4 z-50 px-4 sm:hidden">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
          <div className="rounded-lg bg-white p-3 shadow-md flex-1 flex items-center justify-between">
            <div className="flex items-center gap-3 font-[Poppins]">
              <div className="text-sm font-medium">${total.toFixed(2)}</div>
              <div className="text-xs text-slate-500">Total</div>
            </div>
            <motion.button
              whileTap={btnTap}
              className="ml-4 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1c1c1c] text-white font-[Poppins]"
            >
              Checkout
              <ArrowRight size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
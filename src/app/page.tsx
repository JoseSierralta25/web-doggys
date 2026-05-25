"use client";

import React, { useState } from 'react';

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
};

type MenuCategory = {
  id: string;
  name: string;
  items: MenuItem[];
};

type CartItem = MenuItem & { quantity: number };

const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "combos",
    name: "Combos",
    items: [
      { id: "c1", name: "Perritos Duo", description: "4 Perros + Bebida", price: 6.50 },
      { id: "c2", name: "Perritos Familia", description: "10 Perros + Bebida", price: 15.50 },
      { id: "c3", name: "Perritos Criollos", description: "4 Perros + Bebida", price: 11.00 },
      { id: "c4", name: "Combo Salvavida Sencillas", description: "3 Hamburguesas Sencillas + Bebida", price: 15.50 },
      { id: "c5", name: "Combo Salvavida Americanas", description: "3 Hamburguesas Americanas + Bebida", price: 18.50 },
      { id: "c6", name: "Combo Salvavida Crispy", description: "2 Hamburguesas Crispy + Bebida", price: 15.00 },
      { id: "c7", name: "Manada Doggy's", description: "2 Perros Criollos + 1 Hamb. Sencilla + 1 Salchipapa Sencilla + 1 Mini Pepito de Pollo + Refresco 1.5L", price: 20.00 },
    ]
  },
  {
    id: "perros",
    name: "Perros Calientes",
    items: [
      { id: "p1", name: "Normal (Sencillo)", description: "", price: 1.50 },
      { id: "p2", name: "Especial", description: "Tocineta, queso amarillo y maíz", price: 3.00 },
      { id: "p3", name: "Criollo", description: "Salchicha y pan a la plancha, queso de mano, maíz y salsas", price: 2.80 },
    ]
  },
  {
    id: "hamburguesas",
    name: "Hamburguesas",
    items: [
      { id: "h1", name: "Sencilla", description: "Pan ajonjolí, carne 100g, lechuga, tomate, papas ralladas", price: 5.00 },
      { id: "h2", name: "Sencilla Scott", description: "Pan, carne redonda, queso kraft, salsas tradicionales, papas fritas", price: 5.50 },
      { id: "h3", name: "Cheese Burguer", description: "Pan, carne smash, queso kraft, tocineta, pepinillos, aderezo bigmac, lechuga, tomate, aros de cebolla", price: 7.00 },
      { id: "h4", name: "Bacon", description: "Pan, carne smash doble, doble queso kraft, doble tocineta, pepinillos, aderezo bigmac, papas fritas, salsas", price: 9.00 },
      { id: "h5", name: "Americana", description: "Pan, carne, lechuga, tomate, cebolla, queso kraft, tocineta, papas fritas opcionales", price: 6.50 },
      { id: "h6", name: "Criolla Sasha Mix", description: "Pan, doble proteína, repollo, papas ralladas, huevo, queso de mano, tocineta, maíz, tártara, ajo, papas fritas", price: 8.30 },
      { id: "h7", name: "Crispy", description: "Pan, crispy, verdura, tocineta, queso kraft o de mano, cebolla, mostaza, tártara, papas fritas", price: 8.00 },
      { id: "h8", name: "Doggy's Alpha", description: "Pan, crispy, chuleta, solomo, aros de cebolla, lechuga, tomate, huevo, tocineta, queso de mano, queso kraft, salsas, papas fritas", price: 13.00 },
    ]
  },
  {
    id: "pepitos",
    name: "Pepitos y Arepas",
    items: [
      { id: "pa1", name: "Mini Pepito", description: "Carne o pollo, queso de año, salsas de la casa", price: 4.50 },
      { id: "pa2", name: "Super Pepito", description: "Pollo y carne, papas ralladas, tocineta, maíz, queso gouda, salsas", price: 9.50 },
      { id: "pa3", name: "Super Doggys", description: "300g de proteína, tocineta, papas ralladas, lechuga, tomate, queso gouda, queso de mano, maíz", price: 10.50 },
      { id: "pa4", name: "Arepa Sencilla", description: "Carne picada o pollo, salsas, lechuga, tomate, queso amarillo o gouda", price: 5.50 },
      { id: "pa5", name: "Arepa Doggy's", description: "Mixta, salsas, lechuga, tomate, queso amarillo o gouda, tocineta, maíz", price: 8.50 },
      { id: "pa6", name: "Arepa Criolla", description: "Pollo o carne picada, queso de mano, lechuga, tomate, salsas, tocineta", price: 6.50 },
    ]
  },
  {
    id: "salchipapas",
    name: "Salchipapas",
    items: [
      { id: "s1", name: "Salchipapa Sencilla", description: "250g de papas, salchichas, queso amarillo/gouda, maíz, salsas", price: 5.60 },
      { id: "s2", name: "Salchipapa Doggy's", description: "300g de papas, salchichas, pollo y carne, queso amarillo, tocineta, maíz, salsas", price: 10.50 },
      { id: "s3", name: "Salchipapa Súper Especial", description: "600g de papas, 300g de pollo y carne, queso amarillo/gouda, queso de mano rueda completa, tocineta, maíz, lechuga, tomate, papas ralladas, salsas", price: 14.50 },
    ]
  },
  {
    id: "enrollados",
    name: "Enrollados y Servicios",
    items: [
      { id: "e1", name: "Enrollado Sencillo", description: "Pan árabe, pollo o carne, salsas, lechuga, tomate, papas fritas", price: 6.00 },
      { id: "e2", name: "Enrollado Mixto", description: "Pollo y carne, papas fritas, papas ralladas, maíz, verduras, queso de mano, salsas, papas de freidora", price: 8.50 },
      { id: "e3", name: "Enrollado Triple Queso", description: "3 proteínas, queso de mano, queso kraft, verduras, papas ralladas, papas fritas, maíz, salsas", price: 11.00 },
      { id: "e4", name: "Papas Fritas", description: "250g", price: 3.00 },
      { id: "e5", name: "Nuggets", description: "6 uds", price: 4.00 },
      { id: "e6", name: "Nuggets + Papas Fritas", description: "", price: 6.00 },
      { id: "e7", name: "Servicio Kids", description: "5 nuggets, 150g papas, 5 tequeños", price: 5.00 },
      { id: "e8", name: "Servicio Tequeños", description: "5 uds", price: 4.00 },
    ]
  },
  {
    id: "cuadradito",
    name: "Especial 'El Cuadradito'",
    items: [
      { id: "cu1", name: "Sencillas DOGGY'S", description: "Pan, repollo, papas ralladas, carne 80g, salsas, maíz. Promo 3x$10", price: 3.50 },
      { id: "cu2", name: "DOGGY'S Burguer", description: "Pan, queso kraft, pepinillos, maíz, repollo, papas ralladas, carne 80g. Promo 2+Bebida x$10", price: 4.50 },
    ]
  },
  {
    id: "bebidas",
    name: "Bebidas",
    items: [
      { id: "b1", name: "Refresco Lata", description: "", price: 1.50 },
      { id: "b2", name: "Botella", description: "", price: 1.00 },
      { id: "b3", name: "Refresco 1L", description: "", price: 2.00 },
      { id: "b4", name: "Refresco 1.25L", description: "", price: 2.00 },
      { id: "b5", name: "Refresco 1.5L", description: "", price: 2.50 },
      { id: "b6", name: "Jugo", description: "", price: 2.00 },
      { id: "b7", name: "Gatorade", description: "", price: 2.00 },
      { id: "b8", name: "Malta", description: "", price: 1.00 },
      { id: "b9", name: "Nestea", description: "", price: 2.00 },
      { id: "b10", name: "Agua", description: "", price: 1.00 },
    ]
  }
];

export default function DoggysLanding() {
  const [isWaMenuOpen, setIsWaMenuOpen] = useState(false);
  const [isHeaderWaMenuOpen, setIsHeaderWaMenuOpen] = useState(false);
  const [isHeroWaMenuOpen, setIsHeroWaMenuOpen] = useState(false);
  
  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  // Menu Modal State
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Grid Expander States
  const [showAllCombos, setShowAllCombos] = useState(false);
  const [showAllIndividual, setShowAllIndividual] = useState(false);

  // Cart Functions
  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === item.id);
      if (existing) {
        return prev.map(p => p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(p => {
      if (p.id === id) {
        const newQ = p.quantity + delta;
        return newQ > 0 ? { ...p, quantity: newQ } : p;
      }
      return p;
    }).filter(p => p.quantity > 0));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const generateWhatsAppOrderLink = (phone: string) => {
    let msg = `¡Hola Doggy's! 🍔 Vi la página web y quiero hacer este pedido.%0A%0A`;
    msg += `Sede de Despacho: ${phone === "584244322496" ? "Centro" : "La Puerta"}%0A%0A`;
    msg += `Mi Pedido:%0A`;
    cart.forEach(item => {
      msg += `- ${item.quantity} x ${item.name} ($${(item.price * item.quantity).toFixed(2)})%0A`;
    });
    msg += `%0A*Total a Pagar: $${cartTotal.toFixed(2)} USD*%0A%0A`;
    msg += `¿Me confirman si tienen disponibilidad para proceder con el pago y envío? ¡Muchas gracias!`;
    return `https://wa.me/${phone}?text=${msg}`;
  };

  const waMessage = "¡Hola Doggy's! 👋 Vi la página web y quiero hacer un pedido.";
  const encodedMessage = encodeURIComponent(waMessage);

  // Arrays for Featured Sections
  const featuredCombos = [
    { img: "/WhatsApp Image 2026-05-24 at 2.18.15 PM.jpeg", title: "4 Perros + Refresco", desc: "Clásicos de la calle con papitas y full salsas. Incluye Refresco 1.25L." },
    { img: "/WhatsApp Image 2026-05-24 at 2.18.16 PM (2).jpeg", title: "4 Mini Pepitos", desc: "El sabor del pepito en formato mini para compartir. Incluye Refresco 1.25L." },
    { img: "/WhatsApp Image 2026-05-24 at 2.18.16 PM (3).jpeg", title: "Combo Salvavida", desc: "3 Hamburguesas Sencillas + Bebida 1.5L. Para los que tienen hambre en serio." },
    { img: "/WhatsApp Image 2026-05-24 at 2.18.16 PM (4).jpeg", title: "Combo Manada", desc: "2 Criollas + 1 Sencilla + 1 Salchipapa + 1 Mini Pepito + Bebida 1.5L." }
  ];

  const featuredIndividual = [
    { img: "/WhatsApp Image 2026-05-24 at 2.18.15 PM (1).jpeg", title: "Hamburguesa Sencilla", desc: "Pan, repollo, papas ralladas, carne 80gr, salsas de la casa, maíz." },
    { img: "/WhatsApp Image 2026-05-24 at 2.18.15 PM (2).jpeg", title: "Doggy's Burger", desc: "Pan, queso Kraft, pepinillos, maíz, repollo, papas ralladas, carne 80gr." },
    { img: "/WhatsApp Image 2026-05-24 at 2.18.15 PM (3).jpeg", title: "Pepito Mixto", desc: "El clásico pepito con carne y pollo, cargado de maíz y queso." },
    { img: "/WhatsApp Image 2026-05-24 at 2.18.15 PM (5).jpeg", title: "Especialidad de la Casa", desc: "Prueba nuestra recomendación especial con el toque secreto de Doggy's." },
    { img: "/WhatsApp Image 2026-05-24 at 2.18.16 PM (1).jpeg", title: "Delicia Callejera", desc: "Sabor intenso y auténtico, perfecto para saciar cualquier antojo." }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      
      {/* Header / Navbar (Premium Glassmorphism) */}
      <header className="bg-white/80 backdrop-blur-md border-b border-zinc-100 flex items-center justify-between px-6 py-4 sticky top-0 z-50 h-[72px] transition-all">
        <div className="text-[#E62020] font-black text-2xl tracking-tighter">DOGGY'S</div>
        
        <nav className="hidden md:flex gap-6 text-sm">
          <a href="#" onClick={(e) => { e.preventDefault(); setIsMenuModalOpen(false); window.scrollTo(0,0); }} className="relative text-zinc-700 font-bold tracking-wide hover:text-[#E62020] transition-colors py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-[#E62020] after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100">
            Inicio
          </a>
          <a href="#combos" onClick={() => setIsMenuModalOpen(false)} className="relative text-zinc-700 font-bold tracking-wide hover:text-[#E62020] transition-colors py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-[#E62020] after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100">
            Combos
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); setIsMenuModalOpen(true); window.scrollTo(0,0); }} className="relative text-zinc-700 font-bold tracking-wide hover:text-[#E62020] transition-colors py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-[#E62020] after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100">
            Menú
          </a>
        </nav>

        <div className="relative hidden sm:block">
          <button 
            onClick={() => setIsHeaderWaMenuOpen(!isHeaderWaMenuOpen)}
            className="bg-[#E62020] text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden group relative"
          >
            <span className="relative z-10">Pedir por WhatsApp</span>
            {/* Destello sutil al hacer hover */}
            <div className="absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
          </button>
          
          {isHeaderWaMenuOpen && (
            <div className="absolute top-full mt-2 right-0 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 w-64 origin-top-right transition-all animate-in fade-in slide-in-from-top-4 duration-200">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 text-center">¿Dónde estás ubicado?</h4>
              <div className="flex flex-col gap-2">
                <a 
                  href={`https://wa.me/584244322496?text=${encodedMessage}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all duration-200 text-center shadow-md block"
                >
                  Sede Centro
                </a>
                <a 
                  href={`https://wa.me/58146078591?text=${encodedMessage}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all duration-200 text-center shadow-md block"
                >
                  Sede La Puerta
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#E62020] relative text-white py-6 md:py-10 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="flex-1 space-y-6">
            <span className="bg-[#FCEAA8] text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest inline-block">
              Street Food Culture
            </span>
            <h1 className="font-black text-5xl md:text-7xl leading-none uppercase">
              El Verdadero<br />Sabor De La<br />Calle
            </h1>
            <p className="text-lg md:text-xl font-medium max-w-md">
              ¡Mata el hambre con Doggy's! Las hamburguesas, pepitos y perros calientes más brutales de Punto Fijo.
            </p>
            <div className="relative w-fit">
              <button 
                onClick={() => setIsHeroWaMenuOpen(!isHeroWaMenuOpen)}
                className="bg-[#FCEAA8] text-black font-black text-lg px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-transform uppercase flex items-center justify-center gap-3 cursor-pointer"
              >
                <span className="bg-green-500 p-1.5 rounded-full text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                </span>
                ¡Haz tu pedido ya!
              </button>

              {isHeroWaMenuOpen && (
                <div className="absolute bottom-full mb-3 left-0 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 w-64 origin-bottom-left transition-all">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 text-center">¿Dónde estás ubicado?</h4>
                  <div className="flex flex-col gap-2">
                    <a 
                      href={`https://wa.me/584244322496?text=${encodedMessage}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all duration-200 text-center shadow-md block"
                    >
                      Sede Centro
                    </a>
                    <a 
                      href={`https://wa.me/58146078591?text=${encodedMessage}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all duration-200 text-center shadow-md block"
                    >
                      Sede La Puerta
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex-1 relative w-full flex justify-center mt-6 md:mt-0">
            <div className="w-full max-w-lg lg:max-w-xl max-h-96 md:max-h-[28rem] bg-white/20 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border-4 border-white/30 transform rotate-2">
              <img 
                src="/WhatsApp Image 2026-05-24 at 3.27.11 PM.jpeg" 
                alt="El Verdadero Sabor De La Calle" 
                className="w-full h-full object-cover object-bottom block"
              />
            </div>
            <div className="absolute -bottom-6 -left-2 md:-left-6 bg-[#E62020] border-4 border-white text-white font-black rounded-full w-24 h-24 flex items-center justify-center text-center leading-tight shadow-xl transform -rotate-12">
              100%<br />CALLE
            </div>
          </div>
        </div>
      </section>

      {/* Combos Section */}
      <section id="combos" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black uppercase text-gray-900 mb-4 tracking-tight">Combos Brutales</h2>
          <p className="text-gray-500 font-medium">Arma tu plan y ahorra con nuestros combos para compartir.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(showAllCombos ? featuredCombos : featuredCombos.slice(0, 3)).map((combo, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col group border border-gray-100 animate-in fade-in duration-500">
              <div className="relative overflow-hidden">
                <img 
                  src={combo.img} 
                  alt={combo.title} 
                  className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-500 block"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-black text-xl mb-2 italic">{combo.title}</h3>
                <p className="text-gray-500 text-sm flex-1">{combo.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {featuredCombos.length > 3 && (
          <div className="mt-10 text-center">
            <button 
              onClick={() => setShowAllCombos(!showAllCombos)}
              className="inline-flex items-center gap-2 font-bold text-[#E62020] hover:text-red-800 transition-colors hover:scale-105"
            >
              {showAllCombos ? 'Ver menos ↑' : 'Ver más ↓'}
            </button>
          </div>
        )}
        </div>
      </section>

      {/* Menú Section - Slider visual (Cambiado id a destacados para liberar 'menu') */}
      <section id="destacados" className="bg-gray-100 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black uppercase text-gray-900 mb-4 tracking-tight">Comida Individual</h2>
            <p className="text-gray-500 font-medium">Sabor callejero auténtico a tu medida.</p>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(showAllIndividual ? featuredIndividual : featuredIndividual.slice(0, 3)).map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col group animate-in fade-in duration-500">
              <div className="relative overflow-hidden">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-500 block"
                />
              </div>
              <div className="p-4 md:p-6 flex flex-col flex-1">
                <h3 className="font-black text-lg md:text-xl italic mb-2">{item.title}</h3>
                <p className="text-gray-500 text-xs md:text-sm flex-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {featuredIndividual.length > 3 && (
          <div className="mt-10 text-center">
            <button 
              onClick={() => setShowAllIndividual(!showAllIndividual)}
              className="inline-flex items-center gap-2 font-bold text-[#E62020] hover:text-red-800 transition-colors hover:scale-105"
            >
              {showAllIndividual ? 'Ver menos ↑' : 'Ver más ↓'}
            </button>
          </div>
        )}
        </div>
      </section>

      {/* Menú Interactivo Oculto (Modal) */}
      {isMenuModalOpen && (
        <div className="fixed top-[72px] bottom-0 left-0 right-0 bg-gray-50 z-40 flex flex-col animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header del Modal */}
          <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
            <h2 className="text-2xl font-black text-[#E62020] uppercase tracking-tighter">Catálogo</h2>
            <button 
              onClick={() => setIsMenuModalOpen(false)}
              className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Barra de Búsqueda y Filtros */}
          <div className="bg-white p-4 border-b border-gray-100 sticky top-[73px] z-10 shadow-sm">
            <div className="max-w-7xl mx-auto flex flex-col gap-4">
              <input 
                type="text" 
                placeholder="🔍 Busca hamburguesas, perros, bebidas..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E62020] transition-all font-medium text-sm"
              />
              <div className="flex overflow-x-auto gap-2 pb-2 scroll-smooth" style={{ scrollbarWidth: 'none' }}>
                <button 
                  onClick={() => setSelectedCategory("all")}
                  className={`shrink-0 px-4 py-2 rounded-full font-bold text-sm transition-all ${selectedCategory === "all" ? 'bg-[#E62020] text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  Todos
                </button>
                {MENU_CATEGORIES.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`shrink-0 px-4 py-2 rounded-full font-bold text-sm transition-all ${selectedCategory === cat.id ? 'bg-[#E62020] text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Lista de Productos (Filtrada) */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 pb-32">
            <div className="max-w-7xl mx-auto flex flex-col gap-8">
              {MENU_CATEGORIES
                .filter(c => selectedCategory === "all" || c.id === selectedCategory)
                .map(category => {
                  const filteredItems = category.items.filter(item => 
                    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                    item.description.toLowerCase().includes(searchQuery.toLowerCase())
                  );

                  if (filteredItems.length === 0) return null;

                  return (
                    <div key={category.id} className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                      <h3 className="text-xl font-black uppercase border-b-2 border-zinc-200 pb-2 mb-4 text-zinc-800 tracking-tight">{category.name}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {filteredItems.map(item => (
                          <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-all group">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-bold text-base text-zinc-900 leading-tight group-hover:text-[#E62020] transition-colors">{item.name}</h4>
                              <span className="font-black text-[#E62020] bg-red-50 px-2 py-0.5 rounded-full text-sm shrink-0 ml-2">${item.price.toFixed(2)}</span>
                            </div>
                            {item.description && <p className="text-gray-500 text-xs leading-snug mb-4">{item.description}</p>}
                            <button 
                              onClick={() => addToCart(item)}
                              className="mt-auto w-full bg-zinc-900 hover:bg-[#E62020] text-white py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm flex items-center justify-center gap-2 active:scale-95"
                            >
                              Añadir al pedido ➕
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
              })}
              
              {/* Empty state si no hay resultados */}
              {MENU_CATEGORIES.every(category => {
                if (selectedCategory !== "all" && category.id !== selectedCategory) return true;
                return category.items.filter(item => 
                  item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                  item.description.toLowerCase().includes(searchQuery.toLowerCase())
                ).length === 0;
              }) && (
                <div className="text-center py-20">
                  <p className="text-5xl mb-4">🌭</p>
                  <h4 className="text-xl font-bold text-gray-700">No encontramos lo que buscas</h4>
                  <p className="text-gray-500 mt-2">Prueba buscando con otras palabras.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}


      {/* Carrito de Compras Flotante */}
      {cart.length > 0 && (
        <div className={`fixed bottom-0 left-0 right-0 md:left-auto md:right-8 md:bottom-8 z-40 md:w-96 bg-white md:rounded-t-2xl md:rounded-b-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.15)] border border-gray-200 transition-all duration-300 transform ${isCartOpen ? 'translate-y-0' : 'translate-y-[calc(100%-4rem)] md:translate-y-[calc(100%-4.5rem)]'}`}>
          {/* Cart Header */}
          <div className="bg-[#E62020] text-white p-4 flex justify-between items-center md:rounded-t-2xl shadow-sm">
            <div 
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="flex items-center gap-2 font-bold cursor-pointer flex-1"
            >
              <span className="text-xl">🛒</span>
              <span>Tu Pedido ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
            </div>
            <div className="flex items-center gap-4">
              <span 
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="font-black text-lg cursor-pointer"
              >
                ${cartTotal.toFixed(2)}
              </span>
              {isCartOpen ? (
                <button 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    setCart([]); 
                    setIsCartOpen(false); 
                  }}
                  className="text-xs bg-white text-red-600 px-3 py-1.5 rounded-md font-bold shadow-sm hover:bg-gray-100 transition-colors flex items-center gap-1"
                >
                  ✕ Cancelar
                </button>
              ) : (
                <span 
                  onClick={() => setIsCartOpen(true)}
                  className="text-xs font-bold bg-red-700 px-3 py-1.5 rounded-md cursor-pointer hover:bg-red-800 transition-colors"
                >
                  ▲ Ver
                </span>
              )}
            </div>
          </div>
          
          {/* Cart Body */}
          <div className="max-h-[50vh] md:max-h-[60vh] overflow-y-auto bg-white p-4">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                <div className="flex-1 pr-4">
                  <h5 className="font-bold text-sm text-zinc-900 leading-tight">{item.name}</h5>
                  <span className="text-xs font-semibold text-[#E62020]">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                  <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-zinc-600 hover:text-red-600 font-bold">-</button>
                  <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-zinc-600 hover:text-green-600 font-bold">+</button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Footer */}
          <div className="p-4 bg-gray-50 border-t border-gray-200 md:rounded-b-2xl">
            <button 
              onClick={() => { setCheckoutModalOpen(true); setIsCartOpen(false); }}
              className="w-full bg-[#25D366] hover:bg-green-600 text-white font-black py-3 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
            >
              Confirmar Pedido por WhatsApp
            </button>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-[#E62020] text-white p-6 text-center relative">
              <button 
                onClick={() => setCheckoutModalOpen(false)}
                className="absolute top-4 right-4 text-white/70 hover:text-white"
              >
                ✕
              </button>
              <h3 className="font-black text-2xl uppercase tracking-tight">Finalizar Pedido</h3>
              <p className="text-sm opacity-90 mt-1">Total: ${cartTotal.toFixed(2)} USD</p>
            </div>
            <div className="p-6">
              <p className="text-center font-bold text-gray-600 mb-6 uppercase text-sm tracking-wider">¿A cuál sede enviarás el pedido?</p>
              <div className="flex flex-col gap-3">
                <a 
                  href={generateWhatsAppOrderLink("584244322496")}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setCheckoutModalOpen(false)}
                  className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-4 px-4 rounded-xl text-center shadow-md transition-all flex justify-between items-center group"
                >
                  <span>Sede Centro</span>
                  <span className="text-xs bg-zinc-700 px-2 py-1 rounded group-hover:bg-zinc-600 transition-colors">📲 Enviar</span>
                </a>
                <a 
                  href={generateWhatsAppOrderLink("58146078591")}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setCheckoutModalOpen(false)}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-4 rounded-xl text-center shadow-md transition-all flex justify-between items-center group"
                >
                  <span>Sede La Puerta</span>
                  <span className="text-xs bg-red-500 px-2 py-1 rounded group-hover:bg-red-400 transition-colors">📲 Enviar</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-zinc-900 text-white py-16 px-6 border-t-[6px] border-[#E62020]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          
          {/* Col 1: Brand & Social */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-[#FCEAA8] font-black text-4xl tracking-tighter mb-4">DOGGY&apos;S</h4>
            <p className="text-gray-400 text-sm mb-8 max-w-xs leading-relaxed">El verdadero sabor de la calle. Las mejores hamburguesas, pepitos y perros calientes de Punto Fijo.</p>
            
            <div className="flex gap-4">
              <a 
                href="https://instagram.com/doggys.pf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-zinc-800 p-3 rounded-full hover:bg-[#E62020] hover:scale-110 transition-all text-white shadow-lg"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a 
                href="#" 
                className="bg-zinc-800 p-3 rounded-full hover:bg-[#E62020] hover:scale-110 transition-all text-white shadow-lg"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.326V1.326C24 .597 23.403 0 22.675 0z"/></svg>
              </a>
              <a 
                href="#" 
                className="bg-zinc-800 p-3 rounded-full hover:bg-[#E62020] hover:scale-110 transition-all text-white shadow-lg"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.96-.5 3.96-1.6 5.56-1.25 1.83-3.23 3.04-5.46 3.04-2.88 0-5.4-2.22-5.74-5.08-.34-2.85 1.25-5.61 3.91-6.42 1.55-.47 3.25-.32 4.69.41v4.35c-.47-.32-1.05-.48-1.62-.48-1.18 0-2.31.63-2.8 1.7-.56 1.23-.37 2.76.51 3.79.88.99 2.33 1.3 3.59.82.91-.35 1.57-1.16 1.85-2.07.12-.39.14-.81.14-1.22v-19.5z"/></svg>
              </a>
            </div>
          </div>

          {/* Col 2: Sede Centro */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h5 className="text-white font-bold text-lg mb-4 uppercase tracking-wider border-b-2 border-zinc-700 pb-2 w-fit">Sede Centro</h5>
            <div className="flex items-start gap-3 text-gray-400 text-sm leading-relaxed">
              <svg className="w-5 h-5 text-[#E62020] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <p>
                Detrás del CANTV de Jacinto Lara, esquina Giraldot.<br/><br/>
                <span className="font-semibold text-zinc-300">Horario:</span> 6PM - 12AM
              </p>
            </div>
          </div>

          {/* Col 3: Sede La Puerta */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h5 className="text-white font-bold text-lg mb-4 uppercase tracking-wider border-b-2 border-zinc-700 pb-2 w-fit">Sede La Puerta</h5>
            <div className="flex items-start gap-3 text-gray-400 text-sm leading-relaxed">
              <svg className="w-5 h-5 text-[#E62020] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <p>
                Calle Buenos Aires, entre Ollarvides y Riera, al lado de la cauchera Los Olivares.<br/><br/>
                <span className="font-semibold text-zinc-300">Horario:</span> 6PM - 12AM
              </p>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-6 border-t border-zinc-800 text-center text-xs text-zinc-500 flex flex-col md:flex-row justify-between items-center gap-2">
          <p>© {new Date().getFullYear()} DOGGY&apos;S. Street Food Culture.</p>
          <p>Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {/* Popup Menú */}
        {isWaMenuOpen && (
          <div className="mb-4 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 w-64 origin-bottom-right transition-all animate-in fade-in slide-in-from-bottom-4 duration-200">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 text-center">¿Dónde estás ubicado?</h4>
            <div className="flex flex-col gap-2">
              <a 
                href={`https://wa.me/584244322496?text=${encodedMessage}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all duration-200 text-center shadow-md block"
              >
                Sede Centro
              </a>
              <a 
                href={`https://wa.me/58146078591?text=${encodedMessage}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all duration-200 text-center shadow-md block"
              >
                Sede La Puerta
              </a>
            </div>
          </div>
        )}

        {/* Botón Principal Flotante */}
        <button 
          onClick={() => setIsWaMenuOpen(!isWaMenuOpen)}
          className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 hover:bg-green-600 transition-all flex items-center justify-center relative"
          aria-label="Contactar por WhatsApp"
        >
          {/* Efecto Ping de Notificación */}
          <span className="absolute top-0 right-0 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border border-white"></span>
          </span>
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
        </button>
      </div>
    </div>
  );
}


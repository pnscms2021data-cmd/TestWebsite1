/**
 * Knot & Nest by JP - Central Product Catalog Data
 * Theme: Fresh Eucalyptus Sage & Pearl Cream (Botanical Muted Green, Morning Mist & Warm Beige)
 * 
 * IMPORTANT FOR STORE OWNER:
 * You can easily add, edit, or remove products here without modifying any HTML or CSS.
 */

const PRODUCTS_DATA = [
  {
    id: "boheme-granny-square-tote",
    name: "Bohème Sunburst Granny Square Tote",
    price: 2499,
    originalPrice: 2999,
    category: "bags",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Handcrafted 100% organic cotton tote with intricate sunburst floral granny squares and reinforced shoulder straps.",
    description: "The Bohème Sunburst Tote is our signature heirloom piece. Each bag requires over 14 hours of mindful hand-crochet work, assembling 18 individual vintage sunburst squares into a robust, spacious everyday carryall. Finished with a breathable natural cotton lining and double-stitched straps that stay comfortable on your shoulders all day.",
    availability: "In Stock (4 left)",
    colours: [
      { name: "Eucalyptus Sage & Pearl Cream", hex: "#4E6E58" },
      { name: "Morning Mist & Laurel", hex: "#688A72" },
      { name: "Warm Sand Dune & Pine", hex: "#B88B58" }
    ],
    materials: "100% Premium Combed Cotton Yarn, Natural Muslin Cotton Lining, Vegan Leather Base reinforcement",
    dimensions: "38 cm (W) x 35 cm (H) with a 28 cm strap drop",
    craftTime: "14 hours of artisan hand-crochet",
    careInstructions: "Spot clean or gentle hand wash in lukewarm water with mild liquid detergent. Reshape while damp and lay flat on a clean dry towel.",
    customizable: true,
    featured: true,
    rating: 4.9,
    reviewCount: 28
  },
  {
    id: "meadow-crochet-hanging-nest",
    name: "Meadow Hanging Plant Nest",
    price: 899,
    originalPrice: 1099,
    category: "home-decor",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Artisanal textured hanging pod for indoor planters, air plants, or cozy nursery nook accents.",
    description: "Bring a touch of organic serenity to your living space. Handcrafted with heavy unbleached cotton cord, the Meadow Plant Nest cradles 4-inch to 6-inch planters with graceful flexibility. Its delicate spiral stitch provides both strength and an earthy bohemian aesthetic.",
    availability: "In Stock",
    colours: [
      { name: "Pearl Cream Ivory", hex: "#F8FAF8" },
      { name: "Botanical Eucalyptus", hex: "#4E6E58" },
      { name: "Warm Sand Dune", hex: "#B88B58" }
    ],
    materials: "4mm Single Strand Natural Cotton Rope & Solid Neem Wood Ring",
    dimensions: "75 cm total hanging length; holds pots 10-15 cm diameter",
    craftTime: "4 hours of artisan knotting",
    careInstructions: "Dust gently with a soft dry brush. Do not machine wash.",
    customizable: true,
    featured: true,
    rating: 5.0,
    reviewCount: 34
  },
  {
    id: "eternal-blossom-crochet-bouquet",
    name: "Eternal Blossom Crochet Flower Bouquet",
    price: 1899,
    originalPrice: 2299,
    category: "gifts",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Everlasting bouquet featuring hand-crocheted sunflowers, English daisies, lavender sprigs and eucalyptus leaves.",
    description: "Flowers that never wither, handcrafted to celebrate life's heartfelt moments. Each stem features hand-turned floral petals crocheted with ultra-soft milk cotton yarn and flexible florist wire, allowing you to arrange and bend stems exactly as you wish. Wrapped in biodegradable kraft paper with a satin ribbon.",
    availability: "Made to Order (3-4 days)",
    colours: [
      { name: "Eucalyptus Leaves & Daisy Bloom", hex: "#4E6E58" },
      { name: "Golden Wheat & Sunburst", hex: "#B88B58" },
      { name: "Lavender Mist & Pearl", hex: "#8A9EA0" }
    ],
    materials: "Premium Milk Cotton Yarn, Eco-wrapped Iron Florist Wire, Kraft Paper & Satin Ribbon",
    dimensions: "Set of 7 floral stems; 32 cm length",
    craftTime: "8 hours of delicate miniature crochet",
    careInstructions: "Keep away from direct moisture. Use a blow dryer on cool low setting to gently remove dust.",
    customizable: true,
    featured: true,
    rating: 4.9,
    reviewCount: 42
  },
  {
    id: "cozy-merino-ribbed-beanie",
    name: "Nordic Ribbed Merino Beanie",
    price: 1299,
    originalPrice: 1599,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Ultra-soft, itch-free ribbed knit beanie with foldable brim, tailored for effortless warmth.",
    description: "Knitted with luxurious baby-soft merino wool blend that offers cloud-like softness against your skin. Features an elastic rib stitch that comfortably fits all head sizes without squeezing. Finished with an understated wood tag stamped with our brand knot.",
    availability: "In Stock",
    colours: [
      { name: "Forest Eucalyptus", hex: "#4E6E58" },
      { name: "Morning Mist Sage", hex: "#688A72" },
      { name: "Warm Cashmere Dune", hex: "#B88B58" },
      { name: "Pearl White Melange", hex: "#EEF4EE" }
    ],
    materials: "60% Extrafine Merino Wool, 40% Anti-Pilling Microfiber Acrylic",
    dimensions: "Unisex One-Size (Elastic circumference 52 cm - 60 cm)",
    craftTime: "5 hours hand knitting",
    careInstructions: "Hand wash cold with wool wash shampoo. Do not wring or tumble dry. Dry flat in shade.",
    customizable: false,
    featured: true,
    rating: 4.8,
    reviewCount: 19
  },
  {
    id: "artisan-lotus-coaster-set",
    name: "Lotus Petal Table Coasters (Set of 4)",
    price: 749,
    originalPrice: 899,
    category: "home-decor",
    image: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Charming thick-weave lotus coasters made with heat-resistant pure cotton yarn to protect your tabletops.",
    description: "Elevate your morning chai and coffee rituals. These thick-stitch cotton coasters absorb condensation quickly while creating a tranquil, earthy coffee table vignette. Comes bundled with an organic jute tie and handmade craft tag.",
    availability: "In Stock",
    colours: [
      { name: "Eucalyptus & Pearl Set", hex: "#4E6E58" },
      { name: "Morning Mist Monochrome", hex: "#EEF4EE" },
      { name: "Warm Dune & Laurel Duo", hex: "#B88B58" }
    ],
    materials: "100% Heavy Twist Ring-Spun Cotton Yarn",
    dimensions: "12.5 cm diameter per coaster (Set of 4)",
    craftTime: "3.5 hours for the complete 4-piece set",
    careInstructions: "Machine washable in a laundry mesh bag on delicate cycle or hand wash. Iron lightly on medium heat.",
    customizable: true,
    featured: true,
    rating: 5.0,
    reviewCount: 51
  },
  {
    id: "vintage-crochet-envelope-clutch",
    name: "Vintage Shell Stitch Envelope Clutch",
    price: 1799,
    originalPrice: 2199,
    category: "bags",
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Sophisticated textured clutch with magnetic antique brass clasp and detachable braided wristlet.",
    description: "An elegant companion for festive gatherings, evening dinners, or casual brunches. Features the timeless scalloped shell stitch in dense yarn that maintains structured posture without sagging.",
    availability: "In Stock (2 left)",
    colours: [
      { name: "Botanical Eucalyptus", hex: "#4E6E58" },
      { name: "Pearl Sand Ivory", hex: "#EEF4EE" },
      { name: "Deep Pine Noir", hex: "#1B261E" }
    ],
    materials: "Mercerized Egyptian Cotton, Brass Magnetic Snap, Satin Brocade Inner Lining",
    dimensions: "26 cm (L) x 16 cm (H) x 4 cm (D)",
    craftTime: "9 hours of precision crochet",
    careInstructions: "Spot clean gently with a damp cotton cloth. Keep in dust bag when not in use.",
    customizable: true,
    featured: false,
    rating: 4.9,
    reviewCount: 15
  },
  {
    id: "serene-heirloom-baby-booties-bonnet",
    name: "Heirloom Newborn Booties & Bonnet Set",
    price: 1499,
    originalPrice: 1799,
    category: "gifts",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Super-gentle organic bamboo baby set with delicate scalloped edges and soft satin ties. Ideal baby shower gift.",
    description: "Crafted specifically for fragile newborn skin using ultra-breathable, hypoallergenic bamboo-cotton fiber. Designed without uncomfortable seams or synthetic dyes. A cherished keepsake for generations.",
    availability: "Made to Order (2-3 days)",
    colours: [
      { name: "Pure Pearl Cream", hex: "#F8FAF8" },
      { name: "Gentle Morning Sage", hex: "#688A72" },
      { name: "Soft Dune Beige", hex: "#B88B58" }
    ],
    materials: "70% Organic Bamboo, 30% Combed Cotton (Certified Baby Safe)",
    dimensions: "0-6 Months & 6-12 Months sizing available",
    craftTime: "6 hours gentle hand knitting",
    careInstructions: "Hand wash with mild baby detergent. Air dry flat.",
    customizable: true,
    featured: false,
    rating: 5.0,
    reviewCount: 23
  },
  {
    id: "bespoke-custom-crochet-piece",
    name: "Custom Bespoke Crochet Commission",
    price: 1999,
    originalPrice: 2499,
    category: "custom",
    image: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606902965551-dce093cda6e7?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Have an idea in mind? Work directly with artisan JP to bring your custom crochet dream to life.",
    description: "Whether you need a custom-sized throw blanket, specific color-matched tote bag, monogrammed bridal favors, or a personalized plushie keepsake, we collaborate with you one-on-one. You choose the yarn grade, dimensions, color palette, and stitch pattern.",
    availability: "Custom Slots Open (Limited per month)",
    colours: [
      { name: "Custom Palette of Your Choice", hex: "#4E6E58" }
    ],
    materials: "Tailored to your preference (Cotton, Wool, Linen, Bamboo)",
    dimensions: "Customized to your exact requirements",
    craftTime: "5 - 14 days depending on design complexity",
    careInstructions: "Custom care guide provided with finished commission.",
    customizable: true,
    featured: true,
    rating: 5.0,
    reviewCount: 37
  }
];

const ProductStore = {
  getAll: () => PRODUCTS_DATA,
  getFeatured: () => PRODUCTS_DATA.filter(p => p.featured),
  getById: (id) => PRODUCTS_DATA.find(p => p.id === id),
  getByCategory: (category) => {
    if (!category || category === 'all') return PRODUCTS_DATA;
    return PRODUCTS_DATA.filter(p => p.category === category);
  },
  formatPrice: (amount) => `₹${Number(amount).toLocaleString('en-IN')}`
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PRODUCTS_DATA, ProductStore };
}

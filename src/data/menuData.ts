/**
 * The Milkshake Factory - Menu Data
 * 
 * EDIT THIS FILE to add, remove, or modify milkshake items, prices,
 * descriptions, and categories.
 * Sample prices are in Indian Rupees (₹) as requested.
 */

export type MenuCategoryId = 'all' | 'chocolate' | 'fruity' | 'classic' | 'dryfruit' | 'signature';

export interface MenuCategory {
  id: MenuCategoryId;
  label: string;
  description: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategoryId;
  price: number; // in INR (₹)
  description: string;
  image: string;
  volume: string;
  isBestseller?: boolean;
  badge?: string;
  tag?: string;
  ingredients: string[];
}

export const MENU_CATEGORIES: MenuCategory[] = [
  { id: 'all', label: 'All Shakes', description: 'Explore our complete handcrafted collection' },
  { id: 'chocolate', label: 'Chocolate', description: 'Rich, velvety Belgian cocoa & chocolate blends' },
  { id: 'fruity', label: 'Strawberry & Fruity', description: 'Made with real seasonal fruit extracts & creamy milk' },
  { id: 'classic', label: 'Classic', description: 'Timeless old-school cafe favorites done to perfection' },
  { id: 'dryfruit', label: 'Dry Fruit', description: 'Royal roasted nuts, saffron strands, and wholesome energy' },
  { id: 'signature', label: 'Signature Specials', description: 'Our chef creations with decadent toppings & crunchy crusts' },
];

export const MENU_ITEMS: MenuItem[] = [
  // Bestsellers & Sample Items
  {
    id: 'choco-blast',
    name: 'Chocolate Blast',
    category: 'chocolate',
    price: 80,
    volume: '350 ml',
    isBestseller: true,
    badge: 'Bestseller',
    description: 'Double chocolate fudge shake with liquid chocolate drizzle, dark chocolate curls, and crunchy rolled wafer.',
    image: '/src/assets/images/chocolate_blast_shake_1792925923688.jpg',
    ingredients: ['Whole Dairy Milk', 'Belgian Chocolate Ice Cream', 'Dark Cocoa Drizzle', 'Chocolate Wafer'],
  },
  {
    id: 'strawberry-delight',
    name: 'Strawberry Delight',
    category: 'fruity',
    price: 80,
    volume: '350 ml',
    isBestseller: true,
    badge: 'Popular',
    description: 'Fresh strawberry puree blended with rich vanilla cream, topped with fresh strawberry slice and whipped topping.',
    image: '/src/assets/images/strawberry_delight_shake_1792925925397.jpg',
    ingredients: ['Whole Milk', 'Natural Strawberry Puree', 'Creamy Ice Cream', 'Strawberry Crush'],
  },
  {
    id: 'dry-fruit-special',
    name: 'Dry Fruit Special',
    category: 'dryfruit',
    price: 100,
    volume: '350 ml',
    isBestseller: true,
    badge: 'Chef Special',
    description: 'Loaded royal shake with slivered almonds, bright green pistachios, cashew paste, cardamom, and saffron strands.',
    image: '/src/assets/images/dry_fruit_royal_shake_1792925926326.jpg',
    ingredients: ['Full Cream Milk', 'Almonds & Pistachios', 'Cashew Paste', 'Kashmiri Saffron', 'Cardamom'],
  },
  {
    id: 'classic-vanilla',
    name: 'Classic Vanilla',
    category: 'classic',
    price: 70,
    volume: '350 ml',
    isBestseller: false,
    badge: 'Timeless',
    description: 'Pure Madagascar vanilla bean extract infused into slow-churned whole cream ice cream. Smooth, nostalgic, and creamy.',
    image: '/src/assets/images/classic_vanilla_shake_1792925980686.jpg',
    ingredients: ['Whole Dairy Milk', 'Madagascar Vanilla Bean Cream', 'Whipped Topping'],
  },
  {
    id: 'oreo-chocolate',
    name: 'Oreo Chocolate Shake',
    category: 'signature',
    price: 100,
    volume: '350 ml',
    isBestseller: true,
    badge: 'Crowd Favorite',
    description: 'Chilled glass rimmed with crushed Oreos, thick cookies & cream blend, topped with a whole Oreo biscuit and chocolate syrup.',
    image: '/src/assets/images/oreo_biscoff_shake_1792925925977.jpg',
    ingredients: ['Original Oreo Cookies', 'Cocoa Fudge Sauce', 'Vanilla Cream', 'Milk Chocolate Shavings'],
  },
  {
    id: 'mango-alphonso',
    name: 'Mango Alphonso Bliss',
    category: 'fruity',
    price: 90,
    volume: '350 ml',
    isBestseller: false,
    badge: 'Seasonal Gold',
    description: 'Sweet, sun-ripened Alphonso mango pulp churned with velvety milk cream, topped with fresh diced mango chunks.',
    image: '/src/assets/images/mango_alphonso_shake_1792925980989.jpg',
    ingredients: ['Ratnagiri Alphonso Mango Pulp', 'Whole Dairy Milk', 'Cream', 'Fresh Mint Sprig'],
  },
  {
    id: 'belgian-dark-truffle',
    name: 'Belgian Dark Truffle Shake',
    category: 'chocolate',
    price: 110,
    volume: '350 ml',
    isBestseller: false,
    badge: 'Premium Dark',
    description: 'Intense 70% dark Belgian cocoa ganache churned thick with dark chocolate chips and cocoa powder dusting.',
    image: '/src/assets/images/chocolate_blast_shake_1792925923688.jpg',
    ingredients: ['70% Belgian Dark Cocoa', 'Dark Ganache', 'Whole Milk', 'Choco Truffle Bits'],
  },
  {
    id: 'butterscotch-caramel',
    name: 'Butterscotch Caramel Swirl',
    category: 'classic',
    price: 85,
    volume: '350 ml',
    isBestseller: false,
    badge: 'Crunchy',
    description: 'Golden buttery caramel sauce swirled with crunchy butterscotch praline nuggets and creamy vanilla ice cream.',
    image: '/src/assets/images/hero_signature_milkshake_1792925923360.jpg',
    ingredients: ['Salted Butter Caramel', 'Praline Crunch', 'Whole Dairy Milk', 'Whipped Cream'],
  },
  {
    id: 'royal-pistachio-badam',
    name: 'Royal Pistachio Kesar Shake',
    category: 'dryfruit',
    price: 120,
    volume: '350 ml',
    isBestseller: false,
    badge: 'Royal',
    description: 'Fine Iranian pistachios and roasted Mamra almonds blended with saffron milk. Rich in natural protein and wholesome taste.',
    image: '/src/assets/images/dry_fruit_royal_shake_1792925926326.jpg',
    ingredients: ['Green Pistachios', 'Mamra Almonds', 'Saffron Infused Milk', 'Honey Touch'],
  },
  {
    id: 'lotus-biscoff-thickshake',
    name: 'Caramel Biscoff Thickshake',
    category: 'signature',
    price: 125,
    volume: '350 ml',
    isBestseller: false,
    badge: 'Gourmet',
    description: 'Spiced Belgian speculoos cookie butter blended into a dense thickshake, topped with caramelized cookie crumbles.',
    image: '/src/assets/images/hero_signature_milkshake_1792925923360.jpg',
    ingredients: ['Lotus Biscoff Spread', 'Spiced Cookie Crumb', 'Whole Cream', 'Caramel Drizzle'],
  },
];

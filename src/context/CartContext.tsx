import React, { createContext, useContext, useState, useEffect } from 'react';
import { STORE_CONFIG } from '../data/storeConfig';
import { MenuItem } from '../data/menuData';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  isCombo?: boolean;
  notes?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: MenuItem | { id: string; name: string; price: number; image?: string; isCombo?: boolean }, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  
  // Checkout & Ordering helpers
  customerName: string;
  setCustomerName: (name: string) => void;
  customerAddress: string;
  setCustomerAddress: (address: string) => void;
  orderType: 'takeaway' | 'delivery';
  setOrderType: (type: 'takeaway' | 'delivery') => void;
  paymentMethod: 'upi' | 'cash' | 'card';
  setPaymentMethod: (method: 'upi' | 'cash' | 'card') => void;
  upiTransactionRef: string;
  setUpiTransactionRef: (ref: string) => void;
  specialInstructions: string;
  setSpecialInstructions: (note: string) => void;
  getWhatsAppCartUrl: () => string;
  getWhatsAppCartMessage: () => string;
  sendWhatsAppCartOrder: () => void;
  sendSingleItemWhatsApp: (item: MenuItem, quantity?: number, note?: string) => void;
  sendComboWhatsApp: (comboTitle: string, dealPrice: number, items: string[]) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'the_milkshake_factory_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [orderType, setOrderType] = useState<'takeaway' | 'delivery'>('takeaway');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cash' | 'card'>('upi');
  const [upiTransactionRef, setUpiTransactionRef] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  const addItem = (
    item: MenuItem | { id: string; name: string; price: number; image?: string; isCombo?: boolean },
    quantity = 1
  ) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity,
          image: item.image,
          isCombo: 'isCombo' in item ? item.isCombo : false,
        },
      ];
    });
    // Open drawer gently so customer gets visible instant feedback
    setIsCartOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.id === id) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Build formatted message for cart order
  const getWhatsAppCartMessage = (): string => {
    if (items.length === 0) return '';

    const lineBreak = '\n';
    let message = `🥤 *NEW ORDER - ${STORE_CONFIG.brandName.toUpperCase()}*${lineBreak}`;
    message += `-----------------------------------${lineBreak}`;
    message += `📍 *Order Type:* ${orderType === 'delivery' ? 'Home Delivery' : 'Store Takeaway / Pickup'}${lineBreak}`;
    
    if (customerName.trim()) {
      message += `👤 *Customer Name:* ${customerName.trim()}${lineBreak}`;
    }
    
    if (orderType === 'delivery' && customerAddress.trim()) {
      message += `🏠 *Delivery Address:* ${customerAddress.trim()}${lineBreak}`;
    }

    const paymentLabel =
      paymentMethod === 'upi'
        ? `UPI (Google Pay / PhonePe / Paytm) [ID: ${STORE_CONFIG.upiId}]`
        : paymentMethod === 'card'
        ? 'Card / POS Terminal at Counter'
        : orderType === 'delivery'
        ? 'Cash on Delivery (COD)'
        : 'Pay at Store Counter (Cash / UPI)';

    message += `💳 *Payment Method:* ${paymentLabel}${lineBreak}`;
    if (paymentMethod === 'upi' && upiTransactionRef.trim()) {
      message += `🔖 *UPI Ref / UTR:* ${upiTransactionRef.trim()}${lineBreak}`;
    }
    
    message += `-----------------------------------${lineBreak}`;
    message += `*Items Ordered:*${lineBreak}`;
    
    items.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      message += `${index + 1}. ${item.name} x ${item.quantity} = ₹${itemTotal}${lineBreak}`;
    });

    message += `-----------------------------------${lineBreak}`;
    message += `💰 *Total Amount:* ₹${subtotal}${lineBreak}`;

    if (specialInstructions.trim()) {
      message += `📝 *Notes / Customization:* ${specialInstructions.trim()}${lineBreak}`;
    }

    message += `${lineBreak}Please confirm this order, estimated preparation time, and receipt. Thank you!`;
    return message;
  };

  const getWhatsAppCartUrl = (): string => {
    const message = getWhatsAppCartMessage();
    if (!message) return `https://api.whatsapp.com/send?phone=${STORE_CONFIG.whatsappNumber}`;
    return `https://api.whatsapp.com/send?phone=${STORE_CONFIG.whatsappNumber}&text=${encodeURIComponent(message)}`;
  };

  const openWhatsAppUrl = (url: string) => {
    try {
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
      }, 200);
    } catch {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // Send Full Cart to WhatsApp
  const sendWhatsAppCartOrder = () => {
    if (items.length === 0) return;
    const url = getWhatsAppCartUrl();
    openWhatsAppUrl(url);
  };

  // Instant single-item WhatsApp Order
  const sendSingleItemWhatsApp = (item: MenuItem, quantity = 1, note = '') => {
    const total = item.price * quantity;
    const lineBreak = '\n';
    let message = `🥤 *DIRECT ORDER - ${STORE_CONFIG.brandName.toUpperCase()}*${lineBreak}`;
    message += `-----------------------------------${lineBreak}`;
    message += `Item: *${item.name}* (${item.volume})${lineBreak}`;
    message += `Quantity: *${quantity}*${lineBreak}`;
    message += `Price: ₹${item.price} each (Total: *₹${total}*)${lineBreak}`;
    
    if (note.trim()) {
      message += `Customization: ${note.trim()}${lineBreak}`;
    }
    
    message += `-----------------------------------${lineBreak}`;
    message += `Hello! I would like to order this. Please let me know the availability and preparation time.`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${STORE_CONFIG.whatsappNumber}&text=${encodeURIComponent(message)}`;
    openWhatsAppUrl(whatsappUrl);
  };

  // Instant Combo WhatsApp Order
  const sendComboWhatsApp = (comboTitle: string, dealPrice: number, comboItems: string[]) => {
    const lineBreak = '\n';
    let message = `🥤 *SPECIAL COMBO ORDER - ${STORE_CONFIG.brandName.toUpperCase()}*${lineBreak}`;
    message += `-----------------------------------${lineBreak}`;
    message += `Combo: *${comboTitle}*${lineBreak}`;
    message += `Includes: ${comboItems.join(', ')}${lineBreak}`;
    message += `Special Deal Price: *₹${dealPrice}*${lineBreak}`;
    message += `-----------------------------------${lineBreak}`;
    message += `Hello! I'd like to order this special combo deal. Please confirm availability and delivery / takeaway details.`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${STORE_CONFIG.whatsappNumber}&text=${encodeURIComponent(message)}`;
    openWhatsAppUrl(whatsappUrl);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        customerName,
        setCustomerName,
        customerAddress,
        setCustomerAddress,
        orderType,
        setOrderType,
        paymentMethod,
        setPaymentMethod,
        upiTransactionRef,
        setUpiTransactionRef,
        specialInstructions,
        setSpecialInstructions,
        getWhatsAppCartUrl,
        getWhatsAppCartMessage,
        sendWhatsAppCartOrder,
        sendSingleItemWhatsApp,
        sendComboWhatsApp,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

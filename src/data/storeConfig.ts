/**
 * The Milkshake Factory - Store Configuration & Business Settings
 * 
 * EDIT THIS FILE to update your shop's contact numbers, WhatsApp number,
 * store address, opening hours, and social media links.
 * All changes here instantly reflect throughout the entire website.
 */

export interface StoreConfig {
  brandName: string;
  tagline: string;
  subTagline: string;
  
  // WhatsApp & Phone (Placeholder values until you put your real phone number)
  // Format for WhatsApp URL: Country code without '+' or special symbols, e.g., '919876543210' for India (+91)
  whatsappNumber: string;
  whatsappDisplay: string;
  phoneRaw: string;
  phoneDisplay: string;
  
  // Store Location & Hours
  addressLine1: string;
  addressLine2: string;
  cityStatePincode: string;
  openingHoursDisplay: string;
  openingDays: string;
  
  // Map and Social Links
  googleMapsUrl: string;
  instagramUrl: string;
  instagramHandle: string;
  
  // Ordering & Payment details
  currencySymbol: string;
  minimumOrderForDelivery: number;
  deliveryNotice: string;
  isConfiguredPlaceholder: boolean;
  upiId: string;
  upiName: string;
  accountHolderName: string;
  upiProvider: string;
  qrScannerImage: string;
  upiAppsSupported: string[];
}

export const STORE_CONFIG: StoreConfig = {
  brandName: "The Milkshake Factory",
  tagline: "Sip Happiness. Taste the Magic.",
  subTagline: "Handcrafted thickshakes made with 100% pure dairy cream, slow-churned ice cream, and fresh artisanal ingredients.",
  
  // -------------------------------------------------------------
  // STORE CONTACT NUMBERS
  // -------------------------------------------------------------
  whatsappNumber: "919963206389",
  whatsappDisplay: "+91 99632 06389",
  phoneRaw: "+919963206389",
  phoneDisplay: "+91 99632 06389",
  
  addressLine1: "Shop #4, Ground Floor, Baker's Avenue",
  addressLine2: "Opposite City Central Park, Main Market Road",
  cityStatePincode: "Bengaluru, Karnataka 560001",
  
  openingDays: "Open All 7 Days",
  openingHoursDisplay: "11:00 AM – 11:30 PM",
  
  googleMapsUrl: "https://maps.google.com/?q=The+Milkshake+Factory",
  instagramUrl: "https://instagram.com/themilkshakefactory_sample",
  instagramHandle: "@themilkshakefactory",
  
  currencySymbol: "₹",
  minimumOrderForDelivery: 150,
  deliveryNotice: "Free takeaway pickup. Home delivery available within 5 km on WhatsApp orders above ₹150.",
  isConfiguredPlaceholder: false,
  
  // Payment Options
  upiId: "9963206389@upi",
  upiName: "The Milkshake Factory",
  accountHolderName: "Manivisetti Lakshmi Sri",
  upiProvider: "PhonePe",
  qrScannerImage: "/assets/aistudio/scanner_99305872.jpeg",
  upiAppsSupported: ["PhonePe", "Google Pay", "Paytm", "BHIM UPI"],
};

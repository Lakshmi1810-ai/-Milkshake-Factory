/**
 * The Milkshake Factory - Special Offers & Combos
 * 
 * EDIT THIS FILE to add or adjust promotional combos, bundle savings,
 * and seasonal specials.
 */

export interface ComboOffer {
  id: string;
  title: string;
  subtitle: string;
  itemsIncluded: string[];
  originalPrice: number;
  dealPrice: number;
  savings: number;
  badge: string;
  popularFor: string;
  isFeatured?: boolean;
}

export const COMBO_OFFERS: ComboOffer[] = [
  {
    id: 'combo-twin-treat',
    title: 'Twin Classic Treat',
    subtitle: 'Double the happiness with two classic chilled favorites',
    itemsIncluded: ['1x Classic Vanilla', '1x Butterscotch Caramel Swirl'],
    originalPrice: 155,
    dealPrice: 135,
    savings: 20,
    badge: 'Popular Deal',
    popularFor: 'Perfect for couples & besties',
  },
  {
    id: 'combo-choco-duo',
    title: "Chocoholic's Dream Duo",
    subtitle: 'Our top two decadent chocolate thickshakes bundled together',
    itemsIncluded: ['1x Chocolate Blast', '1x Oreo Chocolate Shake'],
    originalPrice: 180,
    dealPrice: 160,
    savings: 20,
    badge: 'Bestselling Combo',
    popularFor: 'Ultimate chocolate lovers',
    isFeatured: true,
  },
  {
    id: 'combo-royal-nuts',
    title: 'Royal Nutty Celebration',
    subtitle: 'Pure roasted dry fruit indulgence and stamina boost',
    itemsIncluded: ['1x Dry Fruit Special', '1x Royal Pistachio Kesar'],
    originalPrice: 220,
    dealPrice: 195,
    savings: 25,
    badge: 'Premium Pick',
    popularFor: 'Fitness & royal taste enthusiasts',
  },
  {
    id: 'combo-family-party-box',
    title: 'Factory 4-Pack Party Box',
    subtitle: 'Handpicked crowd favorites with free chocolate wafer sticks',
    itemsIncluded: [
      '1x Chocolate Blast',
      '1x Strawberry Delight',
      '1x Oreo Chocolate Shake',
      '1x Classic Vanilla'
    ],
    originalPrice: 330,
    dealPrice: 290,
    savings: 40,
    badge: 'Best Value',
    popularFor: 'Families & weekend gatherings',
    isFeatured: true,
  },
];

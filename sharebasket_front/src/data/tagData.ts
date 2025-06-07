
export interface Tag {
  value: string;
  label: string;
  emoji: string;
}

export interface TagCategory {
  value: string;
  label: string;
  emoji: string;
  tags: Tag[];
}

export const tagCategories: TagCategory[] = [
  {
    value: 'groceries',
    label: 'Groceries',
    emoji: '📦',
    tags: [
      { value: 'fruits', label: 'Fruits', emoji: '🍎' },
      { value: 'vegetables', label: 'Vegetables', emoji: '🥬' },
      { value: 'meat', label: 'Meat', emoji: '🥩' },
      { value: 'seafood', label: 'Seafood', emoji: '🐟' },
      { value: 'instant-foods', label: 'Instant Foods / Ramen', emoji: '🍜' },
      { value: 'canned', label: 'Canned / Preserved', emoji: '🥫' },
      { value: 'bakery', label: 'Bread / Bakery', emoji: '🍞' },
      { value: 'dairy', label: 'Dairy', emoji: '🧀' },
      { value: 'snacks', label: 'Snacks / Cookies', emoji: '🍪' },
      { value: 'beverages', label: 'Beverages / Water', emoji: '🥤' }
    ]
  },
  {
    value: 'daily-essentials',
    label: 'Daily Essentials',
    emoji: '🧻',
    tags: [
      { value: 'cleaning', label: 'Detergent / Cleaning', emoji: '🧴' },
      { value: 'tissues', label: 'Tissues / Paper Towels', emoji: '🧻' },
      { value: 'bathroom', label: 'Bathroom Supplies', emoji: '🪒' },
      { value: 'personal-care', label: 'Soap / Shampoo / Cleansing', emoji: '🧼' },
      { value: 'kitchen-consumables', label: 'Kitchen Consumables', emoji: '🧽' }
    ]
  },
  {
    value: 'beauty',
    label: 'Beauty',
    emoji: '💄',
    tags: [
      { value: 'beauty-general', label: 'Beauty', emoji: '💄' },
      { value: 'skincare', label: 'Skincare', emoji: '🧴' },
      { value: 'eye-makeup', label: 'Eye Makeup', emoji: '👁' },
      { value: 'lip-makeup', label: 'Lip Makeup', emoji: '💋' },
      { value: 'nail', label: 'Nail', emoji: '💅' },
      { value: 'mask-pack', label: 'Pack & Mask', emoji: '🧖‍♀️' },
      { value: 'hair-removal', label: 'Hair Removal & Body Care', emoji: '🪒' },
      { value: 'cleansing', label: 'Cleansing', emoji: '🧼' }
    ]
  },
  {
    value: 'pet-supplies',
    label: 'Pet Supplies',
    emoji: '🐾',
    tags: [
      { value: 'cat-food', label: 'Cat Food / Treats', emoji: '🐱' },
      { value: 'dog-food', label: 'Dog Food / Treats', emoji: '🐶' },
      { value: 'litter', label: 'Litter / Waste Supplies', emoji: '🧴' },
      { value: 'pet-toys', label: 'Toys / Other Supplies', emoji: '🧸' }
    ]
  },
  {
    value: 'shared-goods',
    label: 'Shared Goods',
    emoji: '🛒',
    tags: [
      { value: 'bulk-beverages', label: 'Bulk Beverages', emoji: '🧃' },
      { value: 'containers', label: 'Reusable Containers', emoji: '🍽️' },
      { value: 'water-delivery', label: 'Water Delivery', emoji: '🧃' },
      { value: 'multipack', label: 'Bundle Shipping', emoji: '📦' }
    ]
  },
  {
    value: 'stationery',
    label: 'Stationery / Office',
    emoji: '🧑‍🏫',
    tags: [
      { value: 'pens', label: 'Writing Tools', emoji: '✏️' },
      { value: 'notebooks', label: 'Notebooks / Paper', emoji: '📒' },
      { value: 'office-supplies', label: 'Other Stationery', emoji: '🖍️' }
    ]
  },
  {
    value: 'etc',
    label: 'Others',
    emoji: '🔌',
    tags: [
      { value: 'emergency', label: 'Emergency Supplies', emoji: '🧯' },
      { value: 'seasonal', label: 'Seasonal Items', emoji: '🧊' }
    ]
  }
];

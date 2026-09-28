export const providers = [
  {
    id: 'p1',
    name: 'Sunshine Cleaners',
    initials: 'SC',
    tagline: 'Eco-friendly deep cleaning specialists',
    rating: 4.8,
    reviewsCount: 214,
    pricePerHour: 25,
    location: 'Panaji, Goa',
    tags: ['Deep Cleaning', 'Eco-friendly', 'Kitchen'],
    description:
      'Sunshine Cleaners has been serving the local community for 6 years. We use biodegradable products and trained, background-verified staff for every home.',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    slots: ['09:00 - 11:00', '11:00 - 13:00', '14:00 - 16:00', '16:00 - 18:00'],
  },
  {
    id: 'p2',
    name: 'QuickShine Home Services',
    initials: 'QS',
    tagline: 'Fast, affordable standard cleaning',
    rating: 4.3,
    reviewsCount: 132,
    pricePerHour: 15,
    location: 'Margao, Goa',
    tags: ['Standard Cleaning', 'Budget Friendly'],
    description:
      'QuickShine focuses on quick turnarounds for busy households. Great for regular weekly or bi-weekly upkeep at an affordable rate.',
    availableDays: ['Mon', 'Wed', 'Fri', 'Sat', 'Sun'],
    slots: ['08:00 - 10:00', '10:00 - 12:00', '17:00 - 19:00'],
  },
  {
    id: 'p3',
    name: 'ProShine Facility Care',
    initials: 'PF',
    tagline: 'Premium cleaning for large homes & villas',
    rating: 4.9,
    reviewsCount: 89,
    pricePerHour: 40,
    location: 'Candolim, Goa',
    tags: ['Deep Cleaning', 'Villa Specialist', 'Move-in/Move-out'],
    description:
      'ProShine specializes in large properties and villas, offering a full team dispatch with equipment for pressure washing, upholstery and window cleaning.',
    availableDays: ['Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    slots: ['09:00 - 12:00', '13:00 - 16:00'],
  },
  {
    id: 'p4',
    name: 'GreenLeaf Housekeeping',
    initials: 'GL',
    tagline: 'Non-toxic products, pet & baby safe',
    rating: 4.6,
    reviewsCount: 176,
    pricePerHour: 20,
    location: 'Porvorim, Goa',
    tags: ['Eco-friendly', 'Pet Safe', 'Standard Cleaning'],
    description:
      'GreenLeaf uses only certified non-toxic cleaning products, ideal for homes with children, pets, or allergy-sensitive residents.',
    availableDays: ['Mon', 'Tue', 'Thu', 'Fri', 'Sun'],
    slots: ['09:00 - 11:00', '12:00 - 14:00', '15:00 - 17:00'],
  },
  {
    id: 'p5',
    name: 'UrbanNest Cleaners',
    initials: 'UN',
    tagline: 'On-demand cleaning within 2 hours',
    rating: 4.1,
    reviewsCount: 58,
    pricePerHour: 18,
    location: 'Mapusa, Goa',
    tags: ['Standard Cleaning', 'On-Demand'],
    description:
      'UrbanNest is built for last-minute bookings — most requests can be fulfilled within two hours in the Mapusa area.',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    slots: ['07:00 - 09:00', '09:00 - 11:00', '18:00 - 20:00'],
  },
]

export function getProviderById(id) {
  return providers.find((p) => p.id === id)
}
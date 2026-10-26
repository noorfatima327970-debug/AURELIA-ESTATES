export const properties = [
  {
    id: 1,
    name: "The Azure Residence",
    location: "Malibu, California",
    price: 4850000,
    beds: 5,
    baths: 6,
    area: 6200,
    type: "Villa",
    status: "Featured",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1400&auto=format&fit=crop&q=85",
    description:
      "A remarkable contemporary residence where architectural elegance meets coastal serenity.",
  },
  {
    id: 2,
    name: "Villa Serene",
    location: "Beverly Hills, California",
    price: 6250000,
    beds: 6,
    baths: 7,
    area: 7800,
    type: "Villa",
    status: "Exclusive",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&auto=format&fit=crop&q=85",
    description:
      "An exceptional sanctuary defined by timeless materials, natural light and refined interiors.",
  },
  {
    id: 3,
    name: "The Horizon House",
    location: "Miami, Florida",
    price: 3950000,
    beds: 4,
    baths: 5,
    area: 5400,
    type: "Residence",
    status: "New",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1400&auto=format&fit=crop&q=85",
    description:
      "A sophisticated residence celebrating contemporary design and effortless luxury.",
  },
  {
    id: 4,
    name: "Oakwood Estate",
    location: "Los Angeles, California",
    price: 5200000,
    beds: 5,
    baths: 6,
    area: 6900,
    type: "Estate",
    status: "Featured",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1400&auto=format&fit=crop&q=85",
    description:
      "A beautifully considered estate surrounded by nature and architectural sophistication.",
  },
  {
    id: 5,
    name: "The Glass Pavilion",
    location: "Palm Springs, California",
    price: 3750000,
    beds: 4,
    baths: 4,
    area: 4800,
    type: "Villa",
    status: "Exclusive",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1400&auto=format&fit=crop&q=85",
    description:
      "An extraordinary modern retreat with open spaces and a striking architectural identity.",
  },
  {
    id: 6,
    name: "Solstice Residence",
    location: "San Diego, California",
    price: 4450000,
    beds: 5,
    baths: 5,
    area: 5900,
    type: "Residence",
    status: "New",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1400&auto=format&fit=crop&q=85",
    description:
      "A refined expression of modern living, designed for comfort, beauty and connection.",
  },
];

export const formatPrice = (price) =>
  `$${Number(price).toLocaleString("en-US")}`;
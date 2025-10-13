// export interface Product {
//   id: number
//   name: string
//   subTitle?: string;
//   slug: string
//   price: number
//   image: string
//   images: string[]
//   description: string
//   variants?: string[]
//   colors?: string[]
// }

// export const products: Product[] = [
//   {
//     id: 1,
//     name: "brazil | medium roast | 220 gm",
//     slug: "brazil-medium-roast",
//     price: 1140,
//     image: "/images/1.png",
//     images: [
//       "/images/1.png",
//     ],
//     description:
//       "Handcrafted from solid oak wood, this minimal chair combines timeless design with exceptional comfort. Perfect for dining rooms or home offices.",
//     variants: ["Standard", "Wide"],
//     colors: ["Natural Oak", "Walnut", "White Oak"],
//   },
//   {
//     id: 2,
//     name: "colombia | medium dark roast | 220 gm",
//     slug: "colombia-medium-dark",
//     price: 1270,
//     image: "/images/2.png",
//     images: ["/images/2.png"],
//     description:
//       "A set of three handmade ceramic vases with a modern matte finish. Each piece is unique and adds an elegant touch to any space.",
//     colors: ["Matte White", "Charcoal", "Sage Green"],
//   },
//   {
//     id: 3,
//     name: "mandheling | medium dark roast | 220 gm",
//     slug: "mandheling-medium-dark",
//     price: 45.0,
//     image: "/images/4.png",
//     images: ["/images/4.png"],
//     description:
//       "Made from 100% European linen, this throw pillow brings natural texture and comfort to your living space. Machine washable for easy care.",
//     colors: ["Natural", "Stone Gray", "Dusty Rose"],
//   },
//   {
//     id: 4,
//     name: "guatemala | medium roast | 220 gm",
//     slug: "guatemala-medium-roast",
//     price: 1155,
//     image: "/images/5.png",
//     images: ["/images/5.png"],
//     description:
//       "Contemporary brass table lamp with adjustable arm and dimmer switch. Provides warm, focused lighting perfect for reading or working.",
//     colors: ["Brass", "Matte Black"],
//   },
//   {
//     id: 5,
//     name: "tanzania | medium dark roast | 220 gm",
//     slug: "tanzania-medium-dark-roast",
//     price: 1285,
//     image: "/images/6.png",
//     images: ["/images/6.png"],
//     description:
//       "Hand-woven from premium New Zealand wool. This durable area rug features a subtle geometric pattern and natural color palette.",
//     variants: ["5x7 ft", "8x10 ft", "9x12 ft"],
//     colors: ["Ivory", "Charcoal", "Beige"],
//   },
//   {
//     id: 6,
//     name: "elsalvador | medium dark roast | 220 gm",
//     slug: "elsalvador-medium-dark-roast",
//     price: 1320,
//     image: "/images/3.png",
//     images: ["/images/3.png"],
//     description:
//       "Modern coffee table with tempered glass top and solid oak base. The minimalist design complements any contemporary living space.",
//     colors: ["Clear Glass", "Smoked Glass"],
//   },
//   {
//     id: 7,
//     name: "decaf mandheling | medium dark roast | 220 gm",
//     slug: "decaf-mandheling-medium-dark",
//     price: 1240,
//     image: "/images/7.png",
//     images: ["/images/7.png"],
//     description:
//       "Luxurious organic cotton bedding set includes duvet cover and two pillowcases. Breathable, soft, and gets better with every wash.",
//     variants: ["Queen", "King"],
//     colors: ["White", "Light Gray", "Sage"],
//   }
// ]


// export const blendProducts: Product[] = [
//   {
//     id: 1,
//     name: "filter roast | medium dark roast | 220 gm",
//     slug: "filter-roast-medium-dark-roast",
//     price: 1215,
//     image: "/images/8.png",
//     images: [
//       "/images/8.png"],
//     description:
//       "Handcrafted from solid oak wood, this minimal chair combines timeless design with exceptional comfort. Perfect for dining rooms or home offices.",
//     variants: ["Standard", "Wide"],
//     colors: ["Natural Oak", "Walnut", "White Oak"],
//   },
//   {
//     id: 2,
//     name: "bandarban blend | medium dark roast | 220 gm",
//     subTitle: "limited roast/ seasonal",
//     slug: "bandarban-blend-medium-dark-roas",
//     price: 985,
//     image: "/images/2.png",
//     images: ["/images/2.png"],
//     description:
//       "A set of three handmade ceramic vases with a modern matte finish. Each piece is unique and adds an elegant touch to any space.",
//     colors: ["Matte White", "Charcoal", "Sage Green"],
//   },
//   {
//     id: 3,
//     name: "signature blend | medium dark roast | 220 gm",
//     subTitle: "omni roast/ espresso",
//     slug: "signature-blend-medium-dark-roast",
//     price: 1215,
//     image: "/images/4.png",
//     images: ["/images/4.png"],
//     description:
//       "Made from 100% European linen, this throw pillow brings natural texture and comfort to your living space. Machine washable for easy care.",
//     colors: ["Natural", "Stone Gray", "Dusty Rose"],
//   },
//   {
//     id: 4,
//     name: "barista blend | medium dark roast | 220 gm",
//     slug: "barista-blend-medium-dark-roast",
//     subTitle: "roasted for espresso",
//     price: 1015,
//     image: "/images/5.png",
//     images: ["/images/5.png"],
//     description:
//       "Contemporary brass table lamp with adjustable arm and dimmer switch. Provides warm, focused lighting perfect for reading or working.",
//     colors: ["Brass", "Matte Black"],
//   },
//   {
//     id: 5,
//     name: "signature blend | medium dark roast | 1 kg",
//     slug: "signature-blend-medium-dark-roast",
//     subTitle: "omni roast/ espresso",
//     price: 4000,
//     image: "/images/12.png",
//     images: ["/images/12.png"],
//     description:
//       "Hand-woven from premium New Zealand wool. This durable area rug features a subtle geometric pattern and natural color palette.",
//     variants: ["5x7 ft", "8x10 ft", "9x12 ft"],
//     colors: ["Ivory", "Charcoal", "Beige"],
//   },
//   {
//     id: 6,
//     name: "barista blend | medium dark roast | 1 kg",
//     slug: "barista-blend-medium-dark-roast",
//     subTitle: "roasted for espresso",
//     price: 3670,
//     image: "/images/13.png",
//     images: ["/images/13.png"],
//     description:
//       "Modern coffee table with tempered glass top and solid oak base. The minimalist design complements any contemporary living space.",
//     colors: ["Clear Glass", "Smoked Glass"],
//   },

// ]

// export function getProductBySlug(slug: string): Product | undefined {
//   return blendProducts.concat(products).find((product) => product.slug === slug)
// }

// export function getRecommendedProducts(currentProductId: number, limit = 4): Product[] {
//   return products.filter((product) => product.id !== currentProductId).slice(0, limit)
// }

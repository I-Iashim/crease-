/**
 * products-data.js
 * Static product catalog for the frontend-only phase.
 * Shape mirrors what /data/products.json + the Express API will return later,
 * so shop.js / product.js won't need to change when the backend is wired in —
 * only the fetch source will move from PRODUCTS (this array) to /api/products.
 */
const PRODUCTS_FALLBACK = [
  // ---------------- MEN ----------------
  { id:"m01", category:"men", name:"Ashford Tailored Blazer", price:189, oldPrice:240, rating:4.8, reviews:34, stock:12,
    tags:["bestseller"], colors:["Navy","Charcoal"], sizes:["S","M","L","XL"],
    images:["https://picsum.photos/seed/m01a/700/900","https://picsum.photos/seed/m01b/700/900","https://picsum.photos/seed/m01c/700/900"],
    desc:"A sharply tailored blazer cut from Italian wool-blend twill. Structured shoulders, a nipped waist, and horn-effect buttons make this the anchor of any western wardrobe." },
  { id:"m02", category:"men", name:"Harrington Slim Chinos", price:79, rating:4.5, reviews:21, stock:28,
    tags:["new"], colors:["Stone","Olive","Black"], sizes:["30","32","34","36"],
    images:["https://picsum.photos/seed/m02a/700/900","https://picsum.photos/seed/m02b/700/900"],
    desc:"Slim through the leg with just enough stretch to move with you. A brushed cotton twill that softens with every wash." },
  { id:"m03", category:"men", name:"Oxford Weave Shirt", price:64, oldPrice:89, rating:4.6, reviews:58, stock:40,
    tags:["sale"], colors:["White","Sky Blue"], sizes:["S","M","L","XL"],
    images:["https://picsum.photos/seed/m03a/700/900","https://picsum.photos/seed/m03b/700/900"],
    desc:"A long-staple cotton Oxford with a soft roll collar — equally at home under a blazer or with sleeves rolled." },
  { id:"m04", category:"men", name:"Merino Crewneck Sweater", price:98, rating:4.7, reviews:19, stock:15,
    tags:[], colors:["Camel","Ink"], sizes:["S","M","L","XL"],
    images:["https://picsum.photos/seed/m04a/700/900","https://picsum.photos/seed/m04b/700/900"],
    desc:"Fine-gauge merino knit, brushed for softness. Layers cleanly under outerwear without adding bulk." },
  { id:"m05", category:"men", name:"Waxed Field Jacket", price:229, rating:4.9, reviews:44, stock:8,
    tags:["bestseller"], colors:["Forest","Black"], sizes:["M","L","XL"],
    images:["https://picsum.photos/seed/m05a/700/900","https://picsum.photos/seed/m05b/700/900"],
    desc:"Waxed cotton canvas shell with a wool-blend collar. Built for the in-between seasons, styled for every one of them." },
  { id:"m06", category:"men", name:"Straight Fit Denim", price:92, rating:4.4, reviews:27, stock:0,
    tags:[], colors:["Indigo"], sizes:["30","32","34","36"],
    images:["https://picsum.photos/seed/m06a/700/900","https://picsum.photos/seed/m06b/700/900"],
    desc:"A rigid, non-stretch denim in a straight leg — the kind that breaks in and only gets better." },

  // ---------------- WOMEN ----------------
  { id:"w01", category:"women", name:"Silk Wrap Midi Dress", price:159, rating:4.8, reviews:61, stock:16,
    tags:["bestseller"], colors:["Emerald","Black"], sizes:["XS","S","M","L"],
    images:["https://picsum.photos/seed/w01a/700/900","https://picsum.photos/seed/w01b/700/900","https://picsum.photos/seed/w01c/700/900"],
    desc:"100% mulberry silk, cut on the bias to skim rather than cling. A single wrap tie defines the waist." },
  { id:"w02", category:"women", name:"Tailored Wide-Leg Trouser", price:118, oldPrice:150, rating:4.6, reviews:38, stock:22,
    tags:["sale"], colors:["Cream","Black"], sizes:["XS","S","M","L","XL"],
    images:["https://picsum.photos/seed/w02a/700/900","https://picsum.photos/seed/w02b/700/900"],
    desc:"A high-rise, wide-leg trouser with a fluid drape. Fully lined, finished with a concealed side zip." },
  { id:"w03", category:"women", name:"Cashmere Blend Cardigan", price:139, rating:4.9, reviews:29, stock:11,
    tags:["new"], colors:["Oatmeal","Blush"], sizes:["XS","S","M","L"],
    images:["https://picsum.photos/seed/w03a/700/900","https://picsum.photos/seed/w03b/700/900"],
    desc:"A relaxed longline cardigan in a cashmere-wool blend, soft enough to live in on quiet mornings." },
  { id:"w04", category:"women", name:"Structured Trench Coat", price:249, rating:4.7, reviews:52, stock:9,
    tags:["bestseller"], colors:["Camel"], sizes:["XS","S","M","L","XL"],
    images:["https://picsum.photos/seed/w04a/700/900","https://picsum.photos/seed/w04b/700/900"],
    desc:"A double-breasted trench in water-resistant cotton gabardine, with a storm flap and belted waist." },
  { id:"w05", category:"women", name:"Pleated Satin Skirt", price:89, rating:4.5, reviews:24, stock:19,
    tags:[], colors:["Champagne","Black"], sizes:["XS","S","M","L"],
    images:["https://picsum.photos/seed/w05a/700/900","https://picsum.photos/seed/w05b/700/900"],
    desc:"Fine knife pleats in a fluid satin that catches the light with every step." },
  { id:"w06", category:"women", name:"Merino Turtleneck", price:74, rating:4.6, reviews:33, stock:26,
    tags:[], colors:["Ivory","Ash Grey"], sizes:["XS","S","M","L","XL"],
    images:["https://picsum.photos/seed/w06a/700/900","https://picsum.photos/seed/w06b/700/900"],
    desc:"A close, second-skin turtleneck in extra-fine merino — the quiet layer that goes under everything." },

  // ---------------- SHOES ----------------
  { id:"s01", category:"shoes", name:"Ashworth Leather Oxford", price:199, rating:4.8, reviews:47, stock:14,
    tags:["bestseller"], colors:["Black","Oxblood"], sizes:["7","8","9","10","11"],
    images:["https://picsum.photos/seed/s01a/700/900","https://picsum.photos/seed/s01b/700/900"],
    desc:"Full-grain leather Oxfords, Goodyear welted for a sole that can be resoled for decades of wear." },
  { id:"s02", category:"shoes", name:"Minimal Court Sneaker", price:129, oldPrice:160, rating:4.6, reviews:65, stock:31,
    tags:["sale"], colors:["White","Bone"], sizes:["6","7","8","9","10"],
    images:["https://picsum.photos/seed/s02a/700/900","https://picsum.photos/seed/s02b/700/900"],
    desc:"A clean-lined court sneaker in smooth leather, built on a cupsole for all-day comfort." },
  { id:"s03", category:"shoes", name:"Suede Chelsea Boot", price:179, rating:4.7, reviews:39, stock:17,
    tags:["new"], colors:["Taupe","Black"], sizes:["7","8","9","10","11"],
    images:["https://picsum.photos/seed/s03a/700/900","https://picsum.photos/seed/s03b/700/900"],
    desc:"Elastic-gusset Chelsea boots in brushed suede, with a stacked leather heel." },
  { id:"s04", category:"shoes", name:"Heeled Ankle Strap Sandal", price:139, rating:4.5, reviews:22, stock:13,
    tags:[], colors:["Nude","Black"], sizes:["5","6","7","8","9"],
    images:["https://picsum.photos/seed/s04a/700/900","https://picsum.photos/seed/s04b/700/900"],
    desc:"A fine ankle-strap sandal on a lacquered block heel, balanced for comfort and for the room." },
  { id:"s05", category:"shoes", name:"Weekend Canvas Trainer", price:89, rating:4.4, reviews:18, stock:0,
    tags:[], colors:["Ecru"], sizes:["6","7","8","9","10","11"],
    images:["https://picsum.photos/seed/s05a/700/900","https://picsum.photos/seed/s05b/700/900"],
    desc:"An off-duty canvas trainer with a vulcanised rubber sole, made for long days on foot." },

  // ---------------- ACCESSORIES ----------------
  { id:"a01", category:"accessories", name:"Full-Grain Leather Belt", price:59, rating:4.7, reviews:41, stock:38,
    tags:["bestseller"], colors:["Black","Tan"], sizes:["S","M","L"],
    images:["https://picsum.photos/seed/a01a/700/900","https://picsum.photos/seed/a01b/700/900"],
    desc:"A single-piece full-grain leather belt with a solid brass buckle, built to age gracefully." },
  { id:"a02", category:"accessories", name:"Structured Top-Handle Bag", price:219, rating:4.8, reviews:30, stock:10,
    tags:["new"], colors:["Camel","Black"], sizes:["One Size"],
    images:["https://picsum.photos/seed/a02a/700/900","https://picsum.photos/seed/a02b/700/900"],
    desc:"A boxy top-handle bag in pebbled leather with a detachable cross-body strap." },
  { id:"a03", category:"accessories", name:"Silk Twill Scarf", price:49, oldPrice:65, rating:4.6, reviews:26, stock:24,
    tags:["sale"], colors:["Ink Paisley","Gold Stripe"], sizes:["One Size"],
    images:["https://picsum.photos/seed/a03a/700/900","https://picsum.photos/seed/a03b/700/900"],
    desc:"Hand-rolled edges on a printed silk twill square, finished in-house." },
  { id:"a04", category:"accessories", name:"Aviator Sunglasses", price:99, rating:4.5, reviews:35, stock:20,
    tags:[], colors:["Gold/Green","Black/Grey"], sizes:["One Size"],
    images:["https://picsum.photos/seed/a04a/700/900","https://picsum.photos/seed/a04b/700/900"],
    desc:"Precision-ground polarised lenses on a lightweight titanium-alloy frame." },
  { id:"a05", category:"accessories", name:"Minimalist Watch, Steel", price:249, rating:4.9, reviews:52, stock:7,
    tags:["bestseller"], colors:["Silver","Gunmetal"], sizes:["One Size"],
    images:["https://picsum.photos/seed/a05a/700/900","https://picsum.photos/seed/a05b/700/900"],
    desc:"A sapphire-crystal dress watch on a brushed steel bracelet — quietly precise, built to be worn daily." },
];

// PRODUCTS starts as the offline fallback (so pages render instantly even
// without the server) and is swapped for live API data by components.js
// via setProducts() once /api/products responds.
let PRODUCTS = PRODUCTS_FALLBACK;
let NEW_ARRIVALS = [];
let BEST_SELLERS = [];
let SALE_ITEMS = [];

function recomputeProductLists() {
  NEW_ARRIVALS = PRODUCTS.filter((p) => p.tags && p.tags.includes("new"));
  BEST_SELLERS = PRODUCTS.filter((p) => p.tags && p.tags.includes("bestseller"));
  SALE_ITEMS = PRODUCTS.filter((p) => p.tags && p.tags.includes("sale"));
}
function setProducts(list) {
  if (Array.isArray(list) && list.length) PRODUCTS = list;
  recomputeProductLists();
}
recomputeProductLists();

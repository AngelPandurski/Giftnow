/** Mock store за продукти (localStorage). Премахва се при backend. */
export type Product = {
  id: string;
  title: string;
  shortDescription: string;
  imageUrl?: string; // base64 data URL или URL при backend
};

const STORAGE_KEY = "giftnow_products";

const DEFAULT_PRODUCTS: Product[] = [
  { id: "1", title: "Луксозно спално бельо от Georg Jensen Damask - 2 комплекта", shortDescription: "2 комплекта" },
  { id: "2", title: "Голям комплект тигани House of Chefs Reborn - 3 бр.", shortDescription: "3 бр." },
  { id: "3", title: "Красива Royal Copenhagen купа или яйцедробилки - 3 бр.", shortDescription: "3 бр." },
  { id: "4", title: "Tobias Jacobsen кабинет куфар с smart PC джоб", shortDescription: "1 бр." },
  { id: "5", title: "Ексклузивен комплект куфари от Tobias Jacobsen - 2 части", shortDescription: "2 части" },
  { id: "6", title: "Стилен Dyberg Larsen Skagerrak подова или настолна лампа", shortDescription: "1 бр." },
  { id: "7", title: "Мощен House of Chefs Steel блендер", shortDescription: "1 бр." },
  { id: "8", title: "Tobias Jacobsen Smart Ring матов стомана", shortDescription: "1 бр." },
];

function getProducts(): Product[] {
  if (typeof window === "undefined") return DEFAULT_PRODUCTS;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return DEFAULT_PRODUCTS;
}

export function loadProducts(): Product[] {
  return getProducts();
}

export function saveProducts(products: Product[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function addProduct(product: Omit<Product, "id">): Product {
  const products = getProducts();
  const id = String(Date.now());
  const newProduct = { ...product, id };
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
}

export function updateProduct(id: string, updates: Partial<Omit<Product, "id">>): Product | null {
  const products = getProducts();
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  products[idx] = { ...products[idx], ...updates };
  saveProducts(products);
  return products[idx];
}

export function deleteProduct(id: string): boolean {
  const products = getProducts().filter((p) => p.id !== id);
  if (products.length === getProducts().length) return false;
  saveProducts(products);
  return true;
}

import { fetchProducts } from "@/lib/haravanService";

export async function GET() {
  try {
    const products = await fetchProducts();
    return Response.json(products);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

import { fetchProductById } from "@/lib/haravanService";

export async function GET(_, { params }) {
  try {
    const product = await fetchProductById(params.id);
    if (!product) return Response.json({ error: "Not found" }, { status: 404 });
    return Response.json(product);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

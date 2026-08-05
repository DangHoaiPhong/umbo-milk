import { fetchLocations } from "@/lib/haravanService";

export async function GET() {
  try {
    const locations = await fetchLocations();
    return Response.json(locations);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

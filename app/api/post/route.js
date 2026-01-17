import { sql } from "@vercel/postgres";

export async function POST(req) {
  const body = await req.json();
  const { content, imageUrl, type } = body;

  await sql`
    INSERT INTO posts (content, image_url, type)
    VALUES (${content}, ${imageUrl}, ${type})
  `;

  return Response.json({ success: true });
}

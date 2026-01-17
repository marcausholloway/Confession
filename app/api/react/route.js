import { sql } from "@vercel/postgres";

export async function POST(req) {
  const { postId, reaction } = await req.json();

  await sql`
    UPDATE posts
    SET reactions = jsonb_set(
      reactions,
      ARRAY[${reaction}],
      (reactions->>${reaction})::int + 1
    )
    WHERE id = ${postId}
  `;

  return Response.json({ success: true });
}

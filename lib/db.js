import { sql } from '@vercel/postgres';
import { v4 as uuidv4 } from 'uuid';
import { uploadImage } from './cloudinary';

export async function initDB() {
  try {
    // Create posts table
    await sql`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        public_id VARCHAR(50) UNIQUE DEFAULT 'post_' || substr(md5(random()::text), 1, 10),
        text TEXT NOT NULL,
        user_id VARCHAR(50) NOT NULL,
        user_color VARCHAR(7) DEFAULT '#3b82f6',
        is_confession BOOLEAN DEFAULT FALSE,
        image_url TEXT,
        image_public_id TEXT,
        reactions JSONB DEFAULT '{
          "like": 0,
          "love": 0,
          "laugh": 0,
          "wow": 0,
          "sad": 0,
          "angry": 0
        }'::jsonb,
        replies JSONB DEFAULT '[]'::jsonb,
        view_count INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `;

    console.log('✅ Database initialized');
  } catch (error) {
    console.error('❌ Database init error:', error);
    throw error;
  }
}

export async function createPost({ text, userId, isConfession = false, imageFile = null }) {
  try {
    let imageUrl = null;
    let imagePublicId = null;

    // Upload image if provided
    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
      // Extract public ID from Cloudinary URL
      const match = imageUrl.match(/\/upload\/(?:v\d+\/)?(.+?)\.\w+$/);
      if (match) imagePublicId = match[1];
    }

    // Generate user color
    const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'];
    const userColor = colors[Math.floor(Math.random() * colors.length)];

    const result = await sql`
      INSERT INTO posts (text, user_id, user_color, is_confession, image_url, image_public_id)
      VALUES (${text}, ${userId}, ${userColor}, ${isConfession}, ${imageUrl}, ${imagePublicId})
      RETURNING *;
    `;

    return result.rows[0];
  } catch (error) {
    console.error('Create post error:', error);
    throw error;
  }
}

export async function getPosts(sort = 'recent', limit = 20) {
  try {
    let orderBy = 'created_at DESC';
    if (sort === 'hot') orderBy = 'view_count DESC, created_at DESC';
    if (sort === 'top') orderBy = '(reactions->>\'like\')::int + (reactions->>\'love\')::int DESC';

    const result = await sql`
      SELECT * FROM posts 
      ORDER BY ${sql(orderBy)} 
      LIMIT ${limit};
    `;

    return result.rows;
  } catch (error) {
    console.error('Get posts error:', error);
    throw error;
  }
}
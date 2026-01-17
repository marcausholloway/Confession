const { sql } = require('@vercel/postgres');
const { v2: cloudinary } = require('cloudinary');
require('dotenv').config();

async function setup() {
  console.log('🚀 Setting up AnonymPost...\n');

  // Check Cloudinary credentials
  console.log('🔗 Testing Cloudinary connection...');
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });

  try {
    const ping = await cloudinary.api.ping();
    console.log('✅ Cloudinary: Connected successfully');
  } catch (error) {
    console.error('❌ Cloudinary: Connection failed');
    console.error('   Please check your credentials in .env.local');
    process.exit(1);
  }

  // Setup database
  console.log('\n🗄️  Setting up database...');
  try {
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
    console.log('✅ Database: Table created');

    // Add sample data
    const samplePosts = [
      "Just discovered this amazing platform! Love the anonymity.",
      "Confession: I eat ice cream straight from the tub at 2 AM 🍦",
      "Anyone else feel overwhelmed by how fast time is moving?",
      "Today I helped a stranger and it made my whole day better!",
      "Confession: I still watch cartoons and I'm 25 years old 😅"
    ];

    for (const text of samplePosts) {
      const userId = `user_${Math.random().toString(36).substr(2, 9)}`;
      const isConfession = text.includes('Confession');
      
      await sql`
        INSERT INTO posts (text, user_id, is_confession)
        VALUES (${text}, ${userId}, ${isConfession})
        ON CONFLICT DO NOTHING;
      `;
    }
    console.log('✅ Database: Sample data added');

  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    console.log('\n💡 Tip: You might need to create a database first.');
    console.log('   For Vercel: Go to Storage → Postgres → Create');
    console.log('   For local: Install PostgreSQL and create database');
    process.exit(1);
  }

  console.log('\n🎉 Setup complete!');
  console.log('\n🚀 Next steps:');
  console.log('   1. Run: npm run dev');
  console.log('   2. Visit: http://localhost:3000');
  console.log('   3. Start posting!');
  console.log('\n📝 Deployment:');
  console.log('   - Push to GitHub');
  console.log('   - Connect to Vercel');
  console.log('   - Add environment variables in Vercel dashboard');
}

setup();
import { NextResponse } from 'next/server';
import { initDB, createPost, getPosts } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

export const dynamic = 'force-dynamic';

// Initialize database on first request
let initialized = false;

export async function GET(request) {
  try {
    if (!initialized) {
      await initDB();
      initialized = true;
    }

    const { searchParams } = new URL(request.url);
    const sort = searchParams.get('sort') || 'recent';
    const limit = parseInt(searchParams.get('limit')) || 20;

    const posts = await getPosts(sort, limit);

    return NextResponse.json({ 
      success: true, 
      data: posts 
    });
  } catch (error) {
    console.error('GET /api/posts error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    if (!initialized) {
      await initDB();
      initialized = true;
    }

    const formData = await request.formData();
    const text = formData.get('text');
    const isConfession = formData.get('isConfession') === 'true';
    const imageFile = formData.get('image');
    const userId = formData.get('userId') || `user_${uuidv4().substr(0, 8)}`;

    // Validation
    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Text is required' },
        { status: 400 }
      );
    }

    if (text.length > 2000) {
      return NextResponse.json(
        { success: false, error: 'Text too long (max 2000 characters)' },
        { status: 400 }
      );
    }

    const post = await createPost({
      text: text.trim(),
      userId,
      isConfession,
      imageFile: imageFile && imageFile.size > 0 ? imageFile : null,
    });

    return NextResponse.json({ 
      success: true, 
      data: post,
      message: 'Post created successfully'
    });
  } catch (error) {
    console.error('POST /api/posts error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
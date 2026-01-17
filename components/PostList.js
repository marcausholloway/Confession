'use client';

import { Heart, MessageCircle, Eye } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function PostList({ posts, userId }) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 mb-4">📝</div>
        <h3 className="text-xl font-semibold text-gray-300 mb-2">No posts yet</h3>
        <p className="text-gray-500">Be the first to share your thoughts!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} userId={userId} />
      ))}
    </div>
  );
}

function PostCard({ post, userId }) {
  const reactions = ['like', 'love', 'laugh', 'wow', 'sad', 'angry'];
  const totalReactions = reactions.reduce((sum, type) => sum + (post.reactions?.[type] || 0), 0);
  const timeAgo = formatDistanceToNow(new Date(post.created_at), { addSuffix: true });

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
            style={{ backgroundColor: post.user_color || '#3b82f6' }}
          >
            {post.user_id?.substring(0, 2).toUpperCase() || 'AN'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-300">Anonymous User</span>
              {post.is_confession && (
                <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">
                  Confession
                </span>
              )}
            </div>
            <div className="text-sm text-gray-500">{timeAgo}</div>
          </div>
        </div>
        
        {post.user_id === userId && (
          <span className="text-xs text-blue-400 bg-blue-400/10 px-2 py-1 rounded">
            Your Post
          </span>
        )}
      </div>

      <div className="mb-4">
        <p className="text-gray-200 whitespace-pre-wrap">{post.text}</p>
        
        {post.image_url && (
          <div className="mt-4">
            <img
              src={post.image_url}
              alt="Post attachment"
              className="max-w-full h-auto rounded-lg border border-gray-700"
              loading="lazy"
            />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {reactions.map((type) => (
              post.reactions?.[type] > 0 && (
                <span key={type} className="text-sm text-gray-400">
                  {type}: {post.reactions[type]}
                </span>
              )
            ))}
            {totalReactions > 0 && (
              <span className="text-sm text-gray-500">
                {totalReactions} reactions
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1 text-gray-500">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm">{post.replies?.length || 0} replies</span>
          </div>
          
          <div className="flex items-center gap-1 text-gray-500">
            <Eye className="w-4 h-4" />
            <span className="text-sm">{post.view_count || 0} views</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-800 rounded-lg">
            <Heart className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-lg">
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Reply input */}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          placeholder="Write a reply..."
          className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Reply
        </button>
      </div>
    </div>
  );
}
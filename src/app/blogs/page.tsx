
import React from 'react'
import { postcung } from '@/app/dataneya/posts'
import Link from 'next/link'
import prisma from '@/lib/db'

const BlogsPage = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      Author: true,
    }
  });
  //console.log(posts); // gawe test only

  return (
    <div className='max-w-2xl mx-auto py-8'>
        <h3 className="text-white text-2xl mb-4">
        Ini blog ku
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {posts.map((post) => (
                    <Link key={post.id} href={`/blogs/${post.id}`} className='bg-white p-4 rounded-md shadow-md'>
                        <h5 className='text-dark'>{post.title}</h5>
                        <p className='text-dark'>Writen by: {post.Author?.name}</p>
                    </Link>
                ))}
        </div>
    </div>
  )
}

export default BlogsPage

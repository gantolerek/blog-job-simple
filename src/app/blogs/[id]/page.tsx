
import Comments from '@/components/comment'
import FormComment from '@/components/form-comments'
import prisma from '@/lib/db';
import React, { FC } from 'react'
import DOMPurify from 'dompurify'

interface BlogDetailPageProps {
    params: {
        id: string;
    }
}

const BlogDetailPage: FC<BlogDetailPageProps> = async ({ params }) => {
    const post = await prisma.post.findFirst({
        where: {
            id: params.id
        },
        include: {
            Author: true,
        }
    });
    //console.log(post); //just for coba

    //try to sanitize
    //const sanitizedContent = post?.content ? DOMPurify.sanitize(post.content) : '';
    // const sanitizedContent = () => ({
    //     __html: DOMPurify.sanitize(post?.content)
    //   })

    return (
        <div className='max-w-2xl mx-auto py-8'>
            <h3 className="text-white font-bold text-2xl mb-4">
            {post?.title}
            </h3>
            <p className='text-white'>Writen by {post?.Author?.name}</p>
            <div className="mt-4 text-white">
                <div 
                dangerouslySetInnerHTML={{ __html: post?.content }} 
                />
            </div>

            <Comments postId={params.id} />
            <FormComment postId={params.id} />
        </div>
    )
}

export default BlogDetailPage

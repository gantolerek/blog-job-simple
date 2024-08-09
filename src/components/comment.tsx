import prisma from "@/lib/db";
import { FC } from "react";
import { format } from 'date-fns';

interface CommentsProps {
  postId: string;
}

const Comments: FC<CommentsProps> = async ({ postId }) => {
  const comments = await prisma.comment.findMany({
    where: {
      postId: postId,
    },
    include: {
      author: true,
    }
  });

  return (
    <div className="mt=8">
      <h3 className="text-2xl font-bold text-white">
      Comments
      </h3>
      <ul>
        {comments.map(comment => (
          <li key={comment.id} className="mb-4 bg-slate-300 p-2">
          <div className="flex items-center mb-2">
            <div className="text-blue-500 font-bold mr-2">
              {comment.author?.name}
            </div>
            <div className="text-gray-500">
              {format(comment.createdAt, 'MMMM dd, yyyy')}
            </div>
          </div>
          <p>{comment.text}</p>
        </li>
        ))}
      </ul>

    </div>
  )
}

export default Comments

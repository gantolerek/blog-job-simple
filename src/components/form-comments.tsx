'use client'
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FC, useState } from "react"

interface FormCommentsProps {
    postId: string;
  }

const FormComment: FC<FormCommentsProps> = ({ postId }) => {
    const [comment, setComment] = useState<string>('');
    const router = useRouter();
    const { data } = useSession();

    const handleCommentChange = (
        ev: ChangeEvent<HTMLInputElement>
    ) => {
        setComment(ev.target.value);
    };

    const handleSubmitMas = async (

    ) => {
        //console.log(comment);
        if (comment.trim() !== '') {

            try {
                const newComment = await axios.post('/api/comments', {
                    postId: postId,
                    text: comment,
                });
                if (newComment.status === 200) {
                    router.refresh();
                }

            } catch (error) {
                console.error(error)
            }
        }

        
    }

  return (
    <div>
        <div className="mt-4">
            <label htmlFor="comment" className="block text-gray-200 text-sm font-bold mb-2">
                Add comment
            </label>
            <input 
                type="text" 
                value={comment}
                onChange={handleCommentChange}
                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 mb-2" 
                name="comment"
            />
            <button 
                onClick={handleSubmitMas}
                disabled={!data?.user?.email}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mt-4 disabled:bg-gray-400"
            >
                Submit comment
            </button>
        </div>
    </div>
  )
}

export default FormComment

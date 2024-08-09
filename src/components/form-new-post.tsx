'use client'

import { ChangeEvent, FormEvent, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { FormData } from "@/types/blog";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";

const inputClass = 'w-full py-2 px-3 border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300';

const FormNewPost = () => {
    const [formData, setFormData] = useState<FormData>({
        title: '',
        content: '',
    });

    const router = useRouter();
    const { data } = useSession();
    // console.log(data?.user);

    const handleUbah = (
        ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        ev.preventDefault();

        const { name, value } = ev.target;
        setFormData({
            ...formData,
            [name]: value,
        });

    };

    const handleSubmit = async (
        ev: FormEvent<HTMLFormElement>
    ) => {
        ev.preventDefault();
        // console.log(formData);
        try {
            const response = await axios.post('/api/posts', formData);

            if (response.status === 200) {
                router.push(`/blogs/${response.data.newPost.id}`)
            }
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <div>
        <form 
            onSubmit={handleSubmit}
            className='max-w-md mx-auto p-4'
        >
            <div className="mb-4">
                
                <input 
                    type="text" 
                    className={inputClass} 
                    placeholder="Enter the title"
                    name="title"
                    value={formData.title}
                    onChange={handleUbah}
                />
            </div>
            <div className="mb-4">
                <ReactTextareaAutosize 
                    minRows={5} 
                    className={inputClass} 
                    name="content" 
                    placeholder="enter the content" 
                    value={formData.content}
                    onChange={handleUbah}
                />
            </div>
            <button 
                type="submit"
                disabled={!data?.user?.email}
                className="bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full disabled:bg-gray-400"
            >
                Submit
            </button>
        </form>
        </div>
    )
}

export default FormNewPost

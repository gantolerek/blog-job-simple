import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/sessions";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    const user = await getCurrentUser();

    try {
        if(!user?.email) {
            return NextResponse.json({
                message: 'Sorry..you are not authenticated'
            }, {
                status: 401
            })
        }

        const { postId, text } = await req.json();

        const newPostComment = await prisma.comment.create({
            data: {
                postId,
                text,
                authorEmail: user.email
            }
        })


        return NextResponse.json({
            newPostComment
        }, {
            status: 200
        })
        
    } catch (error) {
        return NextResponse.json({ 
            message: 'Ups something went wrong '
        }, {
            status: 500
        })
    }
}
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

        const { title, content } = await req.json();


        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                //id,
                authorEmail: user.email
            }
        })

        // ini just for test only
        // return NextResponse.json({
        //     user, title, content
        // })

        return NextResponse.json({
            newPost
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
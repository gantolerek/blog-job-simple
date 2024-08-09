import { getCurrentUser } from "@/lib/sessions"
import Link from "next/link"
import ButtonLogout from "./button-logout";


const Header = async () => {
    const user = await getCurrentUser();

    return (
        <header className="bg-blue-500 p-4">
            <nav className="flex justify-between items-center max-w-xl mx-auto">
                <Link href='/' className="text-white text-xl font-bold">
                Home
                </Link>
            
            
            <ul className="flex space-x-4">
            <li>
                    <Link href='/blogs' className="text-white hover:underline">
                        Blogs
                    </Link>
                </li>
                {user?.name ? (
                    <ButtonLogout />
                ) : (
                    <li>
                        <Link href='/api/auth/signin' className="text-white hover:underline">
                            Login
                        </Link>
                    </li>
                )}
            </ul>
            </nav>
        </header>
    )
}

export default Header

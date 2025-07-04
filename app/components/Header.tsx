"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
    const { data: session } = useSession();

    return (
        <header className="bg-black text-white px-6 py-4 flex justify-between items-center shadow-md">
            <Link href="/" className="text-xl font-bold text-white">
                🎬 MyVidKit
            </Link>

            <nav className="flex items-center gap-4">
                <Link href="/videos" className="hover:underline">
                    All Videos
                </Link>

                {session?.user ? (
                    <>
                        <Link href="/file-upload" className="hover:underline">
                            Upload
                        </Link>
                        <button
                            onClick={() => signOut()}
                            className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => signIn()}
                        className="bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded"
                    >
                        Login
                    </button>
                )}
            </nav>
        </header>
    );
};

export default Header;

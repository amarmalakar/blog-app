import Link from 'next/link'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies';
import cookie from 'js-cookie'
import { useRef } from 'react';

function Navbar() {
    const router = useRouter();

    const searchForm = useRef()

    const userCookie = parseCookies();
    const user = userCookie.user ? JSON.parse(userCookie.user) : '';
    
    const handleSearchBox = () => {
        if (searchForm.current.style.display === 'block') {
            searchForm.current.style.display = 'none'
        } else {
            searchForm.current.style.display = 'block'
        }
    }

    const handleSearch = () => searchForm.current.style.display = 'none';

    return (<>
        <nav className="flex items-center justify-between flex-wrap bg-green-500 px-5 py-3">
            <Link href="/"><a className="font-semibold text-xl tracking-tight text-white">Blog.IN</a></Link>

            <div className="flex items-center">
                <button className="inline-block hover:text-white mr-4" onClick={handleSearchBox}>
                    <i className="bi bi-search"></i>
                </button>

                {user ? <>
                    <Link href="/dashboard">
                        <a className="inline-block hover:text-white ml-4">
                            Dashboard
                        </a>
                    </Link>
                    <button
                        className="inline-block text-sm px-4 py-2 leading-none rounded text-white  bg-red-500 hover:text-red-500 hover:bg-white ml-4"
                        onClick={() => {
                            cookie.remove('token')
                            cookie.remove('user')
                            router.push('/')
                            window.location.reload()
                        }}
                    >
                        Logout
                    </button>
                </> : <>
                    <Link href="/login">
                        <a className="inline-block hover:text-white">
                            Login
                        </a>
                    </Link>
                    <Link href="/signup">
                        <a className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-green-500 hover:bg-white ml-4">
                            Signup
                        </a>
                    </Link>
                </>}

            </div>
        </nav>

        <div className="p-8 m-auto hidden" style={{ maxWidth: '768px' }} ref={searchForm}>
            <div className="bg-white flex items-center rounded-full shadow-xl">
                <input
                    className="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none"
                    id="search"
                    type="text"
                    placeholder="Search"
                />

                <div className="p-4">
                    <button
                        className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center"
                        onClick={handleSearch}
                    >
                        <i className="bi bi-search"></i>
                    </button>
                </div>
            </div>
        </div>
    </>)
}

export default Navbar

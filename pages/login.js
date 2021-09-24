import webUrl from '../helpers/webUrl'
import { useState } from 'react'
import cookie from 'js-cookie'
import { useRouter } from 'next/router'

const login = () => {
    const router = useRouter();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault();

        const res = await fetch(`${webUrl}/api/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    email,
                    password
                }
            )
        })

        const res_again = await res.json();

        if (res_again.error) {
            alert(res_again.error)
        } else {
            cookie.set('token', res_again.token)
            cookie.set('user', JSON.stringify(res_again.user) )
            // router.push('/');
            window.location.assign('/')
        }
    }

    return (
        <div className="w-full max-w-xs m-auto mt-24">
            <form className="bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleLogin}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="email"
                        type="text"
                        placeholder="Enter email"
                        value={email}
                        onChange={ (e) => { setEmail (e.target.value) } }
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                        id="password"
                        type="password"
                        placeholder="******************"
                        value={password}
                        onChange={ (e) => { setPassword (e.target.value) } }
                    />
                    <p className="text-red-500 text-xs italic">Please choose a password.</p>
                </div>
                <div className="flex items-center justify-between">
                    <button 
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign In
                    </button>
                    {/* <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                        Forgot Password?
                    </a> */}
                </div>
            </form>
            <p className="text-center text-gray-500 text-xs">
                &copy;2021 Blog App. All rights reserved.
            </p>
        </div>
    )
}

export default login

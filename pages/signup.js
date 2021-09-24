import Link from 'next/link'
import { useState } from 'react'
import webUrl from '../helpers/webUrl'
import { useRouter } from 'next/router'

function signup() {
    const router = useRouter();

    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${webUrl}/api/users/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        fname, lname, email, username, password
                    }
                )
            })

            const res_again = await res.json()

            if (res_again.error) {
                alert(res_again.error)
            } else {
                alert(res_again.message)
                router.push('/login');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="px-6">
            <form className="w-full max-w-lg m-auto mt-6 lg:mt-16 shadow p-6" onSubmit={handleSignUp}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                            First Name
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-first-name"
                            type="text"
                            placeholder="Jane"
                            value={fname}
                            onChange={ (e) => { setFname (e.target.value) } }
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Last Name
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            type="text"
                            placeholder="Doe"
                            value={lname}
                            onChange={ (e) => { setLname (e.target.value) } }
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="email"
                            type="email"
                            placeholder="Add Email"
                            value={email}
                            onChange={ (e) => { setEmail (e.target.value) } }
                        />
                    </div>
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="username"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={ (e) => { setUsername (e.target.value) } }
                        />
                    </div>
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                            Password
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="password"
                            type="password"
                            placeholder="******************"
                            value={password}
                            onChange={ (e) => { setPassword (e.target.value) } }
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign Up
                    </button>
                    <Link href="/login">
                        <a className="inline-block align-baseline font-bold text-sm text-green-500 hover:text-green-800">
                            Already have an account?
                        </a>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default signup

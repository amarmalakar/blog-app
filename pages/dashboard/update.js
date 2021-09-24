import { parseCookies } from "nookies"
import { useState } from "react";
import webUrl from '../../helpers/webUrl'
import { useRouter } from 'next/router'
import Link from 'next/link'

const userCookie = parseCookies();
const user = userCookie.user ? JSON.parse(userCookie.user) : '';

const update = ({ userData }) => {
    let data = userData.data;

    const [fname, setFname] = useState(data.fname)
    const [lname, setLname] = useState(data.lname)
    const [email, setEmail] = useState(data.email)
    const [username, setUsername] = useState(data.username)
    const [image, setImage] = useState('')
    const [facebook, setFacebook] = useState(data.facebook)
    const [instagram, setInstagram] = useState(data.instagram)
    const [twitter, setTwitter] = useState(data.twitter)
    const [github, setGithub] = useState(data.github)

    const prevImage = data.image

    const handleUpdate = async (e) => {
        e.preventDefault();

        const mediaUrl = await uploadImage()
        const { token } = parseCookies();

        try {
            const res = await fetch(`${webUrl}/api/users/${user.username}`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify(
                    {
                        fname, lname, email, username,
                        image: mediaUrl,
                        facebook,
                        instagram,
                        twitter,
                        github
                    }
                )
            })

            const res_again = await res.json()

            if (res_again.error) {
                alert(res_again.error)
            } else {
                alert('Your Account Is Updated')
            }
        } catch (error) {
            console.log(error);
        }
    }
    const uploadImage = async () => {
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'blog__app--images')
        data.append('cloud_name', 'mnp')
        const res = await fetch('https://api.cloudinary.com/v1_1/mnp/image/upload', {
            method: 'POST',
            body: data
        })
        const res2 = await res.json()
        // console.log(res2);
        return res2.url;
    }

    return (
        <div className="px-6">
            <form className="w-full max-w-2xl m-auto mt-6 lg:mt-16 shadow p-6" onSubmit={handleUpdate}>
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

                <div className="flex flex-wrap -mx-3">
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
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 disabled:text-red-300 cursor-not-allowed"
                            id="username"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={ (e) => { setUsername (e.target.value) } }
                            disabled
                        />
                    </div>
                </div>
                
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                            Featured Image
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {setImage(e.target.files[0])}}
                        />
                        <div className="mt-4">
                            {!image ? <>
                                {!prevImage ? '' : <img
                                    src={prevImage}
                                    style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%' }}
                                />}
                            </> : <>
                                <img
                                    className="mb-4"
                                    src={ URL.createObjectURL(image) }
                                    style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%' }}
                                />
                            </>}
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="facebook">
                                Facebook
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="facebook"
                                type="url"
                                placeholder="Add Facebook"
                                value={facebook}
                                onChange={ (e) => { setFacebook (e.target.value) } }
                            />
                        </div>
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="instagram">
                                Instagram
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="instagram"
                                type="url"
                                placeholder="Add Instagram"
                                value={instagram}
                                onChange={ (e) => { setInstagram (e.target.value) } }
                            />
                        </div>
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="twitter">
                                Twitter
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="twitter"
                                type="url"
                                placeholder="Add Twitter"
                                value={twitter}
                                onChange={ (e) => { setTwitter (e.target.value) } }
                            />
                        </div>
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="github">
                                github
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="github"
                                type="url"
                                placeholder="Add Github"
                                value={github}
                                onChange={ (e) => { setGithub (e.target.value) } }
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-6">
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    )
}

export default update

export async function getServerSideProps(ctx) {
    const cookie = parseCookies(ctx)
    const user = cookie.user ? JSON.parse(cookie.user) : '';
    
    if (!user) {
        const {res} = ctx
        res.writeHead(302, {Location: '/'})
        res.end();
    }

    const userDataApi = await fetch(`${webUrl}/api/users/${user.username}`)
    const userData = await userDataApi.json()

    return {
        props: { userData }
    }
}
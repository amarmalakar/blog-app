import { parseCookies } from "nookies"
import { useState } from "react";
import webUrl from '../../helpers/webUrl'
import { useRouter } from 'next/router'
import Head from 'next/head'

const add_new = () => {
    const router = useRouter();

    const userCookie = parseCookies()
    const user = userCookie.user ? JSON.parse(userCookie.user) : '';

    const [heading, setHeading] = useState('')
    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [description, setDescription] = useState('')
    const [post, setPost] = useState('')
    const [image, setImage] = useState('');

    const { token } = parseCookies()

    const handlePost = async (e) => {
        e.preventDefault();
        const mediaUrl = await uploadImage()

        try {
            const res = await fetch(`${webUrl}/api/admin/addPost`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(
                    {
                        heading,
                        title,
                        slug,
                        description,
                        image: mediaUrl,
                        post,
                        username: user.username
                    }
                )
            })

            const res_again = await res.json()

            if (res_again.error) {
                alert(res_again.error)
            } else {
                alert(res_again.message)
                router.push('/dashboard');
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

    return (<>
        <Head>
            <title>Add New Post | {user.username}</title>
        </Head>
        <div className="p-6 md:px-12 lg:px-24 xl:px-36 2xl:px-52">
            <h1 className="text-2xl font-semibold">Add New Post ({user.username})</h1>

            <form onSubmit={handlePost} >
                <div className="flex my-6">
                    <div className="w-1/2">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="heading">
                                Post Heading
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="text"
                                placeholder="Enter Post Heading"
                                value={heading}
                                onChange={ (e) => setHeading(e.target.value) }
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="post">
                                Post
                            </label>
                            <p className="text-red-500 text-xs italic">Write the post inside HTML element.</p>
                            <textarea
                                className="shadow appearance-none border rounded w-full h-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="post"
                                placeholder="Write Your Post...."
                                value={post}
                                onChange={ (e) => setPost(e.target.value) }
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <button
                                className="shadow w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >Post</button>
                        </div>
                    </div>
                    <div className="w-1/2 h-12 ml-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                                Post title
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="title"
                                type="text"
                                placeholder="Enter Post Title"
                                value={title}
                                onChange={ (e) => setTitle(e.target.value) }
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="slug">
                                Slug
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="slug"
                                type="text"
                                placeholder="Enter Post Slug"
                                value={slug}
                                onChange={ (e) => setSlug(e.target.value) }
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                Description
                            </label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="description"
                                placeholder="Write Your Description"
                                value={description}
                                onChange={ (e) => setDescription(e.target.value) }
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                                Featured Image
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {setImage(e.target.files[0])}}
                            />
                        </div>
                        <div className="mb-4">
                            <img
                                className="mb-4"
                                src={ (image) ? URL.createObjectURL(image) : "" }
                            />
                        </div>
                    </div>
                </div>
            </form>

        </div>
    </>)
}

export default add_new

export async function getServerSideProps (ctx) {
    const cookie = parseCookies(ctx)
    const user = cookie.user ? JSON.parse(cookie.user) : '';
    
    if (!user) {
        const {res} = ctx
        res.writeHead(302, {Location: '/'})
        res.end();
    }

    return {
        props: {}
    }
}
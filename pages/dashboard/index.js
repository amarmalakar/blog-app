import { parseCookies } from "nookies"
import webUrl from '../../helpers/webUrl'
import Link from 'next/link'
import Head from 'next/head'

const userCookie = parseCookies();
const user = userCookie.user ? JSON.parse(userCookie.user) : '';

const index = ({ userBlog }) => {
    // console.log(userBlog)
    const userBlogList = userBlog.data.map((blog) => (
        <div className="border rounded py-2 px-4 mb-2" key={blog._id}>
            <div className="sm:flex items-center">
                {!blog.image ? '' : <img src={blog.image} className="sm:w-1/3 mr-4" />}
                <div className="">
                    <h2 className="text-2xl font-semibold mb-1"> {blog.heading} </h2>
                    <p className="text-sm mb-3"> {blog.description} </p>

                    <p className="">
                        <a
                            href={`/posts/edit/${blog.username}/${blog._id}`}
                            target="_blank"
                            className="pl-1 text-green-500 hover:underline hover:text-green-700"
                        >Edit</a>
                        <a
                            href={`/${blog.username}/${blog.slug}`}
                            target="_blank"
                            className="text-green-500 ml-3 hover:underline hover:text-green-700"
                        >View</a>
                    </p>
                </div>
            </div>
        </div>
    ))

    return (<>
        <Head>
            <title>{user.username} Dashboard</title>
        </Head>
        <div className="p-6 md:px-12 lg:px-24 xl:px-36 2xl:px-52">
            <h1 className="text-2xl capitalize"> {user.fname} {user.lname} </h1>
            <Link href="/posts/add_new">
                <a className="inline-block text-sm px-6 py-3 leading-none bg-green-500 rounded text-white border-white hover:border-transparent hover:text-white hover:bg-green-700 mt-4">
                    Add New +
                </a>
            </Link>

            <a
                className="ml-4 inline-block text-sm px-6 py-3 leading-none bg-green-500 rounded text-white border-white hover:border-transparent hover:text-white hover:bg-green-700 mt-4"
                href="/dashboard/update"
                target="_blank"
            >
                Update Profile
            </a>

            <hr className="my-6" />

            <div>
                {userBlogList}
            </div>

        </div>
    </>)
}

export default index

export async function getServerSideProps(ctx) {
    const cookie = parseCookies(ctx)
    const user = cookie.user ? JSON.parse(cookie.user) : '';
    
    if (!user) {
        const {res} = ctx
        res.writeHead(302, {Location: '/'})
        res.end();
    }

    const { token } = parseCookies(ctx)
    const userBlogApi = await fetch(`${webUrl}/api/admin/${user.username}`, {
        headers: {
            'Authorization': token
        }
    });
    const userBlog = await userBlogApi.json();

    return {
        props: { userBlog }
    }
}
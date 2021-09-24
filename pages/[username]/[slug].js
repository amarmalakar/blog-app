import Head from 'next/head'
import webUrl from '../../helpers/webUrl'
import Link from 'next/link'
import ExtractDate from '../../components/ExtractDate';

const UserName = ({ postData, userPostList, writterDetails }) => {
    let getLastFourUserPost = userPostList.data.reverse().slice(0, 4);
    
    return (<>
        <Head>
            <title>{postData.data.title} | Blog App</title>
            <meta name="description" content={postData.data.description} />
        </Head>

        <div style={{ maxWidth: '768px' }} className="m-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-semibold mb-4">{postData.data.heading}</h1>
                <p className="mb-4 flex">
                    {!writterDetails.data.image ?
                        <img src={`${webUrl}/dummy_avatar.png`} style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }} />
                        :
                        <img src={writterDetails.data.image} style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }} />
                    }
                    <Link href={`/${postData.data.username}`}>
                        <a className="ml-2 text-green-500 hover:underline hover:text-green-700">{postData.data.username}</a>
                    </Link>

                    <span className="ml-4"><b>Last Update: </b> <ExtractDate date={postData.data.updatedAt} /> </span>
                </p>

                {!postData.data.image ? '' : <img src={postData.data.image} className="p-2 mb-4" /> }

                <div className="blog__section mb-8" dangerouslySetInnerHTML={{ __html: postData.data.post }}></div>


                <h3 className="text-xl font-semibold">Follow {writterDetails.data.fname} on:</h3>
                <ul className="flex space-x-4 mb-6">
                    {!writterDetails.data.facebook ? '' : <li><a href={`${writterDetails.data.facebook}`} target="_blank" className="text-lg text-green-500 hover:text-green-700"><i className="bi bi-facebook"></i></a></li>}
                    {!writterDetails.data.instagram ? '' : <li><a href={`${writterDetails.data.instagram}`} target="_blank" className="text-lg text-green-500 hover:text-green-700"><i className="bi bi-instagram"></i></a></li>}
                    {!writterDetails.data.github ? '' : <li><a href={`${writterDetails.data.github}`} target="_blank" className="text-lg text-green-500 hover:text-green-700"><i className="bi bi-github"></i></a></li>}
                    {!writterDetails.data.twitter ? '' : <li><a href={`${writterDetails.data.twitter}`} target="_blank" className="text-lg text-green-500 hover:text-green-700"><i className="bi bi-twitter"></i></a></li>}
                </ul>
            </div>

            <hr />
            
            <div className="mt-4">
                <h2 className="text-2xl font-semibold mb-4">More From {postData.data.username}</h2>
                <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                    {getLastFourUserPost.map((userPost) => (
                        <div key={userPost._id} className="max-w-sm rounded overflow-hidden shadow-lg">
                            <img src={userPost.image} className="w-full" />
                            <div className="px-2 py-4">
                                <h3 className="font-semibold">{userPost.heading}</h3>
                                <p className="text-sm mb-2">{userPost.description}</p>
                                <p className="text-sm">
                                    <Link href={`/${userPost.username}/${userPost.slug}`}>
                                        <a className="text-green-500 hover:underline hover:text-green-700">Read more &gt;&gt;</a>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>)
}

export default UserName

export async function getServerSideProps ({ query: { username, slug } }) {
    const [postRes, userPostListRes, writterDetailsRes] = await Promise.all([
        fetch(`${webUrl}/api/readers/${username}/${slug}`),
        fetch(`${webUrl}/api/readers/${username}`),
        fetch(`${webUrl}/api/users/${username}`)
    ])

    const [postData, userPostList, writterDetails] = await Promise.all([
        postRes.json(),
        userPostListRes.json(),
        writterDetailsRes.json()
    ])

    return { props: { postData, userPostList, writterDetails } }
}
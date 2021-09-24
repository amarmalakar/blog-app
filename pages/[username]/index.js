import webUrl from '../../helpers/webUrl'
import Link from 'next/link'
import Head from 'next/head'

const UserName = ({ postList, writterData }) => {
    return (<>
        <Head>
            <title>{writterData.data.username}</title>
        </Head>
        <div style={{ maxWidth: '768px' }} className="m-auto p-6">
            <div className="flex mb-4">
                {!writterData.data.image ?
                    <img src={`${webUrl}/dummy_avatar.png`} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                    :
                    <img src={writterData.data.image} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                }
                <h1 className="text-3xl font-semibold mb-4 ml-4">
                    Latest Post From {writterData.data.username}
                </h1>
            </div>

            <ul className="flex space-x-4 mb-6">
                {!writterData.data.facebook ? '' : <li><a href={`${writterData.data.facebook}`} target="_blank" className="text-xl text-green-500 hover:text-green-700"><i className="bi bi-facebook"></i></a></li>}
                {!writterData.data.instagram ? '' : <li><a href={`${writterData.data.instagram}`} target="_blank" className="text-xl text-green-500 hover:text-green-700"><i className="bi bi-instagram"></i></a></li>}
                {!writterData.data.github ? '' : <li><a href={`${writterData.data.github}`} target="_blank" className="text-xl text-green-500 hover:text-green-700"><i className="bi bi-github"></i></a></li>}
                {!writterData.data.twitter ? '' : <li><a href={`${writterData.data.twitter}`} target="_blank" className="text-xl text-green-500 hover:text-green-700"><i className="bi bi-twitter"></i></a></li>}
            </ul>

            <div>
                {postList.data.map(post => {
                    return (
                        <div className="border rounded py-2 px-4 mb-2" key={post._id}>
                            <div className="sm:flex items-center">
                                {!post.image ? '' : <img src={post.image} className="sm:w-1/3 mr-4" /> }
                                
                                <div className="">
                                    <h2 className="text-2xl font-semibold mb-2"> {post.heading} </h2>
                                    <p className="text-sm mb-3"> {post.description} </p>
                                    <p className="font-semibold">
                                        <Link href={`/${post.username}/${post.slug}`}>
                                            <a className="text-green-500 hover:underline hover:text-green-700">Read more &gt;&gt;</a>
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    </>)
}

export default UserName

export async function getServerSideProps ({ query: { username } }) {
    const res = await fetch(`${webUrl}/api/readers/${username}`);
    const data = await res.json()

    const writterApi = await fetch(`${webUrl}/api/users/${username}`);
    const writterData = await writterApi.json()
  
    return {
      props: { postList: data, writterData }
    }

    // const [postListApi, writterApi]
  }
import Head from 'next/head'
import Link from 'next/link'
import webUrl from '../helpers/webUrl'
import ExtractDate from '../components/ExtractDate'
import { useState } from 'react'
import Paganation from '../components/Paganation'

export default function Home({ postList }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(3);

  // Get Current Post
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = postList.data.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (<>
    <Head>
      <title>Blog App</title>
      <meta name="description" content="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique tempore qui maxime fugit error odit ducimus tempora nulla voluptatum magni sit quidem aliquam magnam" />
    </Head>

    <div style={{ maxWidth: '768px' }} className="m-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">Latest Post</h1>

      <div>
        {!currentPosts ? <>
          <h1>Blog App Has 0 Post</h1>
        </> : currentPosts.reverse().map(post => {
          return (
            <div className="border rounded py-2 px-4 mb-4" key={post._id}>
              <div className="sm:flex items-center">
                {!post.image ? '' : <img src={post.image} className="sm:w-1/3 mr-4" />}
                <div className="">
                  <h2 className="text-2xl font-semibold mb-1"> {post.heading} </h2>
                  <p className="mb-2">
                    Author:
                    <Link href={`/${post.username}`}>
                      <a className="pl-1 text-green-500 hover:underline hover:text-green-700">{post.username}</a>
                    </Link>

                    <span className="ml-4">
                      <ExtractDate date={post.updatedAt} />
                    </span>
                  </p>
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
      <Paganation postsPerPage={postsPerPage} totalPosts={postList.data.length} paginate={paginate} />
    </div>

  </>)
}

export async function getServerSideProps () {
  const res = await fetch(`${webUrl}/api/readers/getAllPost`);
  const data = await res.json()

  return {
    props: { postList: data }
  }
}
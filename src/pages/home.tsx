import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import useUser from '../hooks/useUser'
import Header from '../components/Header'
import PostForm from '../components/PostForm'
import Container from '../components/Container'
import { useEffect } from 'react'
import usePosts from '../hooks/usePosts'
import PostList from '../components/PostList'

const Home: NextPage = () => {
  const router = useRouter()
  const { user } = useUser()
  const {loadPosts, renderSpinner, loadMorePosts, postsItems} = usePosts()

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
    loadPosts()
  }, [user])

  return (
    <main className='bg-gray-100 min-h-screen min-w-full'>
      <Head>
        <title>CodeLeap Network</title>
        <meta name="description" content="CodeLeap Network" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Container>
        <PostForm />
        <PostList
          posts={postsItems.items}
          onEndReached={loadMorePosts}
          loaderSpinner={renderSpinner}
          onEndReachedThreshold={0.5}
        />
      </Container>
    </main>
  )
}

export default Home

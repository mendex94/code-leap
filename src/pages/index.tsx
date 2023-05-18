import type { NextPage } from 'next'
import Head from 'next/head'
import { initFirebase } from '../lib/firebase/firebase'
import { signInWithGoogle } from '../actions/login'
import { useRouter } from 'next/router'
import useUser from '../hooks/useUser'

const IndexPage: NextPage = () => {
  initFirebase()
  const {user, loading, error} = useUser()
  const router = useRouter()

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (user) {
    router.push('/home')
  }

  if (error) {
    return <h1>Error: {error.message}
    </h1>
  }

  return (
    <main className='bg-gray-100 min-h-screen min-w-full flex'>
      <Head>
        <title>CodeLeap Network</title>
        <meta name="description" content="CodeLeap Network" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="flex flex-col bg-white rounded-md mx-auto my-auto p-4 drop-shadow-md space-y-3">
        <h1 className="font-bold">
          Welcome to CodeLeap Network!
        </h1>
        <p className="text-gray-500">
          Please sign in to continue:
        </p>
        <button onClick={signInWithGoogle} className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-all duration-500">
          Sign In with Google
        </button>
      </section>
    </main>
  )
}

export default IndexPage

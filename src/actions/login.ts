import { signInWithPopup, GoogleAuthProvider, getAuth } from 'firebase/auth'
import {app} from '../lib/firebase/firebase'


export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  const auth = getAuth(app)

  try {
    const result = await signInWithPopup(auth, provider)
    console.log(result.user)
  }
  catch (error) {
    console.log(error)
  }
}

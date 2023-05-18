import {app} from '../lib/firebase/firebase'
import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'

const useUser = () => {
  const auth = getAuth(app)
  const [user, loading, error] = useAuthState(auth)

  const signOut = () => {
    auth.signOut()
  }

  return { user, loading, error, signOut }
}

export default useUser
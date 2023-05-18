import { useDispatch, useSelector } from 'react-redux'
import { getPosts, selectPosts, createPost, deletePost, editPost } from '../redux/reducers/postsSlice'
import Spinner from '../components/Spinner'
import { Post, newPost } from '../actions/posts'

const usePosts = () => {
  const dispatch = useDispatch()
  const OFFSET = 10

  
  const { postsItems, isLoading, isCreateingPost } = useSelector(selectPosts)

  
  const loadPosts = () => {
    if (postsItems.items.length === 0) {
      dispatch(getPosts(
        postsItems.offset
      ))
    }
  }

  const createNewPost = (content: newPost) => {
    dispatch(createPost(content as Post))
  }

  const handleDeletePost = (id: number) => {
    dispatch(deletePost(id))
  }

  const handleEditPost = (id: number, content: Omit<Post, 'username, id, created_datetime'>) => {
    dispatch(editPost({id, post: content}))
  }

  const loadMorePosts = () => {
    dispatch(getPosts(
      postsItems.offset + OFFSET
    ))
  }

  const renderSpinner = () => {
    return (
      isLoading ? (
        <Spinner />
      ) : null
    )
  }

  return {
    postsItems,
    loadMorePosts,
    renderSpinner,
    loadPosts,
    createNewPost,
    isCreateingPost,
    handleDeletePost,
    handleEditPost
  }
}

export default usePosts
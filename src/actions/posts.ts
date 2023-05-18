import { postsApi } from '../lib/postsApi';


export interface PostRequest {
  count:    number;
  next:     string;
  previous: null | string;
  results:  Post[];
}

export interface Post {
  id:               number;
  username:         string;
  created_datetime: string;
  title:            string;
  content:          string;
}


const getPosts = async (offset: number = 0) => {
  try {
    const response = await postsApi.get<PostRequest>(`?limit=10&offset=${offset}`)
    return response.data
  }  catch (error) {
    console.error(error)
  }
}

export interface newPost {
  username: string;
  title: string;
  content: string;
}

export type postEdit = Omit<newPost, 'username'>

const createPost = async (post: newPost) => {
  try {
    const response = await postsApi.post<newPost>('', post)
    return response.data
  } catch (error) {
    console.error(error)
  }
};

const deletePost = async (id: number) => {
  try {
    const response = await postsApi.delete<Post>(`${id}/`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const editPost = async (id: number, post: postEdit) => {
  try {
    const response = await postsApi.patch<postEdit>(`${id}/`, post)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const postsService = {
  getPosts,
  createPost,
  deletePost,
  editPost
}

export default postsService
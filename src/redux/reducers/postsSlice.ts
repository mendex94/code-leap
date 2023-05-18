import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import postsService from '../../actions/posts';
import { toast } from 'react-toastify';


export interface Post {
  username: string;
  title: string;
  content: string;
  created_datetime: string;
  id: number;
}

export interface PostsState {
  postsItems: {
    page: number;
    offset: number;
    items: Post[];
  };
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
  isCreateingPost: boolean;
  isDeletingPost: boolean;
}

const initialState: PostsState = {
  postsItems: {
    page: 0,
    offset: 0,
    items: [],
  },
  isError: false,
  isLoading: false,
  isSuccess: false,
  isCreateingPost: false,
  isDeletingPost: false,
  message: '',
};

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async (data: number, thunkAPI) => {
    try {
      const response = await postsService.getPosts(data);
      if (response) {
        return { response, query: data };
      }
    } catch (error: any) {
      const message = error.response.data.message || error.toString();
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (data: Post, thunkAPI) => {
    try {
      const response = await postsService.createPost(data);
      if (response) {
        return response;
      }
    } catch (error: any) {
      const message = error.response.data.message || error.toString();
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (data: number, thunkAPI) => {
    try {
      const response = await postsService.deletePost(data);
      if (response) {
        return data;
      }
    } catch (error: any) {
      const message = error.response.data.message || error.toString();
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

export const editPost = createAsyncThunk(
  'posts/editPost',
  async (data: { id: number; post: Omit<Post, 'username, id, created_datetime'>}, thunkAPI) => {
    try {
      const response = await postsService.editPost(data.id, data.post);
      if (response) {
        return data;
      }
    } catch (error: any) {
      const message = error.response.data.message || error.toString();
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload) {
          state.postsItems.items.push(...action.payload.response.results);
          state.postsItems.offset = action.payload.query;
          state.postsItems.page = state.postsItems.page + 1;
        }
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string || 'Error';
      })
      .addCase(createPost.pending, (state) => {
        state.isCreateingPost = true;
      }
      )
      .addCase(createPost.fulfilled, (state, action) => {
        state.isCreateingPost = false;
        state.isSuccess = true;
        state.postsItems.items.unshift(action.payload as Post);
        toast.success('Post created successfully', {
          
        });
      }
      )
      .addCase(createPost.rejected, (state, action) => {
        state.isCreateingPost = false;
        state.isError = true;
        state.message = action.payload as string || 'Error';
        toast.error(state.message);
      }
      )
      .addCase(deletePost.pending, (state) => {
        state.isDeletingPost = true;
      }
      )
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isDeletingPost = false;
        state.isSuccess = true;
        // remove the post from the list
        state.postsItems.items = state.postsItems.items.filter((post) => post.id !== action.payload);
        toast.success('Post deleted successfully', {  
        });
      }
      )
      .addCase(deletePost.rejected, (state, action) => {
        state.isDeletingPost = false;
        state.isError = true;
        state.message = action.payload as string || 'Error';
        toast.error(state.message);
      }
      )
      .addCase(editPost.pending, (state) => {
        state.isCreateingPost = true;
      }
      )
      .addCase(editPost.fulfilled, (state, action) => {
        state.isCreateingPost = false;
        state.isSuccess = true;
        state.postsItems.items = state.postsItems.items.map((post) => {
          if (post.id === action.payload?.id) {
            const newPost = {
              title: action.payload?.post.title,
              content: action.payload?.post.content,
              created_datetime: post.created_datetime,
              id: post.id,
              username: post.username,
            }
            return newPost;
          }
          return post;
        });
        toast.success('Post edited successfully', {
          
        });
      }
      )
      .addCase(editPost.rejected, (state, action) => {
        state.isCreateingPost = false;
        state.isError = true;
        state.message = action.payload as string || 'Error';
        toast.error(state.message);
      }
      )
      
  },
});

export const selectPosts = createSelector(
  (state: { posts: PostsState }) => state.posts,
  (posts) => posts
);


export default postsSlice.reducer;
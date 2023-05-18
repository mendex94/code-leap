import { useForm } from 'react-hook-form';
import useUser  from '../hooks/useUser';
import usePosts from '../hooks/usePosts';
import { Post } from '../actions/posts';

type FormData = {
  title: string;
  content: string;
  username: string | null | undefined;
}

const PostForm = () => {
  const { user } = useUser();
  const { createNewPost, isCreateingPost } = usePosts();
  const { register, handleSubmit, formState: { errors }, formState, reset } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: {
      title: '',
      content: '',
      username: user?.displayName,
    },
  });

  const onSubmit = (data: FormData) => {
    createNewPost(data as Post);
    reset();
  };

  const isDisabled = !formState.isValid || formState.isSubmitting;

  return (
    <form 
      className='rounded-md p-4 border-2 border-gray-300'
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className='font-bold'>What’s on your mind?</h1>
      <div className='space-y-2'>
      <div className='flex flex-col space-y-2'>
        <label htmlFor='title' className='font-semibold'>Title</label>
        <input
          className='border-2 border-gray-300 rounded-md p-2'
          type='text'
          id='title'
          {...register('title', { required: true })}
        />
        {errors.title && <span className='text-red-500'>This field is required</span>}
      </div>
      <div className='flex flex-col space-y-2'>
        <label htmlFor='content' className='font-semibold'>Content</label>
        <textarea
          className='border-2 border-gray-300 rounded-md p-2 resize-none'
          id='content'
          {...register('content', { required: true })}
        />
        {errors.content && <span className='text-red-500'>This field is required</span>}
      </div>
      <div className='flex justify-end'>
        <button
          className='bg-blue-400 hover:bg-blue-600 text-white font-bold px-4 rounded transition-all duration-500 disabled:bg-gray-200'
          type='submit'
          disabled={isDisabled}
        >
          {isCreateingPost ? (
            <div
            className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span
              className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
              >Loading...</span
            >
          </div>
          ) : 'Create'}
        </button>
      </div>
      </div>
    </form>
  );
};

export default PostForm;
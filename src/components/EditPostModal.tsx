import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import usePosts from '../hooks/usePosts';
import { useForm } from 'react-hook-form';
import { Post } from '../actions/posts';

interface EditPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post;
}


export default function EditPostModal({ isOpen, onClose, post }: EditPostModalProps) {
  const {handleEditPost} = usePosts()
  const cancelButtonRef = useRef(null)

  const { register, handleSubmit, formState: { errors }, formState, reset } = useForm<Omit<Post, 'username, id, created_datetime'>>({
    mode: 'onBlur',
    defaultValues: {
      title: post?.title,
      content: post?.content,
    },
  });

  const onSubmit = (data: Omit<Post, 'username, id, created_datetime'>) => {
    handleEditPost(post.id, data)
    reset()
    onClose()
  };

  const isDisabled = !formState.isValid || formState.isSubmitting;




  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-10 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left drop-shadow-sm transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Edit Item
                      </Dialog.Title>
                      <div className="mt-2">
                      <form 
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='space-y-2 w-full'>
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
      <div className='flex justify-end gap-4'>
        <button className='bg-white hover:bg-red-500 hover:text-white border-2 text-black font-bold px-4 rounded transition-all duration-500 disabled:bg-gray-200'>
          Cancel
        </button>
        <button
          className='bg-blue-400 hover:bg-blue-600 text-white font-bold px-4 rounded transition-all duration-500 disabled:bg-gray-200'
          type='submit'
          disabled={isDisabled}
        >
          Save
        </button>
      </div>
      </div>
    </form>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
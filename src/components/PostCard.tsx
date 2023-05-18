import { Post } from '../actions/posts';
import {RxTrash, RxPencil2} from 'react-icons/rx';
import formatDate from '../utils/formatDate';
import useUser from '../hooks/useUser';
import DeletePostModal from './DeletePostModal';
import { useState } from 'react';
import EditPostModal from './EditPostModal';

interface PostCardProps {
    post?: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const { user } = useUser()

  const handleDelePostModal = () => {
    setIsDeleteModalOpen(prev => !prev)
  }

  const handleEditPostModal = () => {
    setIsEditModalOpen(prev => !prev)
  }

  return (
    <>
      <div className="rounded-md drop-shadow-md">
      <div className='bg-blue-400 rounded-t-md p-4 flex items-center justify-between'>
        <h2 className="text-white font-semibold text-lg whitespace-pre-wrap truncate">
          {post?.title}
        </h2>
        {
          user?.displayName === post?.username && (
            <div className='flex gap-4'>
              <button onClick={handleDelePostModal}>
                <RxTrash className="text-white text-lg" />
              </button>
              <button onClick={handleEditPostModal}>
                <RxPencil2 className="text-white text-lg" />
              </button>
            </div>
          )
        }
      </div>
      <div className='border-r-2 border-l-2 border-b-2 rounded-b-md'>
      <div className='p-4 flex justify-between'>
        <p className='text-gray-400 text-sm font-semibold truncate'>
          @{post?.username}
        </p>
        <p className='text-gray-400 text-sm'>
          {formatDate(post?.created_datetime as string)}
        </p>
      </div>
      <div className='p-4'>
        <p className='text-black text-md break-all'>
          {post?.content}
        </p>
      </div>
      </div>
    </div>
      <DeletePostModal 
        isOpen={isDeleteModalOpen}
        onClose={handleDelePostModal}
        postId={post?.id as number}
      />
      <EditPostModal
        isOpen={isEditModalOpen}
        onClose={handleEditPostModal}
        post={post as Post}
      />
    </>
  )
}

export default PostCard
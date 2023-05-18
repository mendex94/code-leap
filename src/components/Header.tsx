import useUser from '../hooks/useUser';

const Header = () => {
  const { user, signOut } = useUser();

  return (
    <div className='bg-blue-400 flex-col text-white container mx-auto p-8 flex justify-between drop-shadow-lg md:flex-row md:items-center'>
      <div>
        <h1 className='font-bold text-2xl'>CodeLeap Network</h1>
      </div>
      <div className='flex flex-col'>
        <p>Welcome, {user?.displayName}!</p>
        <button 
          className='max-w-min whitespace-nowrap hover:underline place-self-end'
          onClick={signOut}
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Header;
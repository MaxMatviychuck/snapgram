import { Link } from 'react-router-dom'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UserCard = ({ creator }: any) => {
    console.log(creator)
    return (
        <>
            <Link
                className='flex flex-center flex-col gap-7 p-5 max-w-[280px] w-[280px] h-[280px] rounded-[20px] border border-[#1F1F22] break-all'
                to={`profile/${creator.$id}`}
            >
                <img
                    src={creator.imageUrl}
                    className='rounded-full'
                    alt=""
                    width={90}
                    height={90}
                />
                <div className="flex flex-center flex-col gap-1">
                    <p className='text-2xl'>{creator.name}</p>
                    <p className='text-lg text-light-3'>{`@${creator.username}`}</p>
                </div>

            </Link>
        </>
    )
}

export default UserCard
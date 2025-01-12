import { Link } from 'react-router-dom'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TopCreatorCard = ({ creator }: any) => {
    return (
        <>
            <Link
                className='flex flex-center flex-col gap-4 p-5 max-w-[190px] w-[190px] rounded-[20px] border border-[#1F1F22] break-all'
                to={`profile/${creator.$id}`}
            >
                <img
                    src={creator.imageUrl}
                    className='rounded-full'
                    alt=""
                    width={64}
                    height={64}
                />
                <p>{creator.name}</p>
            </Link>
        </>
    )
}

export default TopCreatorCard
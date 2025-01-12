import { Link } from 'react-router-dom'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TopCreatorCard = ({ creator }: any) => {
    return (
        <div className="flex flex-center flex-col gap-4 p-5 max-w-[190px] w-[190px] rounded-[20px] border border-[#1F1F22] break-all">
            <img
                src={creator.imageUrl}
                className='rounded-full'
                alt=""
                width={64}
                height={64}
            />
            <p className=''>{creator.name}</p>
            <Link
                className='shad-button_primary whitespace-nowrap pt-1 pb-1 pr-4 pl-4 rounded-[5px]'
                to={`profile/${creator.$id}`}
            >
                Profile
            </Link>
        </div>
    )
}

export default TopCreatorCard
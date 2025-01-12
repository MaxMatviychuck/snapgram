import { useGetUsers } from '@/lib/react-query/queriesAndMutations'

import Loader from './Loader';
import TopCreatorCard from './TopCreatorCard';

const RightSidebar = () => {
    const { data: users, isFetching } = useGetUsers();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const topCreators = users && users.documents.filter((creator: any) => creator.posts.length > 3);

    return (
        <div className='rightsidebar'>
            <div>
                <h2 className="h3-bold md:h2-bold pt-5 sm:pt-0">Top Creators</h2>
                <div className='flex flex-start gap-5 mt-5 flex-wrap'>
                    {isFetching ? <Loader /> :
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        topCreators && topCreators.map((creator: any) => (
                            <TopCreatorCard key={creator.$id} creator={creator} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default RightSidebar
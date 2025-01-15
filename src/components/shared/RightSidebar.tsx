import { useLocation } from "react-router-dom"


import { useGetUsers } from '@/lib/react-query/queriesAndMutations'
import UserTopPosts from '@/components/shared/UserTopPosts'

import Loader from './Loader';
import TopCreatorCard from './TopCreatorCard';

const RightSidebar = () => {
    const { pathname } = useLocation();
    const isProfile = pathname.includes('/profile');


    const { data: users, isFetching } = useGetUsers();

    const topCreators = users?.documents;
    return (
        <div className='rightsidebar'>
            {isProfile ?
                <UserTopPosts />
                :
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
            }
        </div>
    )
}

export default RightSidebar
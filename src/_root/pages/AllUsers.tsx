import { useGetUsers } from '@/lib/react-query/queriesAndMutations'

import Loader from "@/components/shared/Loader"
import UserCard from '@/components/shared/UserCard';

const AllUsers = () => {
  const { data: users, isFetching } = useGetUsers();


  return (
    <div className="people-container">
      <div className="people-posts" >
        <div className="flex gap-3">
          <img src='/assets/icons/people.svg'
            alt=""
            width={24}
            height={24}
          />
          <h2 className="h3-bold md:h2-bold pt-5 sm:pt-0">All Users</h2>
        </div>


        <div className='test flex flex-start gap-9 mt-5 flex-wrap'>
          {isFetching ? <Loader /> :
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            users && users.documents.map((creator: any) => (
              <UserCard key={creator.$id} creator={creator} />
            ))
          }
        </div>

      </div>
    </div>
  )
}

export default AllUsers
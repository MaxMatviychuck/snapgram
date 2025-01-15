import { useGetSavedPosts } from '@/lib/react-query/queriesAndMutations'
import Loader from "@/components/shared/Loader"
import { useUserContext } from "@/context/AuthContext";
import GridPostList from '@/components/shared/GridPostList'

const Saved = () => {
  const { user } = useUserContext();

  const { data: savedPosts, isPending } = useGetSavedPosts(user?.id);

  if (isPending) return <Loader />

  return (
    <div className="people-container">
      <div className="people-posts" >
        <div className="flex gap-3">
          <img src='/assets/icons/people.svg'
            alt=""
            width={24}
            height={24}
          />
          <h2 className="h3-bold md:h2-bold pt-5 sm:pt-0">Saved Posts</h2>
        </div>

        <>
          {savedPosts && savedPosts.documents ? (
            <GridPostList posts={savedPosts.documents} />
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full">
              <img src="/assets/icons/empty.svg" alt="No saved posts" className="w-20 h-20" />
              <h2 className="text-lg font-semibold text-gray-500">No saved posts</h2>
            </div>
          )}

        </>
      </div>
    </div>
  )
}

export default Saved
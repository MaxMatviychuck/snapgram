import { useUserContext } from "@/context/AuthContext";
import GridPostList from '@/components/shared/GridPostList'
import { useGetPostsByUserId } from '@/lib/react-query/queriesAndMutations'
import Loader from "@/components/shared/Loader"

const UserTopPosts = () => {
    const { user, isLoading } = useUserContext();

    const { data: posts, isPending: isPostsLoading } = useGetPostsByUserId(user.id);

    return (
        <div>
            <div className='flex flex-col flex-center gap-7'>
                <img src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
                    alt=""
                    className="h-[100px] w-[100px] rounded-full"
                />
                {isLoading ? <Loader /> : <div className='flex flex-col flex-center'>
                    <p className="text-2xl font-semibold">
                        {user.name}
                    </p>
                    <p className="text-lg text-light-3">
                        @{user.username}
                    </p>
                </div>}
            </div>

            <div>
                <h3 className='h3-bold md:h3-bold pt-7 pb-7 sm:pt-12'>Top Posts By You</h3>
                <div className="max-h-[70vh] overflow-y-auto">
                    {isPostsLoading ? <Loader /> : posts && <GridPostList posts={posts?.documents} />}
                </div>
            </div>

        </div>
    )
}

export default UserTopPosts
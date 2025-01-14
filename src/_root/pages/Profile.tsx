import { useGetSavedPosts } from '@/lib/react-query/queriesAndMutations'
import Loader from "@/components/shared/Loader"
import { useUserContext } from "@/context/AuthContext";
import ProfileForm from '@/components/forms/ProfileForm';

const Profile = () => {
  const { user } = useUserContext();

  const { data: savedPosts, isPending } = useGetSavedPosts(user?.id);

  console.log("savedPosts", savedPosts);

  if (isPending) return <Loader />

  return (
    <div className="people-container">
      <div className="people-posts" >
        <div className="flex gap-3">
          <img src='/assets/icons/edit.svg'
            alt=""
            width={24}
            height={24}
          />
          <h2 className="h3-bold md:h2-bold pt-5 sm:pt-0">Edit Profile</h2>
        </div>
        <ProfileForm />
      </div>
    </div>
  )
}

export default Profile
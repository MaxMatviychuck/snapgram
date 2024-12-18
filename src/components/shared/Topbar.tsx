import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react";

import { Button } from "../ui/button"
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

const Topbar = () => {
    const navigate = useNavigate();
    const { mutate: signOut, isSuccess } = useSignOutAccount();
    const { user } = useUserContext();

    useEffect(() => {
        if (isSuccess) {
            navigate(0)
        }
    }, [isSuccess, navigate])

    const logOut = () => {
        signOut();
    }

    return (
        <section className='topbar'>
            <div className="flex-between py-4 px-5">
                <Link to='/' className='flex gap-3 items-center'>
                    <img
                        src="/assets/images/logo.svg"
                        alt=""
                        width={130}
                        height={325}
                    />
                </Link>

                <div className="flex gap-4">
                    <Button
                        variant='ghost'
                        className="shad-button_ghost"
                        onClick={logOut}
                    >
                        <img src="/assets/icons/logout.svg" alt="" />
                    </Button>
                    <Link
                        to={`/profile/${user.id}`}
                        className="flex-center gap-3"
                    >
                        <img src={
                            user.imageUrl ||
                            '/assets/images/profile-placeholder.svg'}
                            alt=""
                            className="h-8 w-8 rounded-full"
                        />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Topbar
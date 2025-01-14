import { Link, NavLink, useNavigate, useLocation } from "react-router-dom"
import { useEffect } from "react";

import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

import { Button } from "../ui/button"
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";


const LeftSidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
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

  const isUserProfileLinkActive = pathname.includes(`/profile/${user.id}`);

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to='/' className='flex gap-3 items-center'>
          <img
            src="/assets/images/logo.svg"
            alt=""
            width={170}
            height={36}
          />
        </Link>

        <Link
          to={`/profile/${user.id}`}
          className={'flex gap-3 items-center relative'}
        >
          {isUserProfileLinkActive && <div
            className="absolute bg-[#877EFF] left-[-70px] w-[56px] h-[56px] rounded-full"
          />
          }
          <img src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt=""
            className="h-14 w-14 rounded-full"

          />
          <div className="flex flex-col">
            <p className="body-bold">
              {user.name}
            </p>
            <p className="small-regular text-light-3">
              @{user.username}
            </p>
          </div>
        </Link>

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route

            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${isActive && 'bg-primary-500'}`}
              >
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4"
                >
                  <img
                    src={link.imgURL}
                    alt=""
                    className={`group-hover:invert-white ${isActive && 'invert-white'}`}
                  />
                  <p className="body-regular">{link.label}</p>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>

      <Button
        variant='ghost'
        className="shad-button_ghost"
        onClick={logOut}
      >
        <img src="/assets/icons/logout.svg" alt="" />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav>
  )
}

export default LeftSidebar
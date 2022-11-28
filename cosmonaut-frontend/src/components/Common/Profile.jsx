import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import Account3 from "../../assets/images/signed-in-account3.svg";
import { useIsLogout } from "../../core/api/useIsLogout";
import { LoginState } from "../../core/state/loginState";

const Profile = ({ name }) => {
  // eslint-disable-next-line no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
  const [isHovering, setIsHovering] = useState(false);
  const logoutFetch = useIsLogout();

  const handleLogOut = (e) => {
    e.preventDefault();
    setIsLoggedIn(false);
    logoutFetch();
  };

  return (
    <div
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
      class="items-center relative inline-block text-left"
    >
      <button class="mr-6 focus:outline-none rounded-sm ml-2 flex items-center ease-in-out duration-300 focus:ring-2 focus:ring-orange-400  transform hover:scale-110">
        <img
          class="w-8 h-8 block rounded-full border-3 border-indigo-900 shadow-sm object-cover ml-1 "
          src={Account3}
          alt=""
        />
        <span class="text-sm font-semibold ml-2 mr-4">{name}</span>
      </button>
      {isHovering ? (
        <div class="origin-top-right absolute right-0 mt-1 w-32 rounded-md bg-white ring-1 border-4 border-black shadow-md ring-black ring-opacity-5 focus:outline-none text-center">
          <div class="py-1 px-1">
            <Link to="/profile">
              <div class="text-gray-700 bg-white text-center font-heading rounded-sm block px-4 py-2 text-sm hover:bg-yellow-500">
                mypage
              </div>
            </Link>
            <button onClick={handleLogOut}>
              <div class="text-gray-700 bg-white text-center font-heading rounded-sm block px-4 py-2 text-sm hover:bg-orange-500">
                sign out
              </div>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;

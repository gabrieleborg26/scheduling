import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  let path = router.pathname;

  return (
    <div className="min-h-screen w-60 fixed top-5">
      {user && (
        <div>
          <p
            className="text-md font-bold text-gray-700"
            onClick={() => {
              logout();
            }}
          >{`${user.email} `}</p>
        </div>
      )}

      <div className="my-5 text-sm ">
        <div className="text-gray-700 font-bold flex gap-3 ">
          <div className="w-6 h-6 bg-gradient-to-tl from-purple-700 to-pink-500 rounded-lg shadow-xl shadow-purple-500/60"></div>
          Admin
        </div>

        <div className=" p-3 text-sm ">
          <ul className=" flex-col flex gap-3 px-5">
            <Link href={`/game-presenters/all`}>
              <li
                className={`${
                  path == "/game-presenters/all" ? "font-medium text-gray-800" : ""
                } hover:text-gray-900`}
              >
                Game Presenters
              </li>
            </Link>
            <Link href={`/tables/all`}>
              <li
                className={`${
                  path == "/tables/all" ? "font-medium text-gray-800" : ""
                } hover:text-gray-700`}
              >
                Tables
              </li>
            </Link>
            <Link href={`/schedule`}>
              <li
                className={`${
                  path == "/schedule" ? "font-medium text-gray-800" : ""
                } hover:text-gray-700`}
              >
                Schedule
              </li>
            </Link>
          </ul>
        </div>
      </div>
      {/* <div className="flex justify-center mt-20">
        <button
          onClick={() => {
            logout();
          }}
          className="btn btn-sm capitalize px-4"
        >
          Sign Out
        </button>
      </div> */}
    </div>
  );
};

export default Navbar;

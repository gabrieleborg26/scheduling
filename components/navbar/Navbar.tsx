import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { navLinks } from "./fixedList";

const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  let path = router.pathname;

  return (
    <div className="min-h-screen w-fit fixed top-5 pr-5 pl-3 border-r-2 border-white">
      {user && (
        <div>
          <p className="text-md font-bold text-gray-700">{`${user.email} `}</p>
        </div>
      )}

      <div className="my-5 text-sm ">
        {navLinks.map((nav: any) => {
          return (
            <div key={`nav-${nav.businessLine}`} className="mb-5">
              <div className="text-gray-700 font-bold flex gap-3 ">
                <div className="w-6 h-6 bg-gradient-to-tl from-purple-700 to-pink-500 rounded-lg shadow-xl shadow-purple-500/60"></div>
                {nav.businessLine}
              </div>

              <div className=" p-3 text-sm ">
                <ul className=" flex-col flex gap-3 px-5">
                  {nav.links.map((link: any) => {
                    return (
                      <Link href={link.href}  key={`nav-link-${link.title}`}>
                        <li
                          className={`${
                            path == link.href
                              ? "font-medium text-purple-800"
                              : ""
                          } hover:text-gray-900`}
                        >
                          {link.title}
                        </li>
                      </Link>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}

       
      </div>
      <div className="flex justify-center mt-20 pr-10">
        <button
          onClick={() => {
            logout();
          }}
          className="btn btn-sm w-full text-xs btn-ghost border-[`px] border-black capitalize pl-6"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Navbar;

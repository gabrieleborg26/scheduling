import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./navbar/Navbar";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    } 
    if("code" in user) {
      router.push("/login");
      
    }
  }, [router, user]);

  return (
    <div className="min-h-screen w-full ">
      {!loading && <div className="min-h-screen bg-gray-50">
        <div className="flex p-5 text-gray-500 relative">
          <div className="w-64 relative">
            <Navbar />
          </div>
          <span className="pr-5 w-11/12">
            <p className="text-xs text-gray-500">{router.pathname}</p>
            <div className="">{children}</div>
          </span>
          <ToastContainer />
        </div>
      </div>}
    </div>
  );
};

export default ProtectedRoute;
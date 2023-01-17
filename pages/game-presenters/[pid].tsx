import Link from "next/link";
import type { NextPage } from "next";
import Head from "next/head";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import moment from "moment";
import Details from "../../components/presenters/details";
import { useAuth } from "../../context/AuthContext";

const Presenter: NextPage = () => {
  const { user, token } = useAuth();
  const router = useRouter();
  const { pid } = router.query;

  const [presenter, setPresenter] = useState<any>();
  const [createdAtDays, setCreatedAtDays] = useState(0);
  const [status, setStatus] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  const [deleteOption, setDeleteOption] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      if (pid) {
        getPresenter();
      }
    }
  }, [pid, user]);

  const getPresenter = async () => {
    fetch(`/api/presenters/${pid}`, {
      headers: new Headers({
        Authorization: "Bearer " + token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPresenter(data);
        setStatus(data.status);
        let createdAt = moment(data.createdAt);
        let diff = moment().diff(createdAt, "days");
        setCreatedAtDays(diff);
        setIsLoading(false);
      })
      .catch((e) => toast.error(e.message));
  };

  const handleEditPresenter = async (payload: any) => {
    await fetch(`/api/presenters/${pid}`, {
      method: "PATCH",
      headers: new Headers({
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(payload),
    })
      .then((res) => {
        toast.success("Saved");
        return true;
      })
      .catch((e) => {
        console.log(`Error: ${e.message}`);
      });
  };

  const handleDeletePresenter = async () => {
    await fetch(`api/presenters/${pid}`, {
      method: "DELETE",
      headers: new Headers({
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      }),
    })
      .then((res) => {
        toast.error("Presenter Deleted");
        setTimeout(() => {
          router.push("/game-presenters/all");
        }, 1000);
        return true;
      })
      .catch((e) => {
        console.log(`Error: ${e.message}`);
      });
  };

  return (
    <div>
      <Head>
        <title>Presenter</title>
      </Head>

      {!isLoading && (
        <div>
          <h1 className="text-4xl font-bold mt-5 text-gray-700">{`${presenter.name} `}</h1>
          <div className="divider mt-4"></div>
          <div className="flex gap-10 ">
            <div className="w-8/12">
              <div className=" group flex gap-10 bg-white shadow-soft w-fit py-2 px-5 rounded-xl mb-5">
                <div className="flex gap-2 items-center text-sm text-gray-700 font-bold">
                  <input
                    type="checkbox"
                    className={`toggle toggle-xs border-8 border-red-400 checked:toggle-success unchecked:toggle-error 
                 w-1 h-1 group-hover:w-6 group-hover:h-4 group-hover:border-2 group-hover:border-gray-300 group-hover:checked:border-green-400 transition-all duration-500`}
                    checked={status == "active"}
                    onChange={(event) => {
                      handleEditPresenter({
                        status: event.target.checked ? "Active" : "Inactive",
                      });
                      setStatus(event.target.checked ? "active" : "inactive");
                    }}
                  />
                  {status == "active" ? "Active" : "Inactive"}
                </div>

                <p className="text-xs">
                  <span className="font-bold mr-2 text-sm">
                    {createdAtDays}
                  </span>
                  days
                </p>
              </div>

              <Details
                authPresenter={user}
                presenter={presenter}
                handleEditPresenter={handleEditPresenter}
              />

              {!deleteOption && (
                <button
                  onClick={() => {
                    setDeleteOption(true);
                  }}
                  className="mb-10 px-5 py-1 mt-8 btn btn-sm border-red-400 bg-gray-50 text-red-400 hover:bg-red-400 hover:text-white hover:border-red-400"
                >
                  DELETE
                </button>
              )}

              {deleteOption && (
                <div className="mt-8">
                  <p>Are you sure you want to permanently delete this presenter?</p>
                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={() => {
                        setDeleteOption(false);
                      }}
                      className="px-5 py-1 btn btn-sm border-red-400 bg-red-400 text-white hover:bg-red-500 hover:text-white hover:border-red-400"
                    >
                      No
                    </button>
                    <button
                      onClick={() => {
                        handleDeletePresenter();
                      }}
                      className="px-5 py-1 btn btn-sm border-red-400 bg-gray-50 text-red-400 hover:bg-red-400 hover:text-white hover:border-red-400"
                    >
                      Yes
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="w-4/12"></div>
          </div>
        </div>
      )}
      {isLoading && <progress className="progress w-56 h-[3px]"></progress>}
    </div>
  );
};

export default Presenter;

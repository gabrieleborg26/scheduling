import Link from "next/link";
import type { NextPage } from "next";
import Head from "next/head";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import moment from "moment";
import Details from "../../components/tables/details";
import { useAuth } from "../../context/AuthContext";

const Table: NextPage = () => {
  const { user, token } = useAuth();
  const router = useRouter();
  const { tid } = router.query;

  const [table, setTable] = useState<any>();
  const [createdAtDays, setCreatedAtDays] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [deleteOption, setDeleteOption] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      if (tid) {
        getTable();
      }
    }
  }, [tid, user]);

  const getTable = async () => {
    fetch(`/api/tables/${tid}`, {
      headers: new Headers({
        Authorization: "Bearer " + token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTable(data);
        let createdAt = moment(data.createdAt);
        let diff = moment().diff(createdAt, "days");
        setCreatedAtDays(diff);
        setIsLoading(false);
      })
      .catch((e) => toast.error(e.message));
  };

  const handleEditTable = async (payload: any) => {
    await fetch(`/api/tables/${tid}`, {
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

  const handleDeleteTable = async () => {
    await fetch(`api/tables/${tid}`, {
      method: "DELETE",
      headers: new Headers({
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      }),
    })
      .then((res) => {
        toast.error("Table Deleted");
        setTimeout(() => {
          router.push("/tables/all");
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
        <title>Table</title>
      </Head>

      {!isLoading && (
        <div>
          <h1 className="text-4xl font-bold mt-5 text-gray-700">{`${table.name} `}</h1>
          <div className="divider mt-4"></div>
          <div className="flex gap-10 ">
            <div className="w-8/12">
              <div className=" group flex gap-10 bg-white shadow-soft w-fit py-2 px-5 rounded-xl mb-5">

                <p className="text-xs">
                  <span className="font-bold mr-2 text-sm">
                    {createdAtDays}
                  </span>
                  days ago
                </p>
              </div>

              <Details
                authTable={user}
                table={table}
                handleEditTable={handleEditTable}
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
                  <p>Are you sure you want to permanently delete this table?</p>
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
                        handleDeleteTable();
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

export default Table;

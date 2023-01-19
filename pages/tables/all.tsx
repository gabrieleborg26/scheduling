import Head from "next/head";
import Link from "next/link";
import type { NextPage } from "next";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getSearchClient } from "../../clients/algolia";
import TableCard from "../../components/tables/tableCard";
import CreateTable from "../../components/tables/createTable";
import TableLayout from "../../components/tables/tableLayout";

const searchClient = getSearchClient();
const tablesIndex = searchClient.initIndex("tables");

const Tables: NextPage = () => {
  const { user, token } = useAuth();
  const router = useRouter();

  const [tables, setTables] = useState([]);
  const [tablesStatus, setTablesStatus] = useState("List View");
  const [tablesTotal, setTablesTotal] = useState(0);
  const [tablesHits, setTablesHits] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const perPage = 10;

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      setTimeout(() => {
        getTables();
      }, 1000);
    }
  }, [page, user, tablesStatus]);

  const getTables = async () => {
    fetch(
      `/api/tables/tables?status=${tablesStatus}&$skip=${
        page * perPage
      }&$limit=${perPage}&$sort[createdAt]=-1`,
      {
        headers: new Headers({
          Authorization: "Bearer " + token,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setTables(data);
        setTablesTotal(data.length);
      })
      .catch((e) => {
        console.log(e);
      });
    setIsLoading(false);
  };

  const handleCreateTable = (payload: any) => {
    fetch(`/api/tables/tables`, {
      method: "POST",
      headers: new Headers({
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data: any) => {
        getTables();
        return true;
      })
      .catch((e) => {
        console.log(`Error: ${e.message}`);
      });
  };

  const Hits = () => {
    return (
      <ul
        tabIndex={0}
        className="dropdown-content menu menu-compact p-2 shadow-soft bg-base-100 rounded-xl w-full mt-2"
      >
        {tablesHits.map((item: any) => {
          return (
            <li key={`hits-${item.name}`}>
              <Link href={`/tables/${item.id}`} className="hover:bg-gray-100">
                {`${item.name} `}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  };

  const handleTablesHits = (query: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        tablesIndex.search(query, { hitsPerPage: 5 }).then(({ hits }: any) => {
          setTablesHits(hits);
          resolve(true);
        });
      } catch (e) {
        reject([]);
      }
    });
  };

  return (
    <div className="">
      <Head>
        <title>Tables</title>
      </Head>

      {/* All tables */}
      <div className="flex items-end justify-between">
        <h1 className="text-4xl font-bold mt-5 text-gray-700">Tables</h1>

        {/* Search Bar */}
        <label
          data-tip="Tip: Search for Clementine or by username / email / phone - `024-648-3804`"
          htmlFor="table-modal"
          className="tooltip w-4/12 dropdown border-[1px] border-gray-300 rounded-lg mr-56"
        >
          <input
            tabIndex={0}
            id="algolia-search"
            placeholder="Search Tables..."
            className="input input-sm px-5 w-full py-3 bg-transparent border-none"
            onChange={(event) => {
              handleTablesHits(event?.target.value);
            }}
          />
          <Hits />
        </label>

        <input type="checkbox" id="table-modal" className="modal-toggle" />
        <label htmlFor="create-table-modal" className="btn btn-xs btn-circle">
          +
        </label>
      </div>

      <div className="flex justify-between mt-5 items-end">
        {/* tabs */}
        <div className="tabs  gap-1 mt-5">
          {["List View", "Floor View"].map((item: any) => {
            return (
              <a
                key={`tab-${item}`}
                className={`tab tab-sm tab-bordered border-b-[1px] gap-2 capitalize ${
                  tablesStatus == item ? "tab-active" : ""
                }`}
                onClick={() => {
                  setPage(0);
                  setIsLoading(true);

                  setTablesStatus(item);
                }}
              >
                {item}
                {item == "inactive" && (
                  <span className="w-[5px] h-[5px] bg-red-400 rounded-full shadow-[0_5px_10px_rgba(200,0,0,0.9)] -mt-1"></span>
                )}
                {item == "active" && (
                  <span className="w-[5px] h-[5px] bg-green-500 rounded-full shadow-[0_5px_10px_rgba(0,200,0,0.9)] -mt-1"></span>
                )}
              </a>
            );
          })}
        </div>
        <span>
          <div className="text-gray-500 text-xs">
            ( Total: {tables.length} )
          </div>
        </span>
      </div>

      {/* tables List */}
      <div className="mt-7 text-gray-500 ">
        {!isLoading && (
          <div className="min-h-[70vh] flex flex-col justify-between">
            {tables.length == 0 && <div>No tables yet</div>}

            <div className="grid grid-cols-4 flex-wrap gap-4 gap-y-4">
              {tables.map((item, index) => {
                return (
                  <div key={`table-${index}`}>
                    {tablesStatus == "List View" && <TableCard table={item} />}

                    {tablesStatus == "Floor View" && (
                      <TableLayout table={item} />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center">
              <div className="mt-5 w-fit btn-group gap-3 bg-gradient-to-tl from-purple-700 to-pink-500 rounded-lg shadow-lg shadow-purple-300">
                <button
                  disabled={page == 0}
                  className="btn btn-sm btn-ghost text-white font-light"
                  onClick={() => {
                    setPage(page - 1);
                  }}
                >
                  ←
                </button>
                <div className="px-3 pt-1 text-sm text-white capitalize font-light">
                  Page {page + 1}
                </div>
                <button
                  disabled={!(tablesTotal / 10 > 1)}
                  className="lowercase tooltip btn btn-sm btn-ghost text-white font-light"
                  onClick={() => {
                    setPage(page + 1);
                  }}
                  data-tip="pagination not working due to no backend, but coded in place"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        )}
        {isLoading && <progress className="progress h-[3px] w-56"></progress>}
      </div>

      {/* Create Table Modal */}
      <CreateTable handleCreateTable={handleCreateTable} />
    </div>
  );
};

export default Tables;

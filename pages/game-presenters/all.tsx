import Head from "next/head";
import Link from "next/link";
import type { NextPage } from "next";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getSearchClient } from "../../clients/algolia";
import PresenterCard from "../../components/presenters/presenterCard";
import CreatePresenter from "../../components/presenters/createPresenter";

const searchClient = getSearchClient();
const presentersIndex = searchClient.initIndex("presenters");

const Presenters: NextPage = () => {
  const { user, token } = useAuth();
  const router = useRouter();

  const [presenters, setPresenters] = useState([]);
  const [presentersStatus, setPresentersStatus] = useState("active");
  const [presentersTotal, setPresentersTotal] = useState(0);
  const [presentersHits, setPresentersHits] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const perPage = 28;

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      getPresenters();
    }
  }, [page, user, presentersStatus]);

  const getPresenters = async () => {
    fetch(`/api/presenters/presenters?status=${presentersStatus}`, {
      headers: new Headers({
        Authorization: "Bearer " + token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPresenters(data);
        setPresentersTotal(data.length);
      })
      .catch((e) => {
        console.log(e);
      });
    setIsLoading(false);
  };

  const handleCreatePresenter = (payload: any) => {
    fetch(`/api/presenters/presenters`, {
      method: "POST",
      headers: new Headers({
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data: any) => {
        getPresenters();
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
        {presentersHits.map((item: any) => {
          return (
            <li key={`hits-${item.name}`}>
              <Link
                href={`/game-presenters/${item.id}`}
                className="hover:bg-gray-100"
              >
                {`${item.name} `}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  };

  const handlePresentersHits = (query: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        presentersIndex
          .search(query, { hitsPerPage: 5 })
          .then(({ hits }: any) => {
            setPresentersHits(hits);
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
        <title>Presenters</title>
      </Head>

      {/* All presenters */}
      <div className="flex items-end justify-between">
        <h1 className="text-4xl font-bold mt-5 text-gray-700">Presenters</h1>

        {/* Search Bar */}
        <label
          htmlFor="presenter-modal"
          className="w-4/12 dropdown border-[1px] border-gray-300 rounded-lg mr-56"
        >
          <input
            tabIndex={0}
            id="algolia-search"
            placeholder="Search Presenters..."
            className="input input-sm px-5 w-full py-3 bg-transparent border-none"
            onChange={(event) => {
              handlePresentersHits(event?.target.value);
            }}
          />
          <Hits />
        </label>

        <input type="checkbox" id="presenter-modal" className="modal-toggle" />
        <label
          htmlFor="create-presenter-modal"
          className="btn btn-xs btn-circle"
        >
          +
        </label>
      </div>

      <div className="flex justify-between mt-5 items-end">
        {/* tabs */}
        <div className="tabs  gap-1 mt-5">
          {["active", "inactive"].map((item: any) => {
            return (
              <a
                key={`tab-${item}`}
                className={`tab tab-sm tab-bordered border-b-[1px] gap-2 capitalize ${
                  presentersStatus == item ? "tab-active" : ""
                }`}
                onClick={() => {
                  setPage(0);
                  setPresentersStatus(item);
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
            ( Total: {presenters.length} )
          </div>
        </span>
      </div>

      {/* presenters List */}
      <div className="mt-7 text-gray-500 ">
        {!isLoading && (
          <div className="min-h-[70vh] flex flex-col justify-between">
            {presenters.length == 0 && <div>No presenters yet</div>}

            <div className="grid grid-cols-4 flex-wrap gap-4 gap-y-4">
              {presenters.map((item, index) => {
                return (
                  <div key={`presenter-${index}`}>
                    <PresenterCard presenter={item} />
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
                  disabled={!(presentersTotal / 50 > 1)}
                  className="btn btn-sm btn-ghost text-white font-light"
                  onClick={() => {
                    setPage(page + 1);
                  }}
                >
                  →
                </button>
              </div>
            </div>
          </div>
        )}
        {isLoading && <progress className="progress h-[3px] w-56"></progress>}
      </div>

      {/* Create Presenter Modal */}
      <CreatePresenter handleCreatePresenter={handleCreatePresenter} />
    </div>
  );
};

export default Presenters;

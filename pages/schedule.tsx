import Head from "next/head";
import Link from "next/link";
import type { NextPage } from "next";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { timeStamp } from "console";
import { useAuth } from "../context/AuthContext";
import { TableType } from "../utils/typings";
const Schedule: NextPage = () => {
  const router = useRouter();
  let { user, token } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const [tables, setTables] = useState([]);
  const [presenters, setPresenters] = useState([]);
  const [schedule, setSchedule] = useState([[]]);

  const [selectedTables, setSelectedTables] = useState([]);
  const [selectedPresenters, setSelectedPresenters] = useState([]);

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      getPresenters();
      getTables();
    }
  }, [user]);

  const getPresenters = async () => {
    fetch(`/api/presenters/presenters`, {
      headers: new Headers({
        Authorization: "Bearer " + token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPresenters(data);
      })
      .catch((e) => {
        console.log(e);
      });
    setIsLoading(false);
  };

  const getTables = async () => {
    fetch(`/api/tables/tables`, {
      headers: new Headers({
        Authorization: "Bearer " + token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTables(data);
      })
      .catch((e) => {
        console.log(e);
      });
    setIsLoading(false);
  };

  let time = [
    "7:00-7:20",
    "7:20-7:40",
    "7:40-8:00",
    "8:00-0:20",
    "8:20-0:40",
    "8:40-9:00",
    "9:00-9:20",
    "9:20-9:40",
    "9:40-10:00",
    "10:00-10:20",
    "10:20-10:40",
    "10:40-11:00",
  ];

  useEffect(() => {
    generateSchedule();
  }, [selectedPresenters, selectedTables]);

  const generateSchedule = async () => {
    let diff = selectedPresenters.length - selectedTables.length;
    let newTables = selectedTables.concat(Array(diff).fill("break"));

    let schedule: any = [];

    let tableIdx = 0;
    let timeIdx = 0;
    for (let u in selectedPresenters) {
      schedule.push([]);
      timeIdx = 0;
      tableIdx = parseInt(u);

      while (timeIdx < time.length) {
        let index = tableIdx;
        if (index == newTables.length) {
          tableIdx = 0;
        }

        schedule[u].push(newTables[tableIdx]);
        timeIdx++;
        tableIdx++;
      }
    }
    setSchedule(schedule);
  };

  const handleSeletedTables = (table: string) => {
    let newSelectedTables = [...selectedTables];
    let index = newSelectedTables.indexOf(table);
    if (index >= 0) {
      newSelectedTables.splice(index, 1);
    } else {
      if (selectedTables.length < selectedPresenters.length - 1) {
        newSelectedTables.push(table);
      }
    }
    setSelectedTables(newSelectedTables);
  };

  const handleSeletedPresenters = (presenter: string) => {
    let newSelectedPresenters = [...selectedPresenters];
    let index = newSelectedPresenters.indexOf(presenter);
    if (index >= 0) {
      newSelectedPresenters.splice(index, 1);
    } else {
      newSelectedPresenters.push(presenter);
    }
    setSelectedPresenters(newSelectedPresenters);
  };
  return (
    <div>
      <div className="mt-10 shadow-soft bg-white p-5 rounded-xl flex flex-col gap-5">
        <div>
          <p className="text-sm font-bold mb-2">Presenters</p>
          <div className="flex flex-wrap gap-x-3 gap-y-2">
            {presenters.map((presenter: TableType, index: number) => {
              return (
                <div
                  key={`presenter-${index}`}
                  onClick={() => handleSeletedPresenters(presenter.name)}
                  className={`${
                    selectedPresenters.indexOf(presenter.name) >= 0
                      ? "bg-amber-500/10"
                      : "bg-gray-100/60"
                  } hover:bg-amber-500/10 transition-all duration-300  cursor-pointer px-3 py-1 rounded-lg text-xs`}
                >
                  {presenter.name}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <p className="text-sm font-bold mb-2">Tables</p>
          <div className="flex flex-wrap gap-3">
            {tables.map((table: TableType, index: number) => {
              return (
                <div
                  key={`table-${index}`}
                  onClick={() => handleSeletedTables(table.name)}
                  className={`${
                    selectedTables.indexOf(table.name) >= 0
                      ? "bg-amber-500/10"
                      : "bg-gray-100/60"
                  } 
                  ${
                    selectedTables.length >= selectedPresenters.length - 1 &&
                    selectedTables.indexOf(table.name) < 0
                      ? "opacity-25"
                      : ""
                  }
                  hover:bg-amber-500/10 transition-all duration-300 bg-gray-100/60  cursor-pointer  px-3 py-1 rounded-lg text-xs`}
                >
                  {table.name}
                </div>
              );
            })}
          </div>
          {selectedTables.length >= selectedPresenters.length - 1 && (
            <p className="text-xs text-red-500 mt-3">
              Maximum number of tables selected. Please add more game presenters{" "}
            </p>
          )}
        </div>
      </div>
      {/* table */}
      <div className="mt-20 w-fit bg-white shadow-soft p-5 rounded-2xl">
        <table className="">
          <thead>
            <tr>
              <th className=""></th>
              {time.map((item: string, index: number) => {
                return (
                  <th key={`header-${index}`} className="px-5 text-sm ">
                    {item}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {schedule.map((user: any, index: number) => {
              return (
                <tr key={`row-${index}`} className=" border-t-[1px] py-1">
                  <td className="px-5 font-medium">
                    {selectedPresenters[index]}
                  </td>
                  {user.map((table: any, index: number) => {
                    return (
                      <td
                        key={`cell-${index}`}
                        className={`font-light px-5 ${
                          table == "break" ? "text-orange-400" : ""
                        }`}
                      >
                        {table}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Schedule;

import Head from "next/head";
import Link from "next/link";
import type { NextPage } from "next";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { timeStamp } from "console";

const Presenters: NextPage = () => {
  const router = useRouter();

  const [presenters, setPresenters] = useState([]);
  const [presentersTotal, setPresentersTotal] = useState(0);
  const [presentersHits, setPresentersHits] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const perPage = 28;

  useEffect(() => {
    setIsLoading(true);
    generateSchedule();
  }, []);

  let tables = ["table 1", "table 2", "table 3"];
  let users = ["user 1", "user 2", "user 3", "user 4", "user 5"];
  let time = ["7:00-7:20", "7:20-7:40", "7:40-8:00", "8:00-0:20", "8:20-0:40", "8:40-9:00", "9:00-9:20"];

  const [schedule, setSchedule] = useState([[]]);

  const generateSchedule = async () => {
    let diff = users.length - tables.length;
    let newTables = tables.concat(Array(diff).fill("break"));

    let schedule: any = [];

    let tableIdx = 0;
    let timeIdx = 0;
    for (let u in users) {
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
    console.log(schedule);
  };

  return (
    <div className="mt-20 w-fit bg-white shadow-soft p-5 rounded-2xl">
      <table className="">
        <tr>
          <th className=""></th>
          {time.map((item: string) => {
            return <th className="px-5">{item}</th>;
          })}
        </tr>
        {schedule.map((user: any, index: number) => {
          return (
            <tr className=" border-t-[1px] py-1">
              <td className="px-5 font-medium">{users[index]}</td>
              {user.map((table: any, index: number) => {
                return <td className={`font-light px-5 ${table=="break"? "text-orange-400":""}`}>{table}</td>;
              })}
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Presenters;

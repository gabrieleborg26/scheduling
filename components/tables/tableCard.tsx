import moment from "moment";
import Link from "next/link";

const TableCard = ({ table }: any) => {
  let diff = table.createdAt
    ? moment().diff(moment(table.createdAt), "days")
    : null;
  return (
    <Link href={`/tables/${table.id}`} key={`nav-link-${table.id}`}>
      <div
        className={`group shadow-soft py-3 px-3  bg-white rounded-xl flex flex-col justify-between`}
      >
        <div>
          <span className="flex justify-between">
            <p className="text-sm font-medium text-gray-700">{`${table.name}`}</p>
            {diff && <p className="text-xs">{diff}d</p>}
          </span>
          <p className="text-xs text-gray-500">{table.area} - {table.game}</p>
        </div>
      </div>
    </Link>
  );
};

export default TableCard;
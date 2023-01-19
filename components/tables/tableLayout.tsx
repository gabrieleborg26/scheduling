import moment from "moment";
import Link from "next/link";

const TableLayout = ({ table }: any) => {
  let diff = table.createdAt
    ? moment().diff(moment(table.createdAt), "days")
    : null;
  return (
    <Link href={`/tables/${table.id}`} key={`nav-link-${table.id}`}>
      <div
        className={`w-full h-96 flex justify-center items-center border-8 bg-gradient-to-br from-green-500 to-green-700 rounded-[20%] shadow-[inset_10px_20px_10px_rgba(0,0,0,0.4)] `}
      >
        <div className="text-white text-center mt-5">
          <p className="text-xl font-bold mb-3">{`${table.name}`}</p>
          <p className="text-md font-bold">
            <span className="text-sm font-light">area</span> {table.area}
          </p>

          <p className="text-md font-bold">
            <span className="text-sm font-light">game</span> {table.game}
          </p>

          {diff && <p className="text-[10px] mt-20">created {diff} days ago</p>}

        </div>
      </div>
    </Link>
  );
};

export default TableLayout;

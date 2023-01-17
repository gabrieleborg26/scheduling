import moment from "moment";
import Link from "next/link";

const PresenterCard = ({ presenter }: any) => {
  let diff = presenter.createdAt
    ? moment().diff(moment(presenter.createdAt), "days")
    : null;
  return (
    <Link href={`/game-presenters/${presenter.id}`} key={`nav-link-${presenter.id}`}>
      <div
        className={`group shadow-soft py-3 px-3  bg-white rounded-xl flex flex-col justify-between`}
      >
        <div>
          <span className="flex justify-between">
            <p className="text-sm font-medium text-gray-700">{`${presenter.name}`}</p>
            {diff && <p className="text-xs">{diff}d</p>}
          </span>
          <p className="text-xs text-gray-500">{presenter.email}</p>
        </div>
      </div>
    </Link>
  );
};

export default PresenterCard;
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import EditIcon from "../icons/edit";
import SaveIcon from "../icons/save";

const Details = ({ table, handleEditTable }: any) => {
  const [edit, setEdit] = useState(false);

  const [name, setName] = useState(table.name);
  const [game, setGame] = useState(table.game);
  const [area, setArea] = useState(table.area);

  const handleSaveTableDetails = () => {
    let payload: any = {
      name: name,
      game: game,
      area: area,
    };
    handleEditTable(payload);
    setEdit(false);
  };

  return (
    <div className="shadow-soft p-3 rounded-2xl bg-white">
      <div className="flex space-x-3">
        <p className="text-md font-bold ml-2 mb-3">Basic Info</p>
        <span>
          {edit == false && (
            <button
              className="btn btn-xs btn-ghost px-1 rounded-full"
              onClick={() => {
                setEdit(true);
              }}
            >
              <EditIcon />
            </button>
          )}
          {edit == true && (
            <button
              className="btn btn-xs btn-ghost px-1 rounded-full"
              onClick={() => {
                handleSaveTableDetails();
              }}
            >
              <SaveIcon />
            </button>
          )}
        </span>
      </div>
      <div className="flex gap-5 p-2 ">
        <div className="w-full">
          <p className="text-xs font-bold mb-1"> Name</p>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            disabled={!edit}
            onChange={(event) => setName(event.target.value)}
            className="input input-sm input-bordered w-full "
          />
        </div>
        <div className="w-full">
          <p className="text-xs font-bold mb-1">Game</p>
          <input
            type="text"
            placeholder="Roulette"
            value={game}
            disabled={!edit}
            onChange={(event) => setGame(event.target.value)}
            className="input input-sm input-bordered w-full "
          />
        </div>
      </div>
      {/*  */}
      <div className="flex gap-5 p-2 ">
        <div className="w-full">
          <p className="text-xs">Area</p>
          <select
            disabled={!edit}
            className="select select-sm select-bordered w-full"
            value={area}
            onChange={(event) => setArea(event.target.value)}
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Details;

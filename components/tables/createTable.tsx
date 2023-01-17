import moment from "moment";
import { useState } from "react";
import CrossIcon from "../icons/cross";

const CreateTable = ({ handleCreateTable }: any) => {
  const [name, setName] = useState("");
  const [game, setGame] = useState("");
  const [area, setArea] = useState("");

  const handleCreateNewTable = () => {
    let payload: any = {
      name: name,
      game: game,
      area: area,
      status: "active",
      createdAt: moment().valueOf(),
    };
    handleCreateTable(payload);
  };

  return (
    <div>
      <input type="checkbox" id="create-table-modal" className="modal-toggle" />
      <div className="modal modal-bottom ">
        <div className="modal-box w-full sm:w-6/12">
          <div className="flex justify-between mb-5">
            <h3 className="font-bold text-lg ">Create Table</h3>
            <label
              htmlFor="create-table-modal"
              className="btn btn-xs bg-text btn-circle bg-text"
            >
              <CrossIcon />
            </label>
          </div>
          <div className="flex gap-5 mb-5">
            <div className="w-full">
              <p className="text-xs">Name</p>
              <input
                type="text"
                placeholder="Table X"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="input input-sm input-bordered w-full "
              />
            </div>
            <div className="w-full">
              <p className="text-xs">Game</p>
              <input
                type="text"
                placeholder="Roulette"
                value={game}
                onChange={(event) => setGame(event.target.value)}
                className="input input-sm input-bordered w-full "
              />
            </div>
          </div>
          <div className="flex gap-5 mb-4">
            <div className="w-full">
              <p className="text-xs">Area</p>
              <select
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

          <div className="modal-action">
            <label
              htmlFor="create-table-modal"
              className="btn btn-sm capitalize bg-text"
              onClick={() => {
                handleCreateNewTable();
              }}
            >
              Save
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTable;

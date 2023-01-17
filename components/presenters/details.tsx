import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import EditIcon from "../icons/edit";
import SaveIcon from "../icons/save";


const Details = ({ presenter, handleEditPresenter }: any) => {
  const [edit, setEdit] = useState(false);

  const [name, setName] = useState(presenter.name);
  const [username, setUsername] = useState(presenter.username);
  const [email, setEmail] = useState(presenter.email);
  const [phone, setPhone] = useState(presenter.phone);


  const handleSaveUserDetails = () => {
    let payload: any = {
      name: name,
      username: username,
      email: email,
      phone: phone,
    };
    handleEditPresenter(payload);
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
                  handleSaveUserDetails();
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
          <p className="text-xs font-bold mb-1">Username</p>
          <input
            type="text"
            placeholder="username"
            value={username}
            disabled={!edit}
            onChange={(event) => setUsername(event.target.value)}
            className="input input-sm input-bordered w-full "
          />
        </div>
      </div>
      {/*  */}
      <div className="flex gap-5 p-2 ">
        <div className="w-full">
          <p className="text-xs font-bold mb-1">Email</p>
          <input
            type="text"
            placeholder="john@doe.com"
            value={email}
            disabled={!edit}
            onChange={(event) => setEmail(event.target.value)}
            className="input input-sm input-bordered w-full "
          />
        </div>
        <div className="w-full">
          <p className="text-xs font-bold mb-1">Phone</p>
          <input
            type="text"
            placeholder="79123456"
            value={phone}
            disabled={!edit}
            onChange={(event) => setPhone(event.target.value)}
            className="input input-sm input-bordered w-full "
          />
        </div>
      </div>
      
    </div>
  );
};

export default Details;
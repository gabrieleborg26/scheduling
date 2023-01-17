import moment from "moment";
import { useState } from "react";
import CrossIcon from "../icons/cross";

const CreatePresenter = ({ handleCreatePresenter }: any) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");


  const handleCreateNewPresenter = () => {
    let payload: any = {
      name: name,
      username: username,
      email: email,
      phone:phone,
      status: "active",
      createdAt: moment().valueOf(),

    };
    handleCreatePresenter(payload);
  };
  

  return (
    <div>
      <input
        type="checkbox"
        id="create-presenter-modal"
        className="modal-toggle"
      />
      <div className="modal modal-bottom ">
        <div className="modal-box w-full sm:w-6/12">
          <div className="flex justify-between mb-5">
            <h3 className="font-bold text-lg ">Create Presenter</h3>
            <label
              htmlFor="create-presenter-modal"
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
                placeholder="John Doe"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="input input-sm input-bordered w-full "
              />
            </div>
            <div className="w-full">
              <p className="text-xs">Username</p>
              <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="input input-sm input-bordered w-full "
              />
            </div>
          </div>
          <div className="flex gap-5 mb-4">
            <div className="w-full">
              <p className="text-xs">Email</p>
              <input
                type="text"
                placeholder="john@doe.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="input input-sm input-bordered w-full "
              />
            </div>
            <div className="w-full">
              <p className="text-xs">Phone</p>
              <input
                type="text"
                placeholder="79123456"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="input input-sm input-bordered w-full "
              />
            </div>
            
          </div>
          
          <div className="modal-action">
            <label
              htmlFor="create-presenter-modal"
              className="btn btn-sm capitalize bg-text"
              onClick={() => {
                handleCreateNewPresenter();
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

export default CreatePresenter;
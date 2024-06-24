import React, { useState } from "react";
import TaskForm from "../forms/TaskForm";
import TaskList from "../tasks/TaskList";
import Modal from "react-responsive-modal";
import 'react-responsive-modal/styles.css';

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  
  const [res, setResponse] = React.useState("");
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  return (
    <div className="m-40 flex flex-col">
      <div className="gap-20 justify-evenly">
        <div className="w-full">
          <div className="float-right">
        <button className="bg-slate-600/50 p-4 mb-8 rounded-lg" onClick={onOpenModal}>Add new product</button>
        </div>
        <Modal className="!w-6/12" open={open} onClose={onCloseModal} center classNames={{
          overlay: 'customOverlay',
          modal: 'customModal',
        }}>
          <div className="mb-4">
            <div className="text-4xl font-semmibold text-gray-300 mb-1">
              Add new product
            </div>
          </div>
          <TaskForm />
          </Modal>
        </div>
      </div>
      <div className="w-full lg:w-full md:w-full m-auto">
          <TaskList />
      </div>
      <h2></h2>
    </div>
  );
};

export default Dashboard;

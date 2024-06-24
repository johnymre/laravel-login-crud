import React from "react";
import { useTaskContext } from "../../context/TaskContext";
import apiService from "../../services/apiService";
import { truncateText } from "../../utils/string";
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions";
import ModalResponse from "../../modal/modalres";

const TaskList = () => {
  const { taskList, updateContextData } = useTaskContext();
  const [res, setResponse] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [errmess, setErrmess] = React.useState(false);
  
  const data = taskList.map((task) => {
    const { title, id, description, quantity } = task;
      console.log(task)
    return {
      title: task.title,
      description: task.description,
      quantity: task.quantity, 
      action:            
      <div>
            <ul className="menu menu-horizontal bg-base-200/40 menu-xs rounded-box p-2">
              <li>
                <div className="tooltip" data-tip="Mark as Done">
                  <svg
                    onClick={() => markAsDone(id)}
                    width={15}
                    height={15}
                    fill="#60d394"
                    className="stroke-current"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
              </li>
              <li>
                <div className="tooltip" data-tip="Delete">
                  <svg
                    onClick={() => deleteTask(id)}
                    width={15}
                    height={15}
                    fill="#ee6055"
                    className="stroke-current"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </div>
              </li>
            </ul>
          </div>
    };
  });
  console.log(data)
  

  const columns = [{
      name: 'Product Title',
      selector: row => row.title,
      sortable: true,
    },
    {
      name: 'Description',
      selector: row => row.description,
    },{
      name: 'Quantity',
      selector: row => row.quantity,
    },{
      name: 'Action',
      selector: row => row.action,
    },
  ];

  const markAsDone = (id) => {
    apiService
      .put("mark-as-done/" + id)
      .then((response) => {
        updateContextData();
        setErrmess(true);
        setOpen(true);
        setResponse(response.data.message);
      })
      .catch((error) => {
        console.log(error);
        const errmes = error.response.data[1];
          setResponse(Object.values(errmes)[0]);
          setErrmess(false);
          setOpen(true);
      });
  };

  const deleteTask = (id) => {
    apiService
      .delete("delete-task/" + id)
      .then(() => {
        updateContextData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="card bg-slate-600/50">
      <div className="card-body">
        <h2 className="card-title text-gray-300 text-3xl">Product List </h2>
        <p className="text-gray-300/60 text-sm">
          {" "}
          View and manage your product here.{" "}
        </p>
        <DataTableExtensions
          columns={columns}
          data={data}
          print={false}
          export={false}
          className="bg-white"
        >
        <DataTable
        columns={columns}
          data={data}
          pagination
		/>
    </DataTableExtensions>
      </div>
      <ModalResponse modalShow={open} onClose={onCloseModal} message={res} errormess={errmess} />
    </div>
  );
};

export default TaskList;

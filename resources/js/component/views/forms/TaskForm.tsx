import * as React from "react";
import { useTaskContext } from "../../context/TaskContext";
import apiService from "../../services/apiService";
import ModalResponse from "../../modal/modalres";

const TaskForm = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [res, setResponse] = React.useState("");
  const [errmess, setErrmess] = React.useState(false);
  const { updateContextData } = useTaskContext();

  const [open, setOpen] = React.useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handleSubmit = () => {
    apiService
      .post("save-task", {
        title,
        description,
        quantity,
      })
      .then((response) => {
        setTitle("");
        setDescription("");
        setQuantity("");
        updateContextData();
        setResponse(response.data.message);
        setErrmess(true);
        setOpen(true);
      })
      .catch((error) => {
        if (error.response) {
          const errmes = error.response.data[1];
          setResponse(Object.values(errmes)[0]);
          setErrmess(false);
          setOpen(true);
        }
      });
  };

  return (
    <div className="flex flex-col gap-3">
      <input
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
        type="text"
        placeholder="Product Name"
        className="input input-bordered w-full"
        required
      />
      <textarea
        value={description}
        onChange={(event) => {
          setDescription(event.target.value);
        }}
        className="textarea textarea-bordered min-h-52"
        placeholder="Product Description"
        required
      ></textarea>
      <input
        value={quantity}
        onChange={(event) => {
          setQuantity(event.target.value);
        }}
        type="number"
        placeholder="Quantity"
        className="input input-bordered w-full"
        required
      />
      <button className="btn btn-secondary text-white" onClick={handleSubmit}>
        Save Task
      </button>
      <ModalResponse modalShow={open} onClose={onCloseModal} message={res} errormess={errmess} />
    </div>
  );
};

export default TaskForm;

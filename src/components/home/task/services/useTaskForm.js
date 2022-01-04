import { useState } from "react";
import IsEmptyObject from "../../../../service/js/IsEmptyObject";

const useTaskForm = (type, HandleEditTask, task) => {
  const [values, setValues] = useState({ title: task ? task.title : "" });
  const [errors, setErrors] = useState({});

  const setEmptyValues = () => {
    setValues({ ...values, title: "" });
    setErrors({});
  };
  const validateInfo = (values) => {
    let errors = {};

    const titleTemp = values.title.trim();

    if (!titleTemp) {
      errors.title = "Title must be required";
    } else if (titleTemp.length < 2) {
      errors.title = "Name to be 6 charactor or more";
    }

    return errors;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    let errorsTemp = validateInfo(values);
    setErrors(errorsTemp);

    if (IsEmptyObject(errorsTemp)) {
      HandleEditTask(values);
      if (type === "create") {
        setEmptyValues();
      }
    }
  };

  return { handleChange, handleSubmit, setEmptyValues, values, errors };
};

export default useTaskForm;

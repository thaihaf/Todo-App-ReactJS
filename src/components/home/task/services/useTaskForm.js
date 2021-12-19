import { useState } from "react";
import IsEmptyObject from "../../../../service/js/IsEmptyObject";

const useTaskForm = (HandleEditTask, task) => {
  const [values, setValues] = useState({ title: task ? task.title : ""});
  const [errors, setErrors] = useState({});

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
    }
  };

  return { handleChange, handleSubmit, values, errors };
};

export default useTaskForm;

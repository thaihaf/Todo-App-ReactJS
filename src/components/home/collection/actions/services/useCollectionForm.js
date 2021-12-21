import { useState } from "react";
import IsEmptyObject from "../../../../../service/js/IsEmptyObject";

const useForm = (HandleEditCollection) => {
  const [values, setValues] = useState({ name: "" });
  const [errors, setErrors] = useState({});

  const validateInfo = (values) => {
    let errors = {};

    const nameTemp = values.name.trim();

    if (!nameTemp) {
      errors.name = "Name must be required";
    } else if (nameTemp.length < 6) {
      errors.name = "Name to be 6 charactor or more";
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
      HandleEditCollection(values);
    }
  };

  return { handleChange, handleSubmit, values, errors };
};

export default useForm;

import { useState } from "react";
import IsEmptyObject from "../../untils/checkObject/IsEmptyObject";

const useTaskForm = (HandleChangePassword) => {
  const [values, setValues] = useState({
    newpass: "",
    repass: "",
  });
  const [errors, setErrors] = useState({});

  const setEmptyValues = () => {
    setErrors({});
    setValues({});
  };

  const validateInfo = (values) => {
    let errors = {};

    const newpassTemp = values.newpass.trim();
    const repassTemp = values.repass.trim();

    if (!newpassTemp) {
      errors.newpass = "Newpass must be required";
    } else if (newpassTemp.length < 6) {
      errors.newpass = "Newpass to be 6 charactor or more";
    }

    if (!repassTemp) {
      errors.repass = "Repass must be required";
    } else if (repassTemp.length < 6) {
      errors.repass = "Repass to be 6 charactor or more";
    } else if (repassTemp !== newpassTemp) {
      errors.repass = "Repass must be math with newpass";
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
      HandleChangePassword(values.newpass);
      setValues({
        newpass: "",
        repass: "",
      });
    }
  };

  return { handleChange, handleSubmit, setEmptyValues, values, errors };
};

export default useTaskForm;

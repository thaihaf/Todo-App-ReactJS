import { useState } from "react";

import IsEmptyObject from "../../../service/js/IsEmptyObject";

const useTaskForm = (HandleChangePassword) => {
  const [values, setValues] = useState({
    // oldpass: "",
    newpass: "",
    repass: "",
  });
  const [errors, setErrors] = useState({});

  const validateInfo = (values) => {
    let errors = {};

    // const oldpassTemp = values.oldpass.trim();
    const newpassTemp = values.newpass.trim();
    const repassTemp = values.repass.trim();

    // if (!oldpassTemp) {
    //   errors.oldpass = "Oldpass must be required";
    // } else if (oldpassTemp.length < 6) {
    //   errors.oldpass = "Oldpass to be 6 charactor or more";
    // }
    // else if (oldpassTemp !== user.password) {
    //   errors.oldpass = "Oldpass not correct";
    // }

    if (!newpassTemp) {
      errors.newpass = "Newpass must be required";
    } else if (newpassTemp.length < 6) {
      errors.newpass = "Newpass to be 6 charactor or more";
    }
    // else if (newpassTemp === oldpassTemp) {
    //   errors.newpass = "Newpass must be difference from oldpass";
    // }

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

    const userTemp = JSON.parse(localStorage.getItem("user"));

    let errorsTemp = validateInfo(values);
    setErrors(errorsTemp);

    if (IsEmptyObject(errorsTemp)) {
      HandleChangePassword(values, userTemp);
      setValues({
        // oldpass: "",
        newpass: "",
        repass: "",
      });
    }
  };

  return { handleChange, handleSubmit, values, errors };
};

export default useTaskForm;

import React, { useState } from "react";

const useForm = (formData) => {
  const [form, setForm] = useState(formData);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return [form, changeHandler];
};

export default useForm;

// hooks/useForm.js
import { useState } from "react";

export const useForm = (initialState = { input: "", des: "" }) => {
  const [form, setForm] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => setForm(initialState);

  return { form, handleInputChange, resetForm };
};

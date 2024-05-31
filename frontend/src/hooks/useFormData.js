import React, { useState } from "react";

/**
 * Custom React hook for managing form fields state and updating state based on user input.
 * @param {object} initialValue - Initial values for form fields.
 * @returns {Array} - Array containing current form fields state and a function to update the state.
 */

const useFormData = (intialValue) => {
  const [formData, setFormData] = useState(intialValue);
  const updateFormData = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };
  
  return [formData, updateFormData];
};

export default useFormData;

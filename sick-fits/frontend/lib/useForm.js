import { useState } from 'react';

export default function useForm(initial = {}) {
  // create a state object for our inputs
  const [inputs, setInputs] = useState(initial);

  // make a function handleChange, passed into the onChange handler on the input
  function handleChange(e) {
    let { value, name, type } = e.target;
    if (type === 'number') {
      value = parseInt(value);
    }
    if (type === 'file') {
      value[0] = e.target.files;
    }
    setInputs({
      // copy the existing state
      ...inputs,
      // have to make it dynamic, so you can pass in the name of the form element
      [name]: value,
    });
  }

  // reset the form
  function resetForm() {
    setInputs(initial);
  }

  // clear the form, how do you loop over and set them to be empty?
  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  }

  // return the things we want to surface from this custom hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}

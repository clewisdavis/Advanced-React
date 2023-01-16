import { useEffect, useState } from 'react';

export default function useForm(initial = {}) {
  // create a state object for our inputs
  const [inputs, setInputs] = useState(initial);
  const initialValues = Object.values(initial).join('');
  console.log(initialValues);

  useEffect(() => {
    // This function runs when things we are watching change
    setInputs(initial);
  }, [initialValues]);

  // make a function handleChange, passed into the onChange handler on the input
  function handleChange(e) {
    let { value, name, type } = e.target;
    if (type === 'number') {
      value = parseInt(value);
    }
    if (type === 'file') {
      [value] = e.target.files;
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

  function alertMe() {
    console.log('You did it!');
  }

  // return the things we want to surface from this custom hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
    alertMe,
  };
}

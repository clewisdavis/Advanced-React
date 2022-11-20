import Form from './styles/Form';
import useForm from '../lib/useForm';

export default function SignIn() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });

  function handleSubmit(e) {
    e.preventDefault(); // Stop the form from submitting
    console.log(inputs);
    // Send the email and password to the graphql API
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign Into Your Account</h2>
      <fieldset>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            // value
            value={inputs.email}
            // onChange handler
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            // value
            value={inputs.password}
            // onChange handler
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign In!</button>
      </fieldset>
    </Form>
  );
}

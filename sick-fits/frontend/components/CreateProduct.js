import useForm from '../lib/useForm';

export default function CreateProduct() {
  const { inputs, handleChange } = useForm({
    name: 'Nice Car',
    price: 234,
    description: 'Awesome car',
  });
  return (
    <form>
      <label htmlFor="name">
        Name
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={inputs.name}
          onChange={handleChange}
        />
      </label>

      {/* <label htmlFor="price">
        Price
        <input
          type="text"
          id="price"
          name="price"
          placeholder="price"
          value={price}
          onChange={(e) => {
            console.log(e.target.value);
            setName(e.target.value);
          }}
        />
      </label> */}
    </form>
  );
}

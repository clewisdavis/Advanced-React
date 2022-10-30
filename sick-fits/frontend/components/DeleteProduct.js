export default function DeleteProduct({ id, children }) {
  return (
    <button
      type="button"
      onClick={() => {
        if (confirm('Are you sure')) {
          // go ahead and delete
          console.log('deleted');
        } // nothing happens
      }}
    >
      {children}
    </button>
  );
}

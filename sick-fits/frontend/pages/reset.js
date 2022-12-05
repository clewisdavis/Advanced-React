export default function ResetPage({ query }) {
  return (
    <div>
      <p>RESET YOUR PASSWORD {query.token}</p>
    </div>
  );
}

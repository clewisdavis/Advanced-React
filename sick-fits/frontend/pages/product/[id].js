import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const SINGLE_ITEM_QUERY = gql`
  query {
    Product(where: { id: "634c1168403cd42f6a5519df" }) {
      name
      price
      description
    }
  }
`;

export default function SingleProduct({ query }) {
  const { data, loading, error } = useQuery();
  return <p>Hey, I am a single product {query.id}</p>;
}

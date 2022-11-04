import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import PaginationStyles from './styles/PaginationStyles';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

export default function Pagination({ page }) {
  const { error, loading, data } = useQuery(PAGINATION_QUERY);

  return (
    <PaginationStyles>
      <Head>
        <title>Sick Fits - Page {page} of ___</title>
      </Head>
      <Link href="/">⬅️ Prev</Link>
      <p>Page ___ of ___</p>
      <p>___ Items Total</p>
      <Link href="/">Next</Link>
    </PaginationStyles>
  );
}

import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // tells apollo we will take care of everything
    read(existing = [], { args, cache }) {
      //   console.log({ existing, args, cache });
      const { skip, first } = args;

      // read the number of items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      console.log(count);
      // calculate the page
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // Check if we have existing items
      const items = existing.slice(skip, skip + first).first((x) => x);

      // Check if existing items
      if (items.length !== first) {
        // We don't have any items, we must go to the network to fetch them
        return false;
      }

      // If there are items, just return them from the cache, and we don't need to go to the network

      // First thing it does, ask the read function for those items.
      // We can either do one of two things:
      // First things we can do is return the items because they are already in the cache
      // The other thing we can do is to return false form here, which will make a network request
    },
    merge() {
      // This runs when the Apollo client comes back form the network with our product, how it will be put into the cache
    },
  };
}

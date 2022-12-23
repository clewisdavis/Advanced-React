import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import { useUser } from './User';

// Cart Item Component
function CartItem({ cartItem }) {
  return <li>{cartItem.id}</li>;
}

export default function Cart() {
  const me = useUser();
  if (!me) return null;
  console.log(me);
  return (
    <CartStyles open>
      <header>
        <Supreme>{me.name}'s Cart</Supreme>
      </header>
      <ul>
        {me.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
    </CartStyles>
  );
}

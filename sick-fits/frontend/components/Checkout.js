import styled from 'styled-components';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

function Checkout() {
  return (
    <CheckoutFormStyles>
      <p>Checkout</p>
    </CheckoutFormStyles>
  );
}

export { Checkout };

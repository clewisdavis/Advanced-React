import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';

const Dot = styled.div`
  background: var(--red);
  color: white;
  border-radius: 50%;
  padding: 0.5rem;
  line-height: 2rem;
  min-width: 3rem;
  margin-left: 1rem;
  // prevents the number shift, makes them all the same width
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
`;

export default function CartCount({ count }) {
  return (
    <TransitionGroup>
      <CSSTransition
        unmountOnExit
        className="count"
        classNames="count"
        key={count}
        timeout={{ enter: 4000, exit: 4000 }}
      >
        <Dot>{count}</Dot>
      </CSSTransition>
    </TransitionGroup>
  );
}

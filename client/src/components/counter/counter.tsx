import { ReactElement, useEffect, useState } from 'react';

const INITIAL_COUNT = 1;

type CounterProps = {
  initialCount?: number,
  inputAvailable?: boolean,
  onChange?: Function
}

export default function Counter({ initialCount, inputAvailable, onChange }: CounterProps): ReactElement {
  const startCount = initialCount ?? INITIAL_COUNT;
  const [count, setCount] = useState(startCount);
  const isInputAvailable = inputAvailable ?? false;

  useEffect(() => {
    let isMounted = true;

    if(isMounted) {
      handleCountChange(count);
    }

    return () => {
      isMounted = false;
    }
  }, [count])

  function handleCountChange(count: number) {
    if(onChange) {
      onChange(count);
    }
  }

  function handleIncrementClick() {
    setCount((count) => count + 1);
  }

  function handleDecrementClick() {
    setCount((count) => {
      let newCount = count - 1;

      newCount = (newCount <= 0) ? 1 : newCount;

      return newCount
    });
  }

  return (
    <div className="popup__product-quantity">
      <p className="popup__quantity">Количество</p>
      <div className="input-quantity">
        <button className="btn-icon btn-icon--quantity" type="button" aria-label="minus" tabIndex={2} onClick={handleDecrementClick}>
          <svg width={12} height={12} aria-hidden="true">
            <use xlinkHref="#icon-minus" />
          </svg>
        </button>
        <div className="input-quantity__input">
          <label>
            <input type="text" value={count} size={2} readOnly={!isInputAvailable} />
          </label>
        </div>
        <button className="btn-icon btn-icon--quantity" type="button" aria-label="plus" tabIndex={3} onClick={handleIncrementClick}>
          <svg width={12} height={12} aria-hidden="true">
            <use xlinkHref="#icon-plus" />
          </svg>
        </button>
      </div>
    </div>
  )
}

import browserHistory from '@client/src/browser-history';
import { ReactElement } from 'react';

export default function BackBtn(): ReactElement {
  function handleBackBtnClick() {
    browserHistory.back();
  }

  return (
    <button className="btn-flat btn-flat--underlined my-training-form__btnback" type="button" onClick={handleBackBtnClick}>
      <svg width={14} height={10} aria-hidden="true">
        <use xlinkHref="#arrow-left" />
      </svg><span>Назад</span>
    </button>
  )
}

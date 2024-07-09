import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

type PopupProps  = {
  isOpened?: boolean,
  extraClassName?: string
} & PropsWithChildren;

export default function Popup({ isOpened = false, extraClassName, children }: PopupProps) {
  if(!isOpened) {
    return;
  }

  return createPortal(
    <div className={`popup-form ${extraClassName}`}>{children}</div>
    , document.body);
}

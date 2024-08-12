import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

type PopupPortalProps  = {
  isOpened?: boolean,
  extraClassName?: string
} & PropsWithChildren;

export default function PopupPortal({ isOpened = false, extraClassName, children }: PopupPortalProps) {
  if(!isOpened) {
    return;
  }

  return createPortal(
    <div className={`popup-form ${extraClassName}`}>{children}</div>
    , document.body);
}

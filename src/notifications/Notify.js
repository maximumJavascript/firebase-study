import styles from './Notify.module.css';
import { createPortal } from 'react-dom';
import { notifyService } from './notify.service';
import { observer } from 'mobx-react';

const notifyRoot = document.getElementById('notify-root');

export const Notify = observer(function Notify() {
  return createPortal(
    <>
      {notifyService.notify.map((notify) => (
        <Notify notify={notify} />
      ))}
    </>,
    notifyRoot
  );
});

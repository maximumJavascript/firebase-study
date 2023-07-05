import { createPortal } from 'react-dom';
import { observer } from 'mobx-react-lite';
import { NotifyList } from '../NotifyList';

const notifyRoot = document.getElementById('notify-root');

export const NotifyModal = observer(function NotifyModal() {
  return createPortal(<NotifyList />, notifyRoot);
});

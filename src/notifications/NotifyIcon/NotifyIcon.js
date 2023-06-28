import { STATUS } from '../../constants/notify';
import { ReactComponent as SuccessfullIcon } from '../../assets/icons/SuccessfullIcon.svg';
import { ReactComponent as ErrorIcon } from '../../assets/icons/ErrorIcon.svg';
import { ReactComponent as WarningIcon } from '../../assets/icons/WarningIcon.svg';
import { ReactComponent as InfoIcon } from '../../assets/icons/InfoIcon.svg';
import styles from './NotifyIcon.module.css';

function getIcon(status) {
  switch (status) {
    case STATUS.SUCCESSFULLY:
      return SuccessfullIcon;
    case STATUS.WARNING:
      return WarningIcon;
    case STATUS.INFO:
      return InfoIcon;
    case STATUS.ERROR:
      return ErrorIcon;
    default:
      return InfoIcon;
  }
}

export function NotifyIcon({ status }) {
  const Icon = getIcon(status);
  return (
    <>
      <Icon />
    </>
  );
}

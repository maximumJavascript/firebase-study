import styles from '../../Header.module.css';
import { ProfileDropDown } from '../ProfileDropDown';

export function ProfileMenu(props) {
  return (
    <div>
      <div className={styles.authPicture} onClick={props.onClickProfile}>
        <img className={styles.authImg} src={props.imageSrc} />
      </div>
      {props.openDropDown && (
        <ProfileDropDown onClose={props.onCloseDropDown} wrapRef={props.wrapRef} />
      )}
    </div>
  );
}

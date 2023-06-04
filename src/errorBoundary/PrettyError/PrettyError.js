import styles from './prettyError.module.css';

export function PrettyError() {
  return <div className={styles.error_container}>Упс.... Что-то пошло не так</div>;
}

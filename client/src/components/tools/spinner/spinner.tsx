import styles from './spinner.module.css';

export default function Spinner() {
  return (
    <div className={styles['lds-facebook']}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

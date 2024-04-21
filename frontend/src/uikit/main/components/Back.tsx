import styles from './Back.module.scss';
import Arrow from '../../../../public/arrow.svg';

interface IBackProps {
  onBackClick: () => void;
}

export const Back = ({ onBackClick }: IBackProps) => <img src={Arrow} className={styles.icon} onClick={onBackClick} />;

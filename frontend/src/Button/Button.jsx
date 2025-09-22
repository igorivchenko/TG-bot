import useTelegram from '../hooks/useTelegram';
import s from './Button.module.css';

const Button = () => {
  const { onClose } = useTelegram();

  return (
    <button onClick={onClose} type="button" className={s.button}>
      Закрити
    </button>
  );
};

export default Button;

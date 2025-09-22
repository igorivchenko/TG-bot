import Button from '../Button/Button';
import useTelegram from '../hooks/useTelegram';
import s from './Header.module.css';

const Header = () => {
  const { user } = useTelegram();

  return (
    <header className={s.header}>
      <Button />
      <span className={s.username}>{user?.username}</span>
    </header>
  );
};

export default Header;

import { useCallback, useEffect, useState } from 'react';
import s from './Form.module.css';
import useTelegram from '../hooks/useTelegram';

const Form = () => {
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [subject, setSubject] = useState('');
  const { tg } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      country,
      city,
      street,
      subject,
    };
    tg.sendData(JSON.stringify(data));
  }, [tg, country, street, city, subject]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData);
    return () => {
      tg.offEvent('mainButtonClicked', onSendData);
    };
  }, [tg, onSendData]);

  useEffect(() => {
    tg.MainButton.setParams({
      text: 'Відправити дані',
    });
  }, [tg]);

  useEffect(() => {
    if (!country || !city) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [country, city, tg]);

  const onChangeCountry = (evt) => {
    setCountry(evt.target.value);
  };
  const onChangeCity = (evt) => {
    setCity(evt.target.value);
  };
  const onChangeStreet = (evt) => {
    setStreet(evt.target.value);
  };
  const onChangeSubject = (evt) => {
    setSubject(evt.target.value);
  };

  return (
    <form className={s.form}>
      <h3>Введіть ваші дані:</h3>
      <input
        className={s.input}
        type="text"
        placeholder="Країна"
        value={country}
        onChange={onChangeCountry}
      />
      <input
        className={s.input}
        type="text"
        placeholder="Місто"
        value={city}
        onChange={onChangeCity}
      />
      <input
        className={s.input}
        type="text"
        placeholder="Вулиця"
        value={street}
        onChange={onChangeStreet}
      />
      <select className={s.select} value={subject} onChange={onChangeSubject}>
        <option value="phisycal">Фіз. особа</option>
        <option value="legal">Юр. особа</option>
      </select>
    </form>
  );
};

export default Form;

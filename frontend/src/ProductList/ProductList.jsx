import { useCallback, useEffect, useState } from 'react';
import ProductItem from '../ProductItem/ProductItem';
import s from './ProductList.module.css';
import useTelegram from '../hooks/useTelegram';

const ProductList = () => {
  const { tg, queryId } = useTelegram();
  const [addedItems, setAddedItems] = useState([]);

  const onSendData = useCallback(() => {
    const data = {
      queryId,
      products: addedItems,
      totalPrice: getTotalPrice(addedItems),
    };
    fetch('https://tg-bot-backend-lcxj.onrender.com/web-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }, [addedItems, queryId]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData);
    return () => {
      tg.offEvent('mainButtonClicked', onSendData);
    };
  }, [tg, onSendData]);

  const products = [
    {
      id: 1,
      title: 'Ноутбук',
      price: 1500,
      description: 'Потужний ноутбук для роботи та ігор',
    },
    {
      id: 2,
      title: 'Смартфон',
      price: 800,
      description: 'Сучасний смартфон з великим екраном',
    },
    {
      id: 3,
      title: 'Навушники',
      price: 150,
      description: 'Безпровідні навушники з хорошим звуком',
    },
    {
      id: 4,
      title: 'Монітор',
      price: 300,
      description: '27-дюймовий монітор з високою роздільною здатністю',
    },
    {
      id: 5,
      title: 'Клавіатура',
      price: 70,
      description: 'Механічна клавіатура з підсвіткою',
    },
    {
      id: 6,
      title: 'Мишка',
      price: 50,
      description: 'Ергономічна мишка для геймерів',
    },
    {
      id: 7,
      title: 'Принтер',
      price: 200,
      description: 'Струменевий принтер з Wi-Fi',
    },
    {
      id: 8,
      title: 'Камера',
      price: 600,
      description: 'Цифрова камера для фото та відео',
    },
  ];

  const getTotalPrice = (items) => {
    return items.reduce((acc, item) => {
      return (acc += item.price);
    }, 0);
  };

  const onAdd = (product) => {
    const allReadyAdded = addedItems.find((item) => item.id === product.id);
    let newItems = [];

    if (allReadyAdded) {
      newItems = addedItems.filter((item) => item.id !== product.id);
    } else {
      newItems = [...addedItems, product];
    }

    setAddedItems(newItems);

    if (newItems.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Купити: ${getTotalPrice(newItems)}`,
      });
    }
  };

  return (
    <ul className={s.list}>
      {products.map((product) => (
        <li className={s.item} key={product.id}>
          <ProductItem item={product} onAdd={onAdd} className="item" />
        </li>
      ))}
    </ul>
  );
};

export default ProductList;

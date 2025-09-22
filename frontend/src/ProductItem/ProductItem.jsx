import clsx from 'clsx';
import s from './ProductItem.module.css';

const ProductItem = ({ item, className, onAdd }) => {
  const handleAdd = () => {
    onAdd(item);
  };

  return (
    <div className={clsx(s.item, className)}>
      <div className={s.img} />
      <div className={s.title}>{item.title}</div>
      <div className={s.description}>{item.description}</div>
      <div className={s.description}>
        <span>
          Ціна: <b>{item.price}</b>
        </span>
      </div>
      <button onClick={handleAdd} className={s.addBtn} type="button">
        Додати в корзину
      </button>
    </div>
  );
};

export default ProductItem;

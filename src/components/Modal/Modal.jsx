import React from 'react';
import css from '../Modal/Modal.module.css';
import { useEffect } from 'react';

export const Modal = ({ bigImg, onClose }) => {
  const keyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', keyDown);

    return () => window.removeEventListener('keydown', keyDown);
  });

  const backdropClick = e => {
    // console.log('t', e.target);
    // console.log('ct', e.currentTarget);
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div className={css.Overlay} onClick={backdropClick}>
      <div className={css.Modal}>
        <img className={css.ImgStyle} src={bigImg} alt="" />
      </div>
    </div>
  );
};

//   console.log(bigImg);

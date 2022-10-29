import { useState, useEffect } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Spinner } from './Spinner/Spinner';
import { api } from './helpers/Api';

export const App = () => {
  const [formSearchQuery, setFormSearchQuery] = useState('');
  const [answerApi, setAnswerApi] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const [openModal, setOpenModal] = useState(false);
  const [bigImgUrl, setBigImgUrl] = useState('');
  const [load, setLoad] = useState(false);
  const [total, setTotal] = useState('');

  useEffect(() => {
    if (formSearchQuery === '') {
      return;
    }
    setLoad(true);
    async function fetchData() {
      try {
        setLoad(true);
        const response = await api(formSearchQuery, page);
        setAnswerApi(s => [...s, ...response.hits]);

        setTotal(response.totalHits);
        setLoad(false);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchData();
  }, [formSearchQuery, page]);

  const onClickLoadMore = () => {
    setLoad(true);
    setPage(s => s + 1);
  };

  const toggleModal = () => {
    setOpenModal(s => !s);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const onChangeSearchQuery = data => {
    setFormSearchQuery(data);
    setPage(1);
    setAnswerApi([]);
  };

  const onItemClick = url => {
    toggleModal();
    setBigImgUrl(url);
  };

  const totalPage = total / 12;

  return (
    <div>
      <Searchbar onChangeSearchQuery={onChangeSearchQuery}></Searchbar>
      {total === 0 && <div>sorry no results found</div>}
      {answerApi.length !== 0 && (
        <ImageGallery>
          {load && <Spinner></Spinner>}
          <ImageGalleryItem
            answerFromApi={answerApi}
            onItemClick={onItemClick}
          ></ImageGalleryItem>
        </ImageGallery>
      )}
      {page < totalPage && !load && <Button onClick={onClickLoadMore}></Button>}
      {openModal && <Modal bigImg={bigImgUrl} onClose={onCloseModal}></Modal>}
      {error && <div>Oops something went wrong</div>}
    </div>
  );
};

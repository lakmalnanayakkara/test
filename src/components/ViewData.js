import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Actions, fetchData } from '../store/reducers/getDataSlice';
import { Card } from 'react-bootstrap';

export default function ViewData() {
  const getData = useSelector((state) => state.getData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const dataPerPages = getData.dataPerPages;
  const currentPage = getData.currentPage;
  //console.log(dataPerPages, currentPage);
  if (getData.data.results) {
    var totalPages = getData.data.results.length / dataPerPages;
  }

  function createArrayWithPages(n) {
    const resultArray = [];
    for (let i = 1; i <= n; i++) {
      resultArray.push(i);
    }
    return resultArray;
  }
  const pages = createArrayWithPages(totalPages);
  const indexOfLastPage = currentPage * dataPerPages;
  const indexOfFirstPage = indexOfLastPage - dataPerPages;
  //console.log(indexOfFirstPage, indexOfLastPage);

  if (getData.data.results) {
    var visibleData = getData.data.results.slice(
      indexOfFirstPage,
      indexOfLastPage
    );
  }

  const navigatePrev = () => {
    if (currentPage !== 1) {
      dispatch(Actions.onNavigatePrev());
    }
  };

  const navigateNext = () => {
    if (currentPage !== 20) {
      dispatch(Actions.onNavigateNext());
    }
  };

  const navigatePage = (_p) => {
    dispatch(Actions.onClickCurrentPage(_p));
  };

  return (
    <div>
      <p className="button-set">
        <span className="button" onClick={navigatePrev}>
          Prev
        </span>
        {pages.map((_p) => (
          <span
            key={_p}
            className="button"
            onClick={() => navigatePage.call(null, _p)}
          >
            {_p}
          </span>
        ))}
        <span className="button" onClick={navigateNext}>
          Next
        </span>
      </p>
      <div className="data-item">
        <div className="products">
          {visibleData
            ? visibleData.map((data) => (
                <Card className="product" key={data.id}>
                  <img src={data.image} alt={data.name} />
                  <Card.Body>
                    <Card.Title className="title">{data.name}</Card.Title>
                    <Card.Text className="text">
                      {data.name} is a {data.species} from {data.origin.name}
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

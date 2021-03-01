import React, { ReactElement, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { getItem } from "../../client/actions";
import { RootState } from "../../client/reducers";

interface ItemDetailProps {
  alias: string;
}

const ItemDetail = ({ alias }: ItemDetailProps): ReactElement => {
  const { name, startDate, category, description, thumbnailHigh } = useSelector(
    ({ itemDetail }: RootState) => itemDetail
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItem(alias));
  }, []);

  return (
    <section className="item-detail">
      <header data-js="name">
        <h2>
          {name}
          <br />
          <small data-js="start-date">{startDate}</small>
        </h2>
      </header>
      <div className="item-detail__badge" data-js="category">
        {category}
      </div>
      <img className="item-image" src={thumbnailHigh} />
      <article data-js="description">{description}</article>
    </section>
  );
};

ItemDetail.propTypes = {
  alias: PropTypes.string.isRequired,
};

export default ItemDetail;

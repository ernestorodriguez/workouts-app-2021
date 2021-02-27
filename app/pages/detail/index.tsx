import React, { ReactElement } from "react";
import { useParams } from "react-router";
import ItemDetail from "../../components/ItemDetail";
import Header from "../../components/Header";

interface Params {
  alias: string;
}
const ItemDetailPage = (): ReactElement => {
  const params: Params = useParams();
  const { alias } = params;
  return (
    <div data-js="details-page">
      <Header internal />
      <ItemDetail alias={alias} />
    </div>
  );
};

export default ItemDetailPage;

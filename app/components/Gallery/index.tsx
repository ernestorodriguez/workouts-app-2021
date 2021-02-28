import React, { ReactChild, ReactElement, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import GalleryItem, { GalleryItemProps } from "./GalleryItem";
import GalleryTopBar from "./GalleryTopBar";
import { getGalleryPage } from "../../client/actions";
import GalleryFooter from "./GalleryFooter";
import { RootState } from "../../client/reducers";
import { useHistory } from "react-router";
import { buildParams } from "../../utils";

const Gallery = (): ReactElement => {
  const children: ReactChild[] = [];
  const history = useHistory();
  const {
    workouts = [],
    page,
    startDate,
    startDateSelector,
    availableCategories,
    selectedCategories,
    totalWorkOuts,
    totalPages,
  } = useSelector(({ gallery }: RootState) => gallery);
  const dispatch = useDispatch();

  useEffect(() => {
    if (workouts && workouts.length === 0) {
      dispatch(getGalleryPage(1, startDate, selectedCategories));
    }
  }, []);

  useEffect(() => {
    const query = buildParams(page, startDate, selectedCategories);
    history.push({
      search: query,
      state: {
        update: false,
      },
    });
  }, [page, startDate, selectedCategories]);

  workouts.forEach(
    ({
      id,
      name,
      alias,
      startDate,
      thumbnailMedium,
      category,
    }: GalleryItemProps) => {
      children.push(
        <GalleryItem
          key={`gallery-item-${id}`}
          id={id}
          name={name}
          alias={alias}
          startDate={startDate}
          thumbnailMedium={thumbnailMedium}
          category={category}
        />
      );
    }
  );

  const getPageForPagination = (newPage: number) => {
    dispatch(getGalleryPage(newPage, startDate, selectedCategories));
  };

  const startDateChangeHandler = (newDate: string) => {
    dispatch(getGalleryPage(1, newDate, selectedCategories));
  };
  const categoryChangeHandler = (newSelectedCategories: string[]) => {
    dispatch(getGalleryPage(1, startDate, newSelectedCategories));
  };

  return (
    <div className="gallery">
      <GalleryTopBar
        startDateChangeHandler={startDateChangeHandler}
        categoryChangeHandler={categoryChangeHandler}
        startDateSelector={startDateSelector}
        availableCategories={availableCategories}
      />
      <section className="gallery-item-container" data-js="gallery">
        {children}
      </section>
      <GalleryFooter
        getPage={getPageForPagination}
        page={page}
        totalPages={totalPages}
        totalWorkOuts={totalWorkOuts}
      />
    </div>
  );
};

export default Gallery;

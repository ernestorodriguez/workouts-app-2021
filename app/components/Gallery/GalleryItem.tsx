import React, {ReactElement, useState} from "react";
import { NavLink } from "react-router-dom";
import { Placeholder } from "semantic-ui-react";

export interface GalleryItemProps {
  id: number;
  name: string;
  alias: string;
  startDate: string;
  thumbnailMedium: string;
  thumbnailDefault: string;
  thumbnailHigh: string;
  category: string;
}

const GalleryItem = ({
  id,
  name,
  alias,
  startDate,
  thumbnailDefault,
  thumbnailMedium,
  thumbnailHigh,
  category,
}: GalleryItemProps): ReactElement => {
  const [loading, setLoading] = useState(true);
  return (
    <article className="gallery-item" data-js="gallery-item" data-id={id}>
      <NavLink className="gallery-item_link" exact to={`/workouts/${alias}`}>
        <div className="gallery-item__image-container">
          <img
            onLoad={() => {
              setLoading(false);
            }}
            srcSet={`${thumbnailMedium} 480w, ${thumbnailHigh} 800w`}
            sizes="(max-width: 600px) 480px, 800px"
            loading="lazy"
            className={`gallery-item__image ${
              loading && "gallery-item__image--loading"
            }`}
            src={thumbnailDefault}
            alt=""
          />
          {loading && (
            <Placeholder>
              <Placeholder.Image rectangular />
            </Placeholder>
          )}
        </div>

        <div className="gallery-item_info">
          <div className="gallery-item_info-name">{name}</div>
          <div data-js="start-date">{startDate}</div>
          <div className="gallery-item__category" data-js="start-category">
            {category}
          </div>
        </div>
      </NavLink>
    </article>
  );
}

export default GalleryItem;

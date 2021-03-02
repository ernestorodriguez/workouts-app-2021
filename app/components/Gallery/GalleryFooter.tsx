import React, { ReactElement } from "react";
import { Pagination } from "semantic-ui-react";

interface GalleryFooterProps {
  getPage(activePage: number): void;
  page?: number;
  totalPages?: number;
  totalWorkOuts?: number;
}

const GalleryFooter = ({
  getPage,
  page,
  totalPages,
  totalWorkOuts,
}: GalleryFooterProps): ReactElement => (
  <>
    <footer className="gallery-footer">
      <div data-js="total-workouts">{`${totalWorkOuts} Workouts`}</div>
      {totalPages && totalPages > 1 && (
        <Pagination
          className="pagination"
          activePage={page}
          firstItem={null}
          lastItem={null}
          boundaryRange={0}
          siblingRange={1}
          pointing
          secondary
          totalPages={totalPages}
          onPageChange={(event, data) => {
            getPage(data.activePage as number);
          }}
        />
      )}
    </footer>
  </>
);

export default GalleryFooter;

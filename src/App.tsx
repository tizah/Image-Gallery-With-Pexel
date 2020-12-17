import React, { FC, useEffect, useState, MouseEvent, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import "./App.css";

import {
  getPhotos,
  getCuratedPhotos,
  setError,
} from "./store/actions/photoActions";
import { RootState } from "./store";
import Intro from "./components/Intro";
import { Divider } from "@material-ui/core";

const App: FC = () => {
  const dispatch = useDispatch();
  const { photos, total_results, error } = useSelector(
    (state: RootState) => state.photos
  );

  const [mode, setMode] = useState("trending");
  const [loading, setLoading] = useState(false);
  const [searchFor, setSearchFor] = useState("");
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState("Trending");

  const searchPhotosHandler = (query: string) => {
    if (error) {
      setError("");
    }
    setMode("search");
    setLoading(true);
    setSearchFor(query);
    setPage(1);
    dispatch(
      getPhotos(
        1,
        query,
        () => setLoading(false),
        () => setLoading(false)
      )
    );
    setTitle(`Search results for "${query}"`);
  };

  let content = null;

  if (loading) {
    content = (
      <div className="is-flex is-justify-content-center py-6">
        <div className="loading"></div>
      </div>
    );
  } else {
    content = error ? (
      <div className="notification is-danger mt-6 has-text-centered">
        {error}
      </div>
    ) : (
      <Fragment>
        <h2 className="is-size-1 has-text-centered py-6">{title}</h2>
        {photos.length > 0 ? (
          <ResponsiveMasonry columnsCountBreakPoints={{ 480: 2, 900: 5 }}>
            <Masonry gutter={20}>
              {photos.map((photo) => (
                <div key={photo.id} className="masonry-item">
                  <a href="/#" onClick={(e) => {}}>
                    <img src={photo.src.large} alt="" />
                  </a>
                </div>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        ) : (
          <p className="has-text-centered">No Results</p>
        )}
        <div className="is-flex is-justify-content-centered py-6">
          {(total_results > page * 10 || mode === "trending") && (
            <button className="button is-primary is-large">Load more</button>
          )}
        </div>
      </Fragment>
    );
  }

  return (
    <div>
      <Intro onSearch={searchPhotosHandler} />
      <div className="container px-4">{content} </div>
    </div>
  );
};

export default App;

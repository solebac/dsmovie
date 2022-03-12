import axios from "axios";
import { Fragment } from "react";
import { BASE_URL } from "utils/requests";
import MovieCard from "../../components/MovieCard";
import Pagination from "../../components/Pagination";

function Listing() {

  axios.get(`${BASE_URL}/movies?size=2&page=2`)
  .then(response => {
    console.log(response.data); 
  })
  return (
    <Fragment>
      <Pagination />
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-lg-4 col-xl-3 mb-3">
            <MovieCard />
          </div>
          <div className="col-sm-6 col-lg-4 col-xl-3 mb-3">
            <MovieCard />
          </div>
          <div className="col-sm-6 col-lg-4 col-xl-3 mb-3">
            <MovieCard />
          </div>
          <div className="col-sm-6 col-lg-4 col-xl-3 mb-3">
            <MovieCard />
          </div>
          <div className="col-sm-6 col-lg-4 col-xl-3 mb-3">
            <MovieCard />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default Listing;

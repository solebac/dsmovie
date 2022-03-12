import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import { Movie } from "types/movie";
import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "utils/requests";
import { validateEmail } from "utils/validate";

type Props = {
  movieId: string;
};

const FormCard = ({ movieId }: Props) => {

  const navigate = useNavigate();//Posso dar um command para redirecionamento de rotas

  //Logica para buscar do backend o filme pelo id
  const [movie, setMovie] = useState<Movie>();
  useEffect(() => {
    axios.get(`${BASE_URL}/movies/${movieId}`).then((response) => {
      setMovie(response.data);
    });
  }, [movieId]);

  const handleSubmil = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    ev.stopPropagation();
    const email = (ev.target as any).email.value;
    const score = (ev.target as any).score.value;
    if (!validateEmail(email)) {
      return;
    }

    const config: AxiosRequestConfig = { //Add no import do axios
      baseURL: BASE_URL,
      method: "PUT",
      url: "/scores",
      data: {
        email: email,
        movieId: movieId,
        score: score,
      },
    }
    axios(config) //Isso resulta em um promisse
    .then(response => {
      console.log(response.data);
      navigate("/");
    });
  }

  return (
    <div className="dsmovie-form-container">
      <img
        className="dsmovie-movie-card-image"
        src={movie?.image}
        alt={movie?.title}
      />
      <div className="dsmovie-card-bottom-container">
        <h3>{movie?.title}</h3>
        <form className="dsmovie-form" onSubmit={handleSubmil}>
          <div className="form-group dsmovie-form-group">
            <label htmlFor="email">Informe seu email</label>
            <input type="email" className="form-control" id="email" />
          </div>
          <div className="form-group dsmovie-form-group">
            <label htmlFor="score">Informe sua avaliação</label>
            <select className="form-control" id="score">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <div className="dsmovie-form-btn-container">
            <button type="submit" className="btn btn-primary dsmovie-btn">
              Salvar
            </button>
          </div>
        </form>
        <Link to="/">
          <button className="btn btn-primary dsmovie-btn mt-3">Cancelar</button>
        </Link>
      </div>
    </div>
  );
};
export default FormCard;

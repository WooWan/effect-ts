import "./App.css";
import { usePokemonsQuery } from "./service/post";
import { Link } from "react-router-dom";

function App() {
  const { data } = usePokemonsQuery();

  return (
    <>
      <ul>
        {data?.results.map(({ name, url }) => {
          const id = url.split("/")[6];
          return (
            <Link to={`/${id}`}>
              <li key={name}>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                  alt=""
                />
                <span>{name}</span>
              </li>
            </Link>
          );
        })}
      </ul>
    </>
  );
}

export default App;

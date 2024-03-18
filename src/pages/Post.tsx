import React from "react";
import { useParams } from "react-router-dom";
import { usePokemonQuery } from "../service/post";

function PostDetail() {
  const { id } = useParams();
  const { data } = usePokemonQuery(String(id));
  console.log("data", data);

  return (
    <div>
      <h1>{data?.name}</h1>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        alt=""
      />
    </div>
  );
}

export default PostDetail;

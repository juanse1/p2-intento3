import { geoConicEquidistantRaw } from "d3";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

export default function Movie(props){
    const [locale] = useState(props.lang);
    const [movie, setMovie] = useState([]);

    useEffect(() =>{
        if (!navigator.onLine) {
            if (localStorage.getItem("movie") === null) {
              setMovie("Loading...");
            } else {
              setMovie(JSON.parse(localStorage.getItem("movie")));
            }
          } else {

            if(locale === "en")
            {
              const url = "https://gist.githubusercontent.com/jhonatan89/2089276d3ce0faceff8e55fc3459b818/raw/30ee1a77b3e328108faaaa9aaac6f2ddaa3d3711/pokemons-en.json";

            fetch(url)
            .then((res) => res.json())
            .then((res) => {
              setMovie(res);
              localStorage.setItem("movie", JSON.stringify(res));
              console.log(res);

            });

            }
            else{
              const url = "https://gist.githubusercontent.com/jhonatan89/e379fadf8ed0f5381a2d8f8f3dea90c3/raw/e2bc20df02828d297f99558551e37959ac97a6f8/pokemon-es.json";

            fetch(url)
            .then((res) => res.json())
            .then((res) => {
              setMovie(res);
              localStorage.setItem("movie", JSON.stringify(res));
              console.log(res);

            });

            }
          }


          
  

    },[]);

    return (
        <main>
            <div>
                <table class="table">
                <thead class="thead-dark">
                     <tr>
                        <th scope="col">#</th>
                        <th scope="col">
                          <FormattedMessage id="image"/>
                        </th>
                        <th scope="col">
                          <FormattedMessage id="name"/>
                        </th>
                        <th scope="col">
                          <FormattedMessage id="description"/>
                        </th>
                        <th scope="col">
                          <FormattedMessage id="height"/>
                        </th>
                        <th scope="col">
                          <FormattedMessage id="weight"/>
                        </th>
                        <th scope="col">
                          <FormattedMessage id="type"/>
                        </th>
                    </tr>
                </thead>
                <tbody>
                {movie.map((pelis) => (
                        <tr>
                            <th scope="row">{pelis.id}</th>
                            <td><img src={pelis.ThumbnailImage}></img></td>
                            <td>{pelis.name}</td>
                            <td>{pelis.description}</td>
                            <td>{pelis.height}</td>
                            <td>{pelis.weight}</td>
                            <td>
                              {pelis.type.map((t) =>{
                                return (
                                  <span class="badge badge-secondary">{t}</span>
                                )
                              })}
                            </td>
                        </tr>
                ))}
                </tbody>
                </table>
            </div>
        </main>
    );
};
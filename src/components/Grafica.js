import React, { useEffect, useState } from "react";
import * as d3 from "d3";

export default function Grafica(){

    const [movie, setMovie] = useState([]);

    useEffect(() => {

        if (!navigator.onLine) {
            if (localStorage.getItem("movie") === null) {
              setMovie("Loading...");
            } else {
              setMovie(JSON.parse(localStorage.getItem("movie")));
            }
        } else {

            const url = "https://gist.githubusercontent.com/jhonatan89/e379fadf8ed0f5381a2d8f8f3dea90c3/raw/e2bc20df02828d297f99558551e37959ac97a6f8/pokemon-es.json";

            fetch(url)
            .then((res) => res.json())
            .then((res) => {
              setMovie(res);
              localStorage.setItem("movie", JSON.stringify(res));
              console.log(res);

              const canvas = d3.select("#canvas");

        const width = 700;
        const height = 500;
        const margin = { top:10, left:60, bottom: 40, right: 10};
        const iwidth = width - margin.left - margin.right;
        const iheight = height - margin.top -margin.bottom;

        const svg = canvas.append("svg");
        svg.attr("width", width);
        svg.attr("height", height);

        let g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        const y = d3.scaleLinear() 
        .domain([0, 1200])
        .range([iheight, 0]);

        const x = d3.scaleBand()
        .domain(res.map(d => d.name) ) 
        .range([0, iwidth])
        .padding(0.4); 

        const bars = g.selectAll("rect").data(res);

        bars.enter().append("rect")
        .attr("class", "bar")
        .style("fill", "purple")
        .attr("x", d => x(d.name))
        .attr("y", d => y(d.height))
        .attr("height", d => iheight - y(d.height))
        .attr("width", x.bandwidth())  

        g.append("g")
        .classed("x--axis", true)
        .call(d3.axisBottom(x))
        .attr("transform", `translate(0, ${iheight})`);  

        g.append("g")
        .classed("y--axis", true)
        .call(d3.axisLeft(y));

          });
        }
      

    },[]);

    return(
        <div>
            <div id="canvas"></div>
        </div>
    );
}
import React, { useState, useEffect } from "react";
import {
  Wrapper,
  Container,
  Heading,
  InputContainer,
  Input,
  Form,
} from "./Stylesheet";
import { Link } from "react-router-dom";
import axios from "axios";
import {v4 as uuidv4} from "uuid"

export default function Homepage() {
  const [genre, setGenre] = useState("");
  const [artist, setArtist] = useState("");
  const [mood, setMood] = useState("");
  const [response, setResponse] = useState([]);
  const [artistName, setArtistName] = useState("")
  const [title, setTitle] = useState("")
  const [request, setRequest] = useState("")

  



  function getPlaylist(e) {
    e.preventDefault();
    const request = {
      method: "POST",
      url: "http://localhost:5200/playlists",
      data: {
        count: 10,
        genre: genre,
        artist: artist,
        mood: mood,
      },
    };
    axios(request)
      .then((res) => {
        console.log(res.data)
        console.log(res.data.message[0].message[0].content);
        setResponse(JSON.parse(res.data.message[0].message.content));
        setTitle(JSON.parse(res.data.message[0].message.content).title)
        setArtistName(JSON.parse(res.data.message[0].message.content).artist)
        if(title){
          getPlaylistFromDeezer()
        }
      })
      .catch((error) => error.code);
  }

console.log(response)

function getPlaylistFromDeezer(){
  // e.preventDefault()
  const options = {
    method: 'GET',
    url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
    params: {q: `${title},${artist}`},
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_DEEZER_API_KEY,
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
    }
  };
  const response = axios.request(options);
  response
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => console.log(error));
}

// useEffect(() => {
//   getPlaylistFromDeezer()
// },[title])
  
  return (
    <Wrapper display="grid" columns="10% 1fr" color="#F0ECE5">
      <Container color="#444">
        <header
          style={{
            width: "10%",
            height: 75,
            background: "#e8e8e8",
            margin: "0px !important",
            position: "absolute",
            top: 0,
            left: 0,
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1 style={{ color: "#444444" }}>f</h1>
        </header>
        <div className="icon_container">
          <span className="material-symbols-outlined nav_icons filled-icon">
            home
          </span>
          <Link to="/assistant">
            <span className="material-symbols-outlined nav_icons">
              smart_toy
            </span>
          </Link>
          <Link to="/messages">
            <span className="material-symbols-outlined nav_icons">chat</span>
          </Link>
          <Link to="/account">
            <span className="material-symbols-outlined nav_icons">person</span>
          </Link>
        </div>
      </Container>
      <Container color="#e8e8e8">
        <InputContainer>
          <Heading color="dimgrey">Home</Heading>
          <span
            style={{ color: "dimgrey" }}
            className="material-symbols-outlined"
          >
            home
          </span>
        </InputContainer>
        <Form action="">
          <Input type="text" />
          <span
            style={{ color: "mediumslateblue", paddingLeft: 16 }}
            className="material-symbols-outlined input-icon"
          >
            send
          </span>
        </Form>
        <h4>listen while you chat, your some shit</h4>
        <label htmlFor="">powered by deezer</label>
        <form onSubmit={getPlaylist} action="">
          <input
            type="text"
            name="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="Genre"
          />
          <input
            type="text"
            name="artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            placeholder="Artist"
          />
          <input
            type="text"
            name="mood"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            placeholder="Mood"
          />
          <button>Fetch</button>
        </form>
        <div>
          <ul>
            {response.map((data) => (
              <li onClick={getPlaylistFromDeezer}>{data.artist} {data.title}</li>
            ))}
          </ul>
        </div>
      </Container>
      
    </Wrapper>
  );
}

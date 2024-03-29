import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import "./Home.css";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [settingsToggle, setSettingsToggle] = useState(true);
  const [query, setQuery] = useState("");
  const [content, setContent] = useState([]);

  const [genres, setGenres] = useState({
    fantasy: "",
    mystery: "",
    romance: "r",
    thriller: "",
    scienceFiction: "",
  });

  const selectToggle = () => {
    setSettingsToggle((prev) => !prev);
  };

  function toggle() {
    setToggleMenu((prev) => !prev);
  }

  function getNews(e) {
    e.preventDefault();
    axios
      .get(
        `https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=350b02b4b23c4878bd14f15b8e989922`
      )
      .then((data) => {
        console.log(data.data);
        setContent(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div
      className="grid_container"
      style={
        toggleMenu
          ? { gridTemplateColumns: "90% 10%" }
          : { gridTemplateColumns: "0% 100%" }
      }
    >
      <div className="settings">
        <form style={{ paddingTop: 150 }} action="">
          <div className="menu_header">
            <span
              style={toggleMenu ? { display: "block" } : { display: "none" }}
              onClick={toggle}
              className="material-symbols-outlined close"
            >
              close
            </span>
          </div>
          <div style={{ width: "95%", margin: "0px auto" }}>
            <ul onClick={selectToggle} className="settings_header">
              <li className="name_plate">Genre</li>
              <span className="material-symbols-outlined">swipe_vertical</span>
            </ul>
            <ul
              className="settings-select"
              style={
                settingsToggle ? { display: "none" } : { display: "block" }
              }
              onChange={(e) => setGenres(e.target.value)}
            >
              <li
                name="fantasy"
                value={genres.fantasy}
                onChange={(e) => setGenres(e.target.value)}
                className="option"
              >
                Fantasy
              </li>
              <li
                name="scienceFiction"
                value={genres.scienceFiction}
                className="option"
              >
                Science Fiction
              </li>
              <li
                name="mystery"
                onClick={(e) => setGenres(e.currentTarget.value)}
                value={genres.mystery}
                className="option"
              >
                Mystery
              </li>
              <li
                name="romance"
                onChange={(e) => console.log(setGenres(e))}
                value={genres.romance}
                className="option"
              >
                Romance
              </li>
              <li
                name="thriller"
                onClick={(e) => setGenres(e.currentTarget.value)}
                value={genres.thriller}
                className="option"
              >
                Thriller
              </li>
            </ul>
            <textarea name="" id="" cols="30" rows="5"></textarea>
          </div>
          <div className="btn">
            <label htmlFor="">create</label>
            <span className="material-symbols-outlined">palette</span>
          </div>
        </form>
      </div>
      <div
        className="page"
        style={
          toggleMenu
            ? {
                background: "#e0e0e0",
                // filter: "blur(9.5px)",
                color: "#e0e0e0",
                padding: "0px !important",
                margin: "0px !important",
              }
            : { background: "#eee7d7", paddingTop: 0, color: "#934e4e" }
        }
      >
        <span
          style={!toggleMenu ? { display: "block" } : { display: "none" }}
          onClick={toggle}
          className="material-symbols-outlined open"
        >
          menu
        </span>
        <form onSubmit={getNews} style={{display: "flex"}} action="">
          <input
            style={{ width: "100%", borderRadius: 25 }}
            name="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search"
            className="search_input"
          />
          <button className="material-symbols-outlined search_btn" type="" onClick={getNews}>search</button>
        </form>
      </div>
    </div>
  );
};

export default Home;

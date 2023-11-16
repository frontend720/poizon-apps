import { useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import app from "./config";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { onAuthStateChanged, getAuth } from "firebase/auth";

setupIonicReact();

// const App = () => (
//   <>
//     <Auth />
//   </>
// );

const App = () => {
  const auth = getAuth(app);

  const [authObj, setAuthObj] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (obj) => {
      console.log(obj)
      setAuthObj(obj)
    });
  }, []);

  return (
    <>
    {authObj === null ? <Auth /> : <Home />}
      {/* <Auth /> */}
    </>
  );
};

export default App;

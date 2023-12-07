import { Redirect, Route } from "react-router-dom";
import "./App.css";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
  IonItem,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  cogOutline,
  colorWandOutline,
  ellipse,
  heartOutline,
  magnetOutline,
  square,
  triangle,
  colorPaletteOutline,
  
} from "ionicons/icons";

import Tab1 from "./pages/Tab1";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";
import ImageCreation from "./pages/ImageCreation";

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

setupIonicReact();

const App = () => (
  <IonApp>
    <IonReactRouter>
      <div className="nav-container">
        <IonTabs>
          <IonRouterOutlet>
           
            <Route exact path="/tab1">
              <Tab1 />
            </Route>
            <Route path="/tab2">
              <ImageCreation />
            </Route>
            <Route  path="/tab3">
              <Tab2 />
            </Route>
            <Route path="/tab4">
              <Tab3 />
            </Route>
            <Route exact path="/">
              <Redirect to="/tab1" />
            </Route>
          </IonRouterOutlet>

          <IonTabBar
            // style={{ width: "90%", margin: "16px auto" }}
            slot="bottom"
            mode="ios"
            translucent="true"
          >
            <IonTabButton tab="tab1" href="/tab1">
            <span style={{fontSize: 30}} class="material-symbols-rounded">question_answer</span>
              <IonLabel>Converse</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" href="/tab3">
              {/* <IonIcon aria-hidden="true" icon={heartOutline} /> */}
              <span style={{fontSize: 30}} class="material-symbols-rounded">palette</span>
              <IonLabel>Create</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab4" href="/tab4">
            <span style={{fontSize: 30}} class="material-symbols-rounded">settings_heart</span>
              <IonLabel>Customize</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </div>
    </IonReactRouter>
  </IonApp>
);

export default App;

// MindCraft CreativAI PicturePoet VisuallVirtuoso TextPix ImaginAI

// magnetOutline to represent accuracy of results

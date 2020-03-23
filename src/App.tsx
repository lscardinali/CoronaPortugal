import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle, helpBuoy, barChartOutline, newspaper, albums, helpBuoyOutline, newspaperOutline, albumsOutline } from 'ionicons/icons';
import SummaryPage from './pages/summary/SummaryPage';
import EvolutionPage from './pages/evolution/EvolutionPage';
import Tab2 from './pages/Tab2';
import Help from './pages/Help';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/summary" component={SummaryPage} exact={true} />
          <Route path="/tab2" component={Tab2} exact={true} />
          <Route path="/help" component={Help} />
          <Route path="/evolution" component={EvolutionPage} />
          <Route path="/" render={() => <Redirect to="/summary" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="summary" href="/summary">
            <IonIcon icon={albumsOutline} />
            <IonLabel>Sumário</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={newspaperOutline} />
            <IonLabel>Notícias</IonLabel>
          </IonTabButton>
          <IonTabButton tab="evolution" href="/evolution">
            <IonIcon icon={barChartOutline} />
            <IonLabel>Evolução</IonLabel>
          </IonTabButton>
          <IonTabButton tab="help" href="/help">
            <IonIcon icon={helpBuoyOutline} />
            <IonLabel>Ajuda</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;

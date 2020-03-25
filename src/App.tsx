import React, { useState } from 'react';
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
import { helpBuoy, barChartOutline, newspaper, albums, helpBuoyOutline, newspaperOutline, albumsOutline, barChart } from 'ionicons/icons';
import SummaryPage from './pages/summary/SummaryPage';
import EvolutionPage from './pages/evolution/EvolutionPage';
import NewsPage from './pages/news/NewsPage';
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

const App: React.FC = () => {

  const [selectedTab, setSelectedTab] = useState<string>('summary');

  return (<IonApp>
    <IonReactRouter>
      <IonTabs onIonTabsDidChange={(event) => setSelectedTab(event.detail.tab)}>
        <IonRouterOutlet>
          <Route path="/summary" component={SummaryPage} exact={true} />
          <Route path="/news" component={NewsPage} exact={true} />
          <Route path="/help" component={Help} />
          <Route path="/evolution" component={EvolutionPage} />
          <Route path="/" render={() => <Redirect to="/summary" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom" translucent={true}>
          <IonTabButton tab="summary" href="/summary">
            <IonIcon icon={selectedTab === 'summary' ? albums : albumsOutline} />
            <IonLabel>Sumário</IonLabel>
          </IonTabButton>
          <IonTabButton tab="news" href="/news">
            <IonIcon icon={selectedTab === 'news' ? newspaper : newspaperOutline} />
            <IonLabel>Notícias</IonLabel>
          </IonTabButton>
          <IonTabButton tab="evolution" href="/evolution">
            <IonIcon icon={selectedTab === 'evolution' ? barChart : barChartOutline} />
            <IonLabel>Evolução</IonLabel>
          </IonTabButton>
          <IonTabButton tab="help" href="/help">
            <IonIcon icon={selectedTab === 'help' ? helpBuoy : helpBuoyOutline} />
            <IonLabel>Ajuda</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
  );
}

export default App;

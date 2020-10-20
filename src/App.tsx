import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonBadge,
  IonContent,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonSplitPane,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { appPages } from './models/app-navigation';
import SummaryPage from './pages/summary/SummaryPage';
import EvolutionPage from './pages/evolution/EvolutionPage';
import NewsPage from './pages/news/NewsPage';
import Help from './pages/help/Help';

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
import Menu from './pages/Menu';

const App: React.FC = () => {

  const [selectedTab, setSelectedTab] = useState<string>('summary');

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonContent id="main">
            <IonTabs onIonTabsDidChange={(event) => setSelectedTab(event.detail.tab)}>
              <IonRouterOutlet id="main">
                <Route path="/summary" component={SummaryPage} exact={true} />
                <Route path="/news" component={NewsPage} exact={true} />
                <Route path="/help" component={Help} />
                <Route path="/evolution" component={EvolutionPage} />
                <Route path="/" render={() => <Redirect to="/summary" />} exact={true} />
              </IonRouterOutlet>
              <IonTabBar translucent={true} slot="bottom" class="ion-hide-lg-up"  >
                {appPages.map((appPage) => {
                  return (
                    <IonTabButton tab={appPage.id} href={appPage.url} key={appPage.id}>
                      <IonIcon ios={(selectedTab === appPage.id) ? appPage.iosSelectedIcon : appPage.iosIcon} md={appPage.mdIcon} />
                      <IonLabel>{appPage.title}</IonLabel>
                    </IonTabButton>
                  );
                })}
              </IonTabBar>
            </IonTabs>
          </IonContent>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
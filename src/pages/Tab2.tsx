import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCol, IonGrid, IonRow, IonProgressBar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Notícias</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Notícias</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid fixed><IonRow><IonCol><TwitterTimelineEmbed
          sourceType="profile"
          screenName="dgsaude"
          theme={window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : null}
          transparent
          noFooter
          noHeader
          noBorders
          placeholder={<IonProgressBar type="indeterminate" />}
          options={{ theme: "dark" }}
        /></IonCol></IonRow></IonGrid>


      </IonContent>
    </IonPage>
  );
};

export default Tab2;

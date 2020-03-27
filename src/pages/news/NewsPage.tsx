import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCol, IonGrid, IonRow, IonProgressBar } from '@ionic/react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import ReactGA from 'react-ga';
import '../Common.css';

const NewsPage: React.FC = () => {

  useEffect(() => {
    ReactGA.pageview("News");
  }, [])

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>Notícias</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <IonHeader collapse="condense" translucent={true}>
          <IonToolbar>
            <IonTitle size="large">Notícias</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid fixed>
          <IonRow>
            <IonCol>
              <TwitterTimelineEmbed
                sourceType="profile"
                screenName="dgsaude"
                theme={window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : null}
                transparent
                noFooter
                noHeader
                noBorders
                placeholder={<IonProgressBar type="indeterminate" />}
                options={{ theme: "dark" }}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default NewsPage;

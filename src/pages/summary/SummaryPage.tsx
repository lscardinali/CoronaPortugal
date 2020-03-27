import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonToast, IonRefresher, IonRefresherContent } from '@ionic/react';
import SummaryCards from './components/SummaryCards';
import { fetchReadings, fetchCachedReadings } from '../../services/network';
import { Reading } from '../../models/reading';
import './SummaryPage.css';
import { Plugins } from '@capacitor/core';
import ReactGA from 'react-ga';
const { Storage } = Plugins;

const SummaryPage: React.FC = () => {

  const [reading, setReading] = useState<Reading>();
  const [showDataToast, setShowDataToast] = useState(false);
  const [showUpdating, setShowUpdating] = useState(false);
  const [showHomeScreenToast, setShowHomeScreenToast] = useState(false);

  useEffect(() => {
    ReactGA.pageview("Summary");
    checkForFirstTime();
    checkForAddToHome();
    getSummary();
  }, [])

  const doRefresh = async (event: CustomEvent) => {
    await getSummary();
    event.detail.complete();
  }

  const checkForFirstTime = async () => {
    const ret = await Storage.get({ key: 'firstAccess' });
    if (ret.value === null) {
      setShowDataToast(true);
    }
    await Storage.set({ key: 'firstAccess', value: 'false' })
  }

  const checkForAddToHome = async () => {
    const firstAccess = await Storage.get({ key: 'firstAccess' });
    const homeScreen = await Storage.get({ key: 'homeScreen' });
    if (firstAccess.value === 'false' && homeScreen.value === null) {
      setShowHomeScreenToast(true);
    }
    await Storage.set({ key: 'homeScreen', value: 'true' })
  }

  const getSummary = async () => {
    setShowUpdating(true);
    let cachedReadings = await fetchCachedReadings();
    if (cachedReadings.length > 0) {
      setReading(cachedReadings.find(reading => reading.lastRegister === "Sim"))
    }
    let readings = await fetchReadings();
    setReading(readings.find(reading => reading.lastRegister === "Sim"));
    setShowUpdating(false);
  }

  return (
    <IonPage id="summary-page">

      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>Sumário</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent>
          </IonRefresherContent>
        </IonRefresher>
        <IonHeader collapse="condense" translucent={true}>
          <IonToolbar>
            <IonTitle size="large">Sumário</IonTitle>
          </IonToolbar>
        </IonHeader>

        <SummaryCards reading={reading} updating={showUpdating} />
        <IonToast
          isOpen={showDataToast}
          onDidDismiss={() => setShowDataToast(false)}
          message="CoronaPT não guarda nenhuma informação pessoal e apenas usa fontes oficiais (DGS)"
          buttons={[
            {
              text: 'Ok',
              role: 'cancel',
            }
          ]}
        />
        <IonToast
          isOpen={showHomeScreenToast}
          onDidDismiss={() => setShowHomeScreenToast(false)}
          message="Estás a gostar do CoronaPT? Considere adicioná-lo á vossa Home Screen"
          buttons={[
            {
              text: 'Ok',
              role: 'cancel',
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};


export default SummaryPage;

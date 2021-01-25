import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonToast, IonRefresher, IonRefresherContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel, IonButton, IonCol, IonGrid, IonRow, IonIcon, IonSpinner, IonAlert } from '@ionic/react';
import { fetchReadings, fetchCachedReadings } from '../../services/network';
import { Reading } from '../../models/reading';
import './SummaryPage.css';
import { Plugins } from '@capacitor/core';
import ReactGA from 'react-ga';
import { informationCircle } from 'ionicons/icons';
import moment from 'moment';
const { Storage, Clipboard } = Plugins;

const SummaryPage: React.FC = () => {

  //const [readings, setReadings] = useState<Reading[]>();
  const [lastReading, setLastReading] = useState<Reading>();
  const [showDataToast, setShowDataToast] = useState(false);
  const [showUpdating, setShowUpdating] = useState(false);
  const [showDonation, setShowDonation] = useState(false);
  const [showDonationAlert, setShowDonationAlert] = useState(false);
  const [showHomeScreenToast, setShowHomeScreenToast] = useState(false);

  useEffect(() => {
    ReactGA.pageview("Summary");
    checkForFirstTime();
    checkForAddToHome();
    getSummary();

    // const script = document.createElement('script');

    // script.src = "https://www.onclickalgo.com/a/display.php?r=4082335";
    // script.async = true;

    // const element = document.getElementById("ad-cash");
    // if (element) {

    //   element.appendChild(script);
    // }

  }, [])
  const doRefresh = async (event: CustomEvent) => {
    await getSummary();
    event.detail.complete();
  }

  const checkForFirstTime = async () => {
    const firstAccess = await Storage.get({ key: 'firstAccess' });
    const dismissDonation = await Storage.get({ key: 'dismissDonation' });
    if (firstAccess.value === null) {
      setShowDataToast(true);
    } else if (firstAccess.value && dismissDonation.value === null) {
      setShowDonation(true)
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
      //setReadings(cachedReadings);
      setLastReading(cachedReadings[cachedReadings.length - 1])
    }
    let readings = await fetchReadings();
    //setReadings(readings);
    setLastReading(readings[readings.length - 1])
    setShowUpdating(false);
  }

  const summaryCard = (title: string,
    value: string | number | null | undefined,
    newValue: string | number | null | undefined,
    color = "",
    isPercent = false) => (
    <IonCard>
      <IonCardHeader mode="ios">
        <IonCardTitle color={color}>
          {value && (isPercent ? value.toLocaleString() + ' %' : value.toLocaleString())}
          <p style={{ marginBlockStart: "0.2em", fontSize: 12 }}>{newValue && (newValue.toString().indexOf('-') !== -1 ? '' : '+') + newValue.toLocaleString()}</p>
        </IonCardTitle>
        <IonCardSubtitle color={color} mode="ios">
          {title}
        </IonCardSubtitle>
      </IonCardHeader>
    </IonCard>
  );

  const donationCard = () => (
    <IonRow>
      <IonCol>
        <IonCard>
          <IonItem>
            <IonIcon icon={informationCircle} color="primary" slot="start" />
            <IonLabel class="ion-text-wrap">
              Se a App está a lhe ser útil, considere ajudar com os custos de servidor com o valor que quiser
            </IonLabel>
          </IonItem>
          <IonGrid class="ion-no-padding">
            <IonRow>
              <IonCol>
                <IonButton fill="clear" onClick={() => setShowDonationAlert(true)}>
                  Enviar por MBWAY
                </IonButton>
              </IonCol>
              <IonCol>
                <IonButton fill="clear" onClick={() => {
                  Storage.set({ key: "dismissDonation", value: "true" });
                  setShowDonation(false);
                }}>
                  Não
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCard>
      </IonCol>
    </IonRow>
  )

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>Sumário</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true} class="ion-padding">
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent>
          </IonRefresherContent>
        </IonRefresher>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Sumário</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid fixed>
          <IonRow>
            <IonCol className="ion-text-center">
              {showUpdating ?
                <IonLabel>
                  <IonSpinner name="dots" color="primary" />
                  <p>Atualizando dados...</p>
                </IonLabel>
                : <IonLabel>
                  <p>Atualizado em {moment(lastReading?.date).format('DD/MM/YYYY h:mm:ss a')} (Fonte: DGS)</p>
                </IonLabel>
              }
            </IonCol>
          </IonRow>
          {showDonation && donationCard()}
          <IonRow>
            <IonCol id="ad-cash">
              <script data-cfasync="false" type="text/javascript" src="https://www.onclickalgo.com/a/display.php?r=4082335"></script>

            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <h4>Totais</h4>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              {summaryCard('Activos', lastReading?.active, lastReading?.newActive, 'yellow')}
            </IonCol>
            <IonCol>
              {summaryCard('Confirmados', lastReading?.confirmed, lastReading?.newConfirmed, 'blue')}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              {summaryCard('Recuperados', lastReading?.recovered, lastReading?.newRecovered, 'success')}
            </IonCol>
            <IonCol>
              {summaryCard('Mortes', lastReading?.deaths, lastReading?.newDeaths, 'danger')}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <h4>Acompanhamento</h4>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              {summaryCard('Letalidade', lastReading?.letality, undefined, "", true)}
            </IonCol>
            <IonCol>
              {summaryCard('Em vigilância', lastReading?.onWatchCase, undefined)}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <h4>Internamento</h4>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              {summaryCard('Internados', lastReading?.internedCases, undefined)}
            </IonCol>
            <IonCol>
              {summaryCard('Internados UCI', lastReading?.uciInternedCases, undefined)}
            </IonCol>
          </IonRow>
        </IonGrid>
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
        <IonAlert
          isOpen={showDonationAlert}
          onDidDismiss={() => {
            setShowDonationAlert(false);
            Clipboard.write({
              string: "926992142"
            });
            Storage.set({ key: "dismissDonation", value: "true" });
            setShowDonation(false);
          }}
          header={'Número do MBWAY'}
          subHeader={'Foi copiado para o Clipboard'}
          message={'926 992 142'}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};


export default SummaryPage;

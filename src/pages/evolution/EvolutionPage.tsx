import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import CumulativeChart from './components/CumulativeChart';
import ReactGA from 'react-ga';

const EvolutionPage: React.FC = () => {

    useEffect(() => {
        ReactGA.pageview("Evolution");
    }, []);

    return (
        <IonPage id="main">
            <IonHeader translucent={true}>
                <IonToolbar>
                    <IonTitle>Evolução</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen={true}>
                <IonHeader collapse="condense" translucent={true}>
                    <IonToolbar>
                        <IonTitle size="large">Evolução</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <CumulativeChart />
            </IonContent>
        </IonPage>
    );
};

export default EvolutionPage;

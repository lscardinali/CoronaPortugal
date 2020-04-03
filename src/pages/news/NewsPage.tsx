import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCol, IonGrid, IonRow, IonProgressBar, IonLabel, IonList, IonItem, IonListHeader } from '@ionic/react';
import '../Common.css';
import { DgsNews } from '../../models/reading';
import { fetchNews } from '../../services/network';
import moment from 'moment';

const NewsPage: React.FC = () => {

    const [feed, setFeed] = useState<DgsNews>();
    const [showLoading, setShowLoading] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);

    useEffect(() => {
        getNews();
    }, [])

    const getNews = async () => {
        setShowLoading(true);
        setShowError(false);
        try {
            let newsFeed = await fetchNews();

            setFeed(newsFeed);
        } catch (error) {
            setShowError(true);
        }
        setShowLoading(false);
    }

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
                <IonGrid fixed>
                    <IonRow>
                        <IonCol>
                            <IonList>
                                {feed && feed.items.map((item) => <IonItem href={item.link} target="_">
                                    <IonLabel className="ion-text-wrap">
                                        <h3 color="primary">{moment(item.pubDate).format('DD/MM à\\s HH:mm')}</h3>
                                        <p>{item.title}</p>
                                    </IonLabel>
                                </IonItem>)}
                            </IonList>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default NewsPage;

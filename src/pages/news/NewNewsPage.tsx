import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCol, IonGrid, IonRow, IonProgressBar, IonLabel, IonList, IonItem, IonListHeader } from '@ionic/react';
import '../Common.css';
import Parser, { Output } from 'rss-parser';

const NewsPage: React.FC = () => {

    const [feed, setFeed] = useState<Output>();
    const [showLoading, setShowLoading] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);

    useEffect(() => {
        getNews();
    }, [])

    const getNews = () => {
        setShowLoading(true);
        setShowError(false);
        new Parser().parseURL('https://cors-anywhere.herokuapp.com/https://covid19.min-saude.pt/feed/', (err, feed) => {
            setShowLoading(false);
            if (err) {
                setShowError(true);
            } else {
                setFeed(feed);
            }
        })
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
                                {feed && feed.items?.map((item) => <IonItem>
                                    <IonListHeader><p>{item.pubDate}</p></IonListHeader>
                                    <IonLabel slot="end"><p>{item.pubDate}</p></IonLabel>
                                    <IonLabel><h2>{item.title}</h2><p>{item.contentSnippet}</p></IonLabel></IonItem>)}
                            </IonList>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default NewsPage;

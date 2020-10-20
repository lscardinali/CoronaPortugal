import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCol, IonGrid, IonRow, IonLabel, IonList, IonItem, IonRefresher, IonRefresherContent, IonSkeletonText, IonButton } from '@ionic/react';
import '../Common.css';
import { DgsNews } from '../../models/reading';
import { fetchNews } from '../../services/network';
import moment from 'moment';

interface NewsListProps {
    news: DgsNews
}

const NewsList: React.FC<NewsListProps> = ({ news }) => {
    return (
        <IonList className="rounded-list">
            {news.items.map((item) =>
                <IonItem href={item.link} target="_" key={item.title}>
                    <IonLabel className="ion-text-wrap">
                        <h3>{item.title}</h3>
                        <p>{moment(item.pubDate).format('DD/MM à\\s HH:mm')}</p>
                    </IonLabel>
                </IonItem>)}
        </IonList>
    )
}

const NewsListLoading: React.FC = () => {
    return (
        <IonList className="rounded-list">
            {Array.from(Array(8).keys()).map((key) =>
                <IonItem key={key}>
                    <IonLabel className="ion-text-wrap">
                        <IonSkeletonText animated style={{ width: '20%' }} />
                        <IonSkeletonText animated />
                    </IonLabel>
                </IonItem>
            )}
        </IonList>
    )
}

const NewsPage: React.FC = () => {

    const [feed, setFeed] = useState<DgsNews>();
    const [showLoading, setShowLoading] = useState<boolean>(true);
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

    const doRefresh = async (event: CustomEvent) => {
        await getNews();
        event.detail.complete();
    }

    return (
        <IonPage>
            <IonHeader translucent={true}>
                <IonToolbar>
                    <IonTitle>Notícias</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen={true}>
                <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                    <IonRefresherContent>
                    </IonRefresherContent>
                </IonRefresher>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Notícias</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonGrid fixed className="no-md-padding">
                    <IonRow className="no-md-padding">
                        <IonCol className="no-md-padding">
                            {showError && <div className="center-container">
                                <IonLabel>
                                    <p>Não foi possível aceder aos dados</p>
                                </IonLabel>
                                <IonButton
                                    fill="outline"
                                    onClick={(e) => getNews()}>
                                    Tentar novamente</IonButton>
                            </div>}
                            {showLoading && <NewsListLoading />}
                            {feed && <NewsList news={feed} />}
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default NewsPage;

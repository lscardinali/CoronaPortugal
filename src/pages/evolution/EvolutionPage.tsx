import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCol, IonGrid, IonRow, IonProgressBar, IonCard } from '@ionic/react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Line
} from 'recharts';
import Reading from '../../models/reading';
import moment from 'moment';
import '../summary/SummaryPage.css';
import { fetchHistory } from '../../services/firestore';

const EvolutionPage: React.FC = () => {


    const [readings, setReadings] = useState<Reading[]>([])

    useEffect(() => {
        getHistory();
    }, [])


    const getHistory = async () => {
        const history = await fetchHistory();
        console.log(history);
        setReadings(history);
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Evolução</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Evolução</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <ResponsiveContainer
                    width="100%"
                    height={400}>
                    <AreaChart
                        data={readings}
                        margin={{
                            top: 10, right: 30, left: 0, bottom: 0,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorSuspect" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f1c40f" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#f1c40f" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorConfirmed" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3880ff" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#3880ff" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        {/* <CartesianGrid strokeDasharray="5 5" /> */}
                        <XAxis dataKey="date" type="number" tickFormatter={time => moment(time).format('DD/MM')} tickCount={10} domain={['dataMin', 'dataMax']} />
                        <YAxis />
                        <Legend verticalAlign="top" height={36} />
                        <Tooltip />
                        <Area name="Suspeitos" type="monotone" dataKey="suspect" stroke="#f1c40f" fillOpacity={1} fill="url(#colorSuspect)" />
                        <Area name="Confirmados" type="monotone" dataKey="confirmed" stroke="#3880ff" fillOpacity={1} fill="url(#colorConfirmed)" />
                    </AreaChart></ResponsiveContainer>



            </IonContent>
        </IonPage>
    );
};

export default EvolutionPage;

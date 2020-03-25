import React, { useEffect, useState } from 'react';
import Reading from '../../../models/reading';
import { ResponsiveContainer, XAxis, YAxis, Legend, Tooltip, LineChart, Line } from 'recharts';
import moment from 'moment';
import { fetchHistory } from '../../../services/firestore';
import { IonSpinner, IonLabel, IonButton, IonItem, IonToggle } from '@ionic/react';
import './center.css';

const CumulativeChart: React.FC = () => {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const [readings, setReadings] = useState<Reading[]>([])
    const [showSuspect, setShowSuspect] = useState<boolean>(true)
    const [showLoading, setShowLoading] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);

    const getHistory = async () => {
        setShowLoading(true);
        try {
            setReadings(await fetchHistory());
            setShowLoading(false);
        } catch {
            setShowError(true);
            setShowLoading(false);
        }
    }

    useEffect(() => {
        getHistory();
    }, [])

    const chart = (
        <div style={{ width: "100%", height: "70%" }}>
            <ResponsiveContainer>
                <LineChart
                    data={readings}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <XAxis
                        dataKey="date"
                        type="number"
                        tickFormatter={time => moment(time).format('DD/MM')}
                        tickCount={30}
                        domain={['dataMin', 'dataMax']} />
                    <YAxis />
                    <Legend
                        verticalAlign="top"
                        height={36} />
                    <Tooltip
                        labelFormatter={time => moment(time).format('DD/MM')}
                        labelStyle={{ color: darkMode ? "white" : "black" }}
                        contentStyle={darkMode ? { backgroundColor: "#111111", borderColor: "#222222" } : undefined} />
                    {showSuspect && <Line
                        name="Suspeitos"
                        type="monotone"
                        dataKey="suspect"
                        stroke="#f1c40f"
                        fill="#f1c40f" />}
                    <Line
                        name="Confirmados"
                        type="monotone"
                        dataKey="confirmed"
                        stroke="#ff4961"
                        fill="#ff4961" />
                </LineChart>
            </ResponsiveContainer>
            <IonItem style={{ paddingTop: 16 }} color="black" lines="none">
                <IonLabel>Mostrar casos suspeitos</IonLabel>
                <IonToggle checked={showSuspect} onIonChange={e => setShowSuspect(e.detail.checked)} />
            </IonItem>
        </div>
    );


    if (showError) {
        return <div className="center-container">
            <IonLabel>
                <p>Não foi possível aceder aos dados</p>
            </IonLabel>
            <IonButton
                fill="outline"
                onClick={(e) => getHistory()}>
                Tentar novamente</IonButton>
        </div>
    } else if (showLoading) {
        return <div className="center-container">
            <IonSpinner color="primary" />
        </div>
    } else {
        return chart
    }
};

export default CumulativeChart;
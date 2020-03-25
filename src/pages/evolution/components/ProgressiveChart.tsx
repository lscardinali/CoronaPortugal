import React, { useEffect, useState } from 'react';
import Reading from '../../../models/reading';
import { ResponsiveContainer, XAxis, YAxis, Legend, Tooltip, LineChart, Line, BarChart, Bar } from 'recharts';
import moment from 'moment';
import { fetchHistory, fetchNewCases } from '../../../services/firestore';
import { IonSpinner, IonLabel, IonButton, IonItem, IonToggle } from '@ionic/react';
import './center.css';
import NewCase from '../../../models/newCase';

const ProgressiveChart: React.FC = () => {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const [readings, setReadings] = useState<NewCase[]>([])
    const [showLoading, setShowLoading] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);

    const getProgressiveCases = async () => {
        setShowLoading(true);
        try {
            setReadings(await fetchNewCases());
            setShowLoading(false);
        } catch {
            setShowError(true);
            setShowLoading(false);
        }
    }

    useEffect(() => {
        getProgressiveCases();
    }, [])

    const chart = (
        <div style={{ width: "100%", height: "70%" }}>
            <ResponsiveContainer>
                <BarChart
                    data={readings}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <XAxis
                        dataKey="date"
                        tickFormatter={time => moment(time).format('DD/MM')}
                        domain={['dataMin', 'dataMax']} />
                    <YAxis />
                    <Tooltip
                        labelFormatter={time => moment(time).format('DD/MM')}
                        labelStyle={{ color: darkMode ? "white" : "black" }}
                        contentStyle={darkMode ? { backgroundColor: "#111111", borderColor: "#222222" } : undefined} />
                    <Bar name="Confirmados"
                        dataKey="value"
                        fill="#ff4961" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );


    if (showError) {
        return <div className="center-container">
            <IonLabel>
                <p>Não foi possível aceder aos dados</p>
            </IonLabel>
            <IonButton
                fill="outline"
                onClick={(e) => getProgressiveCases()}>
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

export default ProgressiveChart;
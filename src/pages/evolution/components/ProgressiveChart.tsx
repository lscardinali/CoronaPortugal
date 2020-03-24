import React, { useEffect, useState } from 'react';
import NewCase from '../../../models/newCase';
import { ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';
import moment from 'moment';
import { fetchNewCases } from '../../../services/firestore';

const ProgressiveChart: React.FC = () => {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const [readings, setReadings] = useState<NewCase[]>([])

    const getProgressiveCases = async () => {
        const history = await fetchNewCases();
        setReadings(history);
    }

    useEffect(() => {
        getProgressiveCases();
    }, [])


    return (
        <ResponsiveContainer
            width="100%"
            height="78%">
            <BarChart
                data={readings}
                margin={{
                    top: 10, right: 30, left: 0, bottom: 0,
                }}
            >
                <XAxis dataKey="date" tickFormatter={time => moment(time).format('DD/MM')} domain={['dataMin', 'dataMax']} />
                <YAxis />
                <Tooltip labelFormatter={time => moment(time).format('DD/MM')} labelStyle={{ color: darkMode ? "white" : "black" }} contentStyle={darkMode ? { backgroundColor: "#111111", borderColor: "#222222" } : undefined} />
                <Bar name="Confirmados" dataKey="value" fill="#ff4961" />
            </BarChart></ResponsiveContainer>
    );
};

export default ProgressiveChart;

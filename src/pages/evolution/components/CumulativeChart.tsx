import React, { useEffect, useState } from 'react';
import Reading from '../../../models/reading';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Legend, Tooltip, Area } from 'recharts';
import moment from 'moment';
import { fetchHistory } from '../../../services/firestore';


const CumulativeChart: React.FC = () => {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const [readings, setReadings] = useState<Reading[]>([])

    const getHistory = async () => {
        const history = await fetchHistory();
        setReadings(history);
    }

    useEffect(() => {
        getHistory();
    }, [])


    return (
        <ResponsiveContainer
            width="100%"
            height={500}>
            <AreaChart
                data={readings}
                margin={{
                    top: 10, right: 30, left: 0, bottom: 0,
                }}
            >
                <XAxis dataKey="date" type="number" tickFormatter={time => moment(time).format('DD/MM')} tickCount={10} domain={['dataMin', 'dataMax']} />
                <YAxis />
                <Legend verticalAlign="top" height={36} />
                <Tooltip labelFormatter={time => moment(time).format('DD/MM')} labelStyle={{ color: darkMode ? "white" : "black" }} contentStyle={darkMode ? { backgroundColor: "#111111", borderColor: "#222222" } : undefined} />
                <Area name="Suspeitos" type="monotone" dataKey="suspect" stroke="#f1c40f" fill="#f1c40f" strokeWidth={4} />
                <Area name="Confirmados" type="monotone" dataKey="confirmed" stroke="#ff4961" fill="#ff4961" />
            </AreaChart></ResponsiveContainer>
    );
};

export default CumulativeChart;

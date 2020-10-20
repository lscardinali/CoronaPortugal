import axios from 'axios';
import { ArcgisResponse, Reading, DgsNews } from '../models/reading'
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

const arcgisUrl = "https://services.arcgis.com/CCZiGSEQbAxxFVh3/arcgis/rest/services/COVID_Concelhos_DadosDiariosARS_VIEW2/FeatureServer/0/query?f=json&where=ARSNome%3D%27Nacional%27&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Data%20asc&resultOffset=0&resultRecordCount=32000&resultType=standard&cacheHint=true"
const newsUrl = "https://api.rss2json.com/v1/api.json?rss_url=https://covid19.min-saude.pt/feed/"

export const fetchCachedReadings = () => Storage.get({ key: "readings" }).then((readings) => readings.value ? JSON.parse(readings.value) as Reading[] : []);

export const fetchNews = async () => (await axios.get<DgsNews>(newsUrl)).data;

export const didVisitNews = async () => (await Storage.get({ key: "didVisitNews" })).value !== null;
export const setDidVisitNews = () => Storage.set({ key: "didVisitNews", value: "true" });

export const saveReadingsToCache = (readings: Reading[]) => Storage.set({
    key: "readings",
    value: JSON.stringify(readings)
});

export const fetchReadings = async () => {
    const response = await axios.get<ArcgisResponse>(arcgisUrl);
    const readings = response.data.features.map(feature => {
        const attrs = feature.attributes;
        return {
            date: attrs["Data"],
            confirmed: attrs["ConfirmadosAcumulado"],
            newConfirmed: attrs["ConfirmadosNovos"],
            deaths: attrs["Obitos"],
            newDeaths: attrs["VarObitos"],
            recovered: attrs["Recuperados"],
            newRecovered: attrs["VarRecuperados"],
            active: attrs["Activos"],
            newActive: attrs["VarActivos"],
            letality: attrs["Letalidade"],
            onWatchCase: attrs["EmVigil"],
            internedCases: attrs["Internados"],
            uciInternedCases: attrs["InternadosUCI"],
        } as Reading
    })
    saveReadingsToCache(readings);
    readings.sort((a, b) => a.date - b.date);
    return readings;
}
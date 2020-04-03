import axios from 'axios';
import { ArcgisResponse, Reading, DgsNews } from '../models/reading'
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

const arcgisUrl = "https://services.arcgis.com/CCZiGSEQbAxxFVh3/arcgis/rest/services/COVID19Portugal_view/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=datarelatorio%20asc&resultOffset=0&resultRecordCount=1000&cacheHint=true"
const councilUrl = "https://services.arcgis.com/CCZiGSEQbAxxFVh3/arcgis/rest/services/CAOP_COVID_pontos_view2603_1/FeatureServer/0/query?f=json&where=(CasosConfirmados2603%20IS%20NOT%20NULL)%20AND%20(CasosConfirmados2703%20IS%20NOT%20NULL)&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=CasosConfirmados2703%20desc&outSR=102100&resultOffset=0&resultRecordCount=381&cacheHint=true"
const newsUrl = "https://api.rss2json.com/v1/api.json?rss_url=https://covid19.min-saude.pt/feed/"

export const fetchCachedReadings = async () => {
    const readings = await Storage.get({ key: "readings" });
    if (readings.value) {
        return JSON.parse(readings.value) as Reading[];
    }
    return [];
}

export const fetchNews = async () => {
    let response = await axios.get<DgsNews>(newsUrl);
    return response.data;
}

export const saveReadingsToCache = (readings: Reading[]) => Storage.set({
    key: "readings",
    value: JSON.stringify(readings)
});

export const fetchReadings = async () => {
    const response = await axios.get<ArcgisResponse>(arcgisUrl);
    const readings = response.data.features.map(feature => {
        const attrs = feature.attributes;
        return {
            date: attrs["datarelatorio"],
            confirmed: attrs["casosconfirmados"],
            deaths: attrs["nrobitos"],
            recovered: attrs["recuperados"],
            suspect: attrs["casossuspeitos"],
            maleCases: attrs["casosmasculino"],
            femaleCases: attrs["casosfeminino"],
            age0To10: attrs["gr_etario_0_10"],
            age10To19: attrs["gr_etario_10_19"],
            age20To29: attrs["gr_etario_20_29"],
            age30To39: attrs["gr_etario_30_39"],
            age40To49: attrs["gr_etario_40_49"],
            age50To59: attrs["gr_etario_50_59"],
            age60To69: attrs["gr_etario_60_69"],
            age70To79: attrs["gr_etario_70_79"],
            age80To89: attrs["gr_etario_80_89"],
            age90To99: attrs["gr_etario_90_99"],
            importedCases: attrs["casosimportados"],
            contactCases: attrs["casoscontacto"],
            simptomFever: attrs["sintomafebre"],
            simptomCough: attrs["sintomatosse"],
            simptomPains: attrs["sintomadores"],
            simptomPain: attrs["sintomador"],
            simptomWeakness: attrs["sintomafraqueza"],
            creationDate: attrs["CreationDate"],
            editDate: attrs["EditDate"],
            newCases: attrs["casosnovos"],
            simptomBreathing: attrs["sintomadifrespiratoria"],
            lastRegister: attrs["ultimoregisto"],
            foreignCase: attrs["Estrangeiro"],
            activeCases: attrs["CasosActivos"],
            waitingLabResults: attrs["AguardaReslab"],
            onWatchCase: attrs["ContactosVigil"],
            transmissionChains: attrs["CadeiasTransm"],
            internedCases: attrs["CasosInternados"],
            uciInternedCases: attrs["CasosInternadosUCI"],
        } as Reading
    })
    saveReadingsToCache(readings);
    readings.sort((a, b) => a.date - b.date);
    return readings.filter((reading, pos, array) => reading.suspect &&
        (!pos || reading.date !== array[pos - 1].date));
}
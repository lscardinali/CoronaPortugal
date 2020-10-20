import { albumsOutline, albums, albumsSharp, newspaperOutline, newspaper, newspaperSharp, statsChartOutline, statsChart, statsChartSharp, medicalOutline, medical, medicalSharp } from "ionicons/icons";

interface AppPage {
    id: string;
    url: string;
    iosIcon: string;
    iosSelectedIcon: string;
    mdIcon: string;
    title: string;
}

export const appPages: AppPage[] = [
    {
        id: 'summary',
        title: 'Sumário',
        url: '/summary',
        iosIcon: albumsOutline,
        iosSelectedIcon: albums,
        mdIcon: albumsSharp
    },
    {
        id: 'news',
        title: 'Notícias',
        url: '/news',
        iosIcon: newspaperOutline,
        iosSelectedIcon: newspaper,
        mdIcon: newspaperSharp
    },
    {
        id: 'evolution',
        title: 'Evolução',
        url: '/evolution',
        iosIcon: statsChartOutline,
        iosSelectedIcon: statsChart,
        mdIcon: statsChartSharp
    },
    {
        id: 'help',
        title: 'Ajuda',
        url: '/help',
        iosIcon: medicalOutline,
        iosSelectedIcon: medical,
        mdIcon: medicalSharp
    },
];
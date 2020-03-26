export interface ArcgisResponse {
    features: ArcgisFeature[];
}

export interface ArcgisFeature {
    attributes: ArcgisAttributes;
}

export interface ArcgisAttributes {
    [key: string]: any;
}

export interface Reading {
    date: number,
    confirmed: number | null,
    deaths: number | null,
    recovered: number | null,
    suspect: number | null,
    maleCases: number | null,
    femaleCases: number | null,
    age0To10: number | null,
    age10To19: number | null,
    age20To29: number | null,
    age30To39: number | null,
    age40To49: number | null,
    age50To59: number | null,
    age60To69: number | null,
    age70To79: number | null,
    age80To89: number | null,
    age90To99: number | null,
    importedCases: number | null,
    contactCases: number | null,
    simptomFever: number | null,
    simptomCough: number | null,
    simptomPains: number | null,
    simptomPain: number | null,
    simptomWeakness: number | null,
    creationDate: number,
    editDate: number,
    newCases: number | null,
    simptomBreathing: number | null,
    lastRegister: string,
    foreignCase: string;
    activeCases: number | null,
    waitingLabResults: number | null,
    onWatchCase: number | null,
    transmissionChains: number | null,
    internedCases: number | null,
    uciInternedCases: number | null,
}

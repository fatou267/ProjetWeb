export interface GeoJson {
    type: string;
    features: Array<Feature>,
}

interface Feature {
    type: string;
    geometry: Geometry;
    properties: Properties;
}

interface Geometry {
    type: string;
    coordinates: number[];
}

interface Properties {
    title: string;
    description: string;
}
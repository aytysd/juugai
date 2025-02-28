"use client";

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './map.css'

import { useDisplayDataContext } from '@/providers/SelectedDataProvider';
import { useSelectedTimingContext } from '@/providers/SelectedTimingProvider';
import { SensorData } from '@/types/sensorData';
import { Path } from '@/types/path';
import { GWGeo } from '@/constants';

export interface MapComponentProps {
    children: React.ReactNode;
}

const MapComponent: React.FC<MapComponentProps> = ({ children }) => {
    const mapRef = useRef<L.Map | null>(null);
    const markerRefs = useRef<L.Marker[]>([]);
    const circleRefs = useRef<L.Circle[]>([]);

    const predictedPathRef = useRef<L.Polyline | null>(null);
    const pathRef = useRef<L.Polyline | null>(null);
    const predictedPointRef = useRef<L.Marker | null>(null);
    const pointRef = useRef<L.Marker | null>(null);

    const { path, sensorData, predictedPath, convertXY2LatLng, getPredictedPathGeo, getPathGeo } = useDisplayDataContext();
    const { selectedTiming } = useSelectedTimingContext();

    const drawSensorData = (sensorData: SensorData) => {
        circleRefs.current.forEach(circle => circle.remove());
        markerRefs.current.forEach(marker => marker.remove());

        circleRefs.current = sensorData.map(({ distance, y, x, timestamp }) => {


            if(timestamp === selectedTiming) {

                const latLng = [convertXY2LatLng(x, y).lat, convertXY2LatLng(x, y).lon];

                const customIcon = L.icon({
                    iconUrl: './ping_blue.png',
                    iconSize: [18, 38],
                    iconAnchor: [9, 30],
                });

                const defaultIcon = new L.Icon.Default();

                const marker = L.marker(latLng, { icon: customIcon }).addTo(mapRef.current);
                // const marker = L.marker(latLng, { icon: defaultIcon }).addTo(mapRef.current);
                // const marker = L.marker(latLng).addTo(mapRef.current);
                markerRefs.current.push(marker);

                return L.circle(latLng, {
                    radius: distance,
                    color: '#FF9999',
                    fill: false,
                    fillColor: '#30f',
                    fillOpacity: 0.5
                }).addTo(mapRef.current!)
            } else {
                return null;
            }
        }
        ).filter(item => item !== null);


    }

    const drawPath = (path: Path) => {
        const latLngs = getPathGeo().map(point => [point.lat, point.lon] as [number, number]);

        if(latLngs.length > 0) {
            if (pathRef.current) {
                pathRef.current.setLatLngs(latLngs);
            } else {
                pathRef.current = L.polyline(latLngs, {
                    color: 'black',
                    weight: 3,
                    opacity: 0.7,
                }).addTo(mapRef.current);
            }

            mapRef.current.fitBounds(pathRef.current.getBounds());

        }

        if(selectedTiming) {

            const customIcon = L.icon({
                iconUrl: './ping_red.png',
                iconSize: [18, 38],
                iconAnchor: [9, 30],
            });

            const latLng = getPathGeo().map((point) => {
                if(point.timestamp === selectedTiming)
                    return [point.lat, point.lon] as [number, number];
                else 
                    return null;
            }).filter(item => item !== null);

            if (latLng.length > 0) {
                if (pointRef.current)
                    mapRef.current?.removeLayer(pointRef.current);

                pointRef.current = L.marker([latLng[0][0], latLng[0][1]], { icon: customIcon }).addTo(mapRef.current);

            }


        }

    }

    const drawPredictedPath = (predictedPath: Path) => {
        const latLngs = getPredictedPathGeo().map(point => [point.lat, point.lon] as [number, number]);

        if(latLngs.length > 0) {
            if (predictedPathRef.current) {
                predictedPathRef.current.setLatLngs(latLngs);
            } else {
                predictedPathRef.current = L.polyline(latLngs, {
                    color: 'blue',
                    weight: 3,
                    opacity: 0.7,
                }).addTo(mapRef.current);
            }

            mapRef.current.fitBounds(predictedPathRef.current.getBounds());

        }

        if(selectedTiming) {

            const customIcon = L.icon({
                iconUrl: './ping_yellow.png',
                iconSize: [18, 38],
                iconAnchor: [9, 30],
            });

            const latLng = getPredictedPathGeo().map((point) => {
                if(point.timestamp === selectedTiming)
                    return [point.lat, point.lon] as [number, number];
                else 
                    return null;
            }).filter(item => item !== null);

            if(predictedPointRef.current)
                mapRef.current?.removeLayer(predictedPointRef.current);

            if(latLng.length > 0)
                predictedPointRef.current = L.marker([latLng[0][0], latLng[0][1]], { icon: customIcon }).addTo(mapRef.current);
        }

    }

    useEffect(() => {
        if (typeof window !== 'undefined' && !mapRef.current) {
            mapRef.current = L.map('map').setView([34.64801074823137, 135.75705349445346], 19);
    // 衛星画像レイヤー

            const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            });

            const streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            });

            streets.addTo(mapRef.current);
            satellite.addTo(mapRef.current);

            // レイヤー切り替えコントロールを追加
            L.control.layers({
                "Streets": streets,
                "Satellite": satellite
            }).addTo(mapRef.current);


            // const latLng = [GWGeo.lat, GWGeo.lon];

            // const customIcon = L.icon({
            //     iconUrl: './ping.jpg',
            //     iconSize: [18, 38],
            //     iconAnchor: [19, 19],
            // });
            // const marker = L.marker(latLng, { icon: customIcon }).addTo(mapRef.current);
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
            }
        };
    }, []);

    useEffect(() => {

        if (mapRef.current && sensorData) {
            drawSensorData(sensorData);
        }
    }, [sensorData, selectedTiming]);

    useEffect(() => {
        if (mapRef.current && predictedPath) {
            drawPredictedPath(predictedPath);
        }
    }, [predictedPath, selectedTiming])

    useEffect(() => {
        if (mapRef.current && path) {
            drawPath(path);
        }
    }, [path, selectedTiming])

    return (
        <div id="map" style={{ height: '500px' }}>
            {children}
        </div>
    )

};
// とある緯度と経度にセンサーノードが置かれている。このセンサーは動物が接近するとそのノードとの距離を返す。例えば100m離れているとすれば、

export default MapComponent;

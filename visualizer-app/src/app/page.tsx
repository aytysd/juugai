"use client";

import * as webpush from 'web-push';
import SubscribeButton from './subscribeButton';
import Header from './header';


import MapComponent from "./(maps)/Map";
import DateTimeSelector from './(maps)/DateTimeUI';
import TimeSelector from './(maps)/TimeUI';
import PathAccuracyComponent from "./(maps)/PathAccuracy";
import { DisplayDataProvider } from '@/providers/SelectedDataProvider';

export default function Home() {

  return (
    <>
      <Header></Header>
      <SubscribeButton title="test" />

      <MapComponent>
        {undefined}
      </MapComponent>
      <DateTimeSelector>
        <TimeSelector>
        </TimeSelector>
      </DateTimeSelector>
      <PathAccuracyComponent />


    </>
  );
}


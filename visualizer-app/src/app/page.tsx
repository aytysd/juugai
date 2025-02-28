"use client";

import * as webpush from 'web-push';
import Header from './header';


import MapComponent from "./(maps)/Map";
import DateTimeSelector from './(maps)/DateTimeUI';
import TimeSelector from './(maps)/TimeUI';
import { DisplayDataProvider } from '@/providers/SelectedDataProvider';

export default function Home() {

  return (
    <>
      <Header></Header>

      <MapComponent>
        {undefined}
      </MapComponent>
      <DateTimeSelector>
        <TimeSelector>
        </TimeSelector>
      </DateTimeSelector>


    </>
  );
}


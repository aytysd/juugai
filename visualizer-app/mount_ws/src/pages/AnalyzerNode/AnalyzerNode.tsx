import React, { useState }  from 'react';

import BaseGraphComponent from './(BaseGraph)/BaseGraphComponent';
import SensorNodesComponent from './(SensorNode)/SensorNodesComponent';
import AnimalPathComponent from './(Path)/AnimalPathComponent';
import DateTimeSelector from './(DateTimeUI)/DateTimeUI';
import TimeSelector from './(DateTimeUI)/TimeUI';
import { SelectedDataProvider } from '@/src/providers/SelectedDataProvider';
import { DateTimeListProvider } from '@/src/providers/DateTimeListProvider';
import { SelectedTimingProvider } from '@/src/providers/SelectedTimingProvider';

const AnalyzerNode = (): JSX.Element => {

  const data = [
    { x: 1, y: 80 },
    { x: 2, y: 3 },
    { x: 3, y: 5 },
    { x: 4, y: 4 },
    { x: 5, y: 6 },
  ];

  const onAnalyze = (slectedFile: string): void => {

  }; 

  return (
    <DateTimeListProvider>
      <SelectedDataProvider>
        <SelectedTimingProvider>
        <DateTimeSelector onAnalyze={onAnalyze}>
          <TimeSelector>
          </TimeSelector>
          <BaseGraphComponent width={1000} height={1000} padding={10} data={data}>
            <SensorNodesComponent>
              {undefined}
            </SensorNodesComponent>
            <AnimalPathComponent>
              {undefined}
            </AnimalPathComponent>
          </BaseGraphComponent>
          </DateTimeSelector>
        </SelectedTimingProvider>
      </SelectedDataProvider>

    </DateTimeListProvider>
  );

}


export default AnalyzerNode;
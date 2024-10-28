"use client";

import React from 'react';

import { DateTimeListProvider } from '@/providers/DateTimeListProvider';
import { SelectedTimingProvider } from '@/providers/SelectedTimingProvider';
import { DisplayDataProvider } from '@/providers/SelectedDataProvider';

export default function Layout({ children } : { children: React.ReactNode }) {


  const onAnalyze = (slectedFile: string): void => {

  }; 

  return (
    <DateTimeListProvider>
      <DisplayDataProvider>
        <SelectedTimingProvider>
            {children}
        </SelectedTimingProvider>
      </DisplayDataProvider>
    </DateTimeListProvider>
  );

}


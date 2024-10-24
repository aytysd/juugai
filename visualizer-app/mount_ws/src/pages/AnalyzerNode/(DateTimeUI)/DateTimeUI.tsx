import * as fs from 'fs';
import * as path from 'path';
import React, { useState, useEffect } from "react";

import type { SensorData } from '../(SensorNode)/SensorNodesComponent';
import type { Path } from '../(Path)/AnimalPathComponent';

import { useDateTimeContext } from '@/src/providers/DateTimeListProvider';
import { useSelectedDataContext } from '@/src/providers/SelectedDataProvider';

interface DateTimeSelectorProps {
  children?: React.ReactNode;
  onAnalyze: (selectedFile: string) => void;
}



const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({ children, onAnalyze }) => {

  const { isLoading, list, refreshList } = useDateTimeContext();
  const { update } = useSelectedDataContext();


  useEffect(() => {
    // ここにページロード時に実行したいコードを書きます
    // console.log('ページがロードされました');

    // データフェッチの例
    refreshList();
  }, []); // 空の依存配列


  const handleRefresh = () => {
    refreshList();
  };

  const handleSelect = (datetime: string) => {
    update(datetime);
  };

  console.log(list);



  return (
      <div>
        {children}
        <h2>ファイルリスト</h2>
        <ul>
          { list.length !== 0 &&
          list.map((datetime, index) => (
            <li
              key={index}
              onClick={() => handleSelect(datetime)}
              style={{
                cursor: 'pointer',
                // backgroundColor: datetime === selectedFile ? '#e0e0e0' : 'transparent'
              }}
            >
              {datetime}
            </li>
          ))}
        </ul>
        <button
          onClick={handleRefresh}
        >
          更新
        </button>
      </div>

  );
};


export default DateTimeSelector;
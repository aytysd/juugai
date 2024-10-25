import moment from 'moment';

import { Point } from '@/components/cordinate/OrthCord.js';

export type PathDataRow = {
    timestamp: string;
    x: number;
    y: number;
};


export type PathData = PathDataRow[];
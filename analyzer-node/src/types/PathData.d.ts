import moment from 'moment';

import { Point } from '@/components/cordinate/OrthCord.js';

export type PathDataRow = {
    timestamp: moment.Moment;
    p: Point;
};


export type PathData = PathDataRow[];
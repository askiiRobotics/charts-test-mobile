/**
 * 
 */
'use strict';

import _ from 'lodash';
import { financialService } from '../services';

const _monthGroup = Symbol('monthGroup');
const _monthMap = Symbol('monthMap');

export default class userFinancialInfo {

    // group daily amounts into a month amount
    static async getUserTotalSavings (
        from,
        to,
    ) {
        const userSavings = await financialService.getUserTotalSavings(
            from,
            to,
        );

        _.chain(userSavings.data.totalSavings.edges)
        .groupBy(this._monthGroup)
        .toPairs()
        .map(this._monthMap);
    }

    [_monthGroup](obj) {
        return obj.date.substring(0, 7); // sinse date format is 'YYYY-MM-DD' it is a fastest method
    }

    [_monthMap](pair) {
        const month = pair[0];
        const value = pair[1].reduce((accumulator, obj) => accumulator + obj.amount, 0); 
        return {
            month,
            value,
        };
    }
}
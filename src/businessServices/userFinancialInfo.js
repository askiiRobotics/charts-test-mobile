/**
 * 
 */
'use strict';

import _ from 'lodash';
import { financialService } from '../services';

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

        const result = _.chain(userSavings.data.totalSavings.edges)
                        .groupBy(obj => obj.date.substring(0, 7))
                        .toPairs()
                        .map(this._monthMap)
                        .value();
        
        // TODO: add empty nodes for missed months in reply

        return result;
    }

    static _monthGroup (obj) {
        return obj.date.substring(0, 7); // sinse date format is 'YYYY-MM-DD' it is a fastest method
    }

    static _monthMap(pair) {
        const month = pair[0];
        const value = pair[1].reduce((accumulator, obj) => accumulator + obj.amount, 0); 
        return {
            month,
            amount: value,
        };
    }
}
/**
 * Service for obtaining user's financial information
 */
'use strict';

import axios from '../axios';

export default class financialService {
    static getUserTotalSavings(
        from,
        to,
    ) {
        // TODO: add check for internet status

        return axios.post('get-total-savings', {
            from,
            to,
        }).then(response => response.data);
    }
}
/**
 * here we have an axios configs and entry point for mocked data via axios-mock-adapter:
 *
 * also here can be added some info about device, for example:
 * import DeviceInfo from 'react-native-device-info';
 * ...
 * instance.defaults.headers.common['X-Device-Id'] = DeviceInfo.getUniqueID();
 */
'use strict';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { config } from '..';
import answer from './reply';

const instance = axios.create();
instance.defaults.baseURL = config.SERVER_BASE_URL;
instance.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
instance.defaults.headers.common.Accept = 'application/json, text/plain, */*';

var mock = new MockAdapter(instance);
mock.onGet('/get-financial-info').reply(200, answer);

export { instance as default };

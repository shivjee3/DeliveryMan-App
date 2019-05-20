import fetchival from 'fetchival';
import _ from 'lodash';

import {store} from '../Session/Store';
import apiConfig from './Config';
import base64 from 'react-native-base64'



const endPoints = {
	authenticate: '/salesman/login',
	getRetailers: '/saleson/getRetailerRoutewise',
	orderDelivered:'/saleson/updateOrderStatus',
	//getCustomerInfo:'/saleson/getRetailerInfo',
	getRetailerOrders: '/saleson/getDistOrders',
	orderDetails: '/saleson/orderDetails',
};

export const authenticate = (userName, password) => fetchApi(endPoints.authenticate, {}, 'post', {
	Authorization: "Basic "+ base64.encode(userName + ":" + password),
});
export const getRetailers = payload => fetchApi(endPoints.getRetailers, payload, 'get');
//export const getCustomerInfo = payload => fetchApi(endPoints.getCustomerInfo, payload, 'get');
export const getRetailerOrders = payload => fetchApi(endPoints.getRetailerOrders, payload, 'get');
export const orderDelivered = payload => fetchApi(endPoints.orderDelivered, payload, 'post');
export const orderDetails = payload => fetchApi(endPoints.orderDetails, payload, 'get');

export const exceptionExtractError = (exception) => {
	if (!exception.Errors) return false;
	let error = false;
	const errorKeys = Object.keys(exception.Errors);
	if (errorKeys.length > 0) {
		error = exception.Errors[errorKeys[0]][0].message;
	}
	return error;
};

export const fetchApi = (endPoint, payload = {}, method = 'get', headers = {}) => {
	const accessToken = store.getState().session.access_token;
	return fetchival(`${apiConfig.url}${endPoint}`, {
		headers: _.pickBy({
			
			...(accessToken ? {
				Authorization: `Bearer ${accessToken}`,
			} : {
				'Client-ID': apiConfig.clientId,
			}),
			...headers,
		}, item => !_.isEmpty(item)),
	})[method.toLowerCase()](payload)
	.catch((e) => {
		throw e;
	});
};
import { Application } from 'express';
import expressStatusMonitor from 'express-status-monitor';

import Log from './Log.js';
import Locals from '../providers/Locals.js';

class StatusMonitor {
	public static mount (_express: Application) {
		Log.info('Booting the \'StatusMonitor\' middleware...');

		const api: string = Locals.config().apiPrefix;

		// Define your status monitor config
		const monitorOptions: object = {
			title: Locals.config().name,
			path: '/status-monitor',
			spans: [
				{
					interval: 1, 		// Every second
					retention: 60		// Keep 60 data-points in memory
				},
				{
					interval: 5,
					retention: 60
				},
				{
					interval: 15,
					retention: 60
				}
			],
			chartVisibility: {
				mem: true,
				rps: true,
				cpu: true,
				load: true,
				statusCodes: true,
				responseTime: true
			},
			healthChecks: [
				{
					protocol: 'http',
					host: 'localhost',
					path: '/',
					port: '4040'
				},
				{
					protocol: 'http',
					host: 'localhost',
					path: `/${api}`,
					port: '4040'
				}
			]
		};

		// Loads the express status monitor middleware
		_express.use(expressStatusMonitor(monitorOptions));
	}
}

export default StatusMonitor;

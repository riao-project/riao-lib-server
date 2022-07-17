import 'jasmine';

import { MySql5Connection, MySqlConnectionOptions } from '../../../../src/database';
import { env } from '../../../../src/environment';
import { connectionTest } from './connection';

describe('MySQL 5.7 Connection', async () => {
	const connectionOptions: MySqlConnectionOptions = {
		host: env.TEST_MYSQL5_HOST,
		port: env.TEST_MYSQL5_PORT,
		database: env.TEST_MYSQL5_DATABASE,
		credentials: {
			username: env.TEST_MYSQL5_USERNAME,
			password: env.TEST_MYSQL5_PASSWORD,
		}
	};

	await connectionTest({
		connectionType: MySql5Connection,
		connectionOptions: connectionOptions,
		expectedVersion: /^5\.7\.[0-9]+$/
	});
});

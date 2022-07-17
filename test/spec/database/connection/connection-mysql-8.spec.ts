import 'jasmine';

import { MySql8Connection, MySqlConnectionOptions } from '../../../../src/database';
import { env } from '../../../../src/environment';
import { connectionTest } from './connection';

describe('MySQL 8 Connection', async () => {
	const connectionOptions: MySqlConnectionOptions = {
		host: env.TEST_MYSQL8_HOST,
		port: env.TEST_MYSQL8_PORT,
		database: env.TEST_MYSQL8_DATABASE,
		credentials: {
			username: env.TEST_MYSQL8_USERNAME,
			password: env.TEST_MYSQL8_PASSWORD,
		}
	};

	await connectionTest({
		connectionType: MySql8Connection,
		connectionOptions: connectionOptions,
		expectedVersion: /^8\.[0-9]+\.[0-9]+$/
	});
});

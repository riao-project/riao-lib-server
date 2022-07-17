import 'jasmine';

import { Postgres14Connection, PostgresConnectionOptions } from '../../../../src/database';
import { env } from '../../../../src/environment';
import { connectionTest } from './connection';

describe('Postgres 14 Connection', async () => {
	const connectionOptions: PostgresConnectionOptions = {
		host: env.TEST_POSTGRES14_HOST,
		port: env.TEST_POSTGRES14_PORT,
		database: env.TEST_POSTGRES14_DATABASE,
		credentials: {
			username: env.TEST_POSTGRES14_USERNAME,
			password: env.TEST_POSTGRES14_PASSWORD,
		}
	};

	await connectionTest({
		connectionType: Postgres14Connection,
		connectionOptions: connectionOptions,
		expectedVersion: /^PostgreSQL 14\.[0-9]+\,/
	});
});

import 'jasmine';

import { Postgres13Connection, PostgresConnectionOptions } from '../../../../src/database';
import { env } from '../../../../src/environment';
import { connectionTest } from './connection';

describe('Postgres 13 Connection', async () => {
	const connectionOptions: PostgresConnectionOptions = {
		host: env.TEST_POSTGRES13_HOST,
		port: env.TEST_POSTGRES13_PORT,
		database: env.TEST_POSTGRES13_DATABASE,
		credentials: {
			username: env.TEST_POSTGRES13_USERNAME,
			password: env.TEST_POSTGRES13_PASSWORD,
		}
	};

	await connectionTest({
		connectionType: Postgres13Connection,
		connectionOptions: connectionOptions,
		expectedVersion: /^PostgreSQL 13\.[0-9]+\,/
	});
});

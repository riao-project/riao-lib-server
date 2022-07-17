import 'jasmine';

import { SqlServer2019Connection, SqlServerConnectionOptions } from '../../../../src/database';
import { env } from '../../../../src/environment';
import { connectionTest } from './connection';

describe('SqlServer 2019 Connection', async () => {
	const connectionOptions: SqlServerConnectionOptions = {
		host: env.TEST_SQLSERVER2019_HOST,
		port: env.TEST_SQLSERVER2019_PORT,
		database: env.TEST_SQLSERVER2019_DATABASE,
		credentials: {
			username: env.TEST_SQLSERVER2019_USERNAME,
			password: env.TEST_SQLSERVER2019_PASSWORD,
		}
	};

	await connectionTest({
		connectionType: SqlServer2019Connection,
		connectionOptions: connectionOptions,
		expectedVersion: /^Microsoft SQL Server 2019 \(RTM\) \- 15\.0\.[0-9]+\.[0-9]+/,
	});
});

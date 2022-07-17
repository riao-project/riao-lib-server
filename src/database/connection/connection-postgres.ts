import * as postgres from 'pg';

import { ConnectionString } from 'riao/src/connection';
import { DatabaseConnection, DatabaseConnectionOptionsObject } from './connection';

export type PostgresConnectionObject = DatabaseConnectionOptionsObject;
export type PostgresConnectionOptions = ConnectionString | PostgresConnectionObject;

export abstract class PostgresConnection extends DatabaseConnection {
	protected conn: postgres.Client;

	public async connect(options: PostgresConnectionOptions): Promise<void> {
		await super.connect(options);

		if (typeof options === 'string') {
			this.conn = new postgres.Client(options);
		}
		else {
			this.conn = new postgres.Client({
				host: options.host,
				port: options.port,
				user: options.credentials.username,
				password: options.credentials.password,
				database: options.database,
			});
		}

		await this.conn.connect();
	}

	public async disconnect(): Promise<void> {
		await this.conn.end();
		await super.disconnect();
	}

	public async query(
		sql: string,
		params: any[] | Record<string, any> = {},
	): Promise<postgres.QueryResult> {
		let paramsArray: (null | string | number)[];
		let keysArray;

		if (Array.isArray(params)) {
			paramsArray = params;
		}
		else {
			keysArray = [...sql.matchAll(/\:([a-zA-Z0-9_]+)[ \;$]/g)]
				.map(match => params[match[1]]);
		}

		return await this.conn.query(sql, paramsArray);
	}

	public async getVersion(): Promise<string> {
		return (await this.query('SELECT version();')).rows[0].version;
	}
}

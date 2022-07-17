import * as mysql from 'mysql2/promise';

import { DatabaseConnection, DatabaseConnectionOptionsObject } from './connection';

export type MySqlConnectionOptionsObject = DatabaseConnectionOptionsObject;
export type MySqlConnectionOptions = MySqlConnectionOptionsObject;

export abstract class MySqlConnection extends DatabaseConnection {
	protected conn: mysql.Connection;

	public async connect(options: MySqlConnectionOptions): Promise<void> {
		await super.connect(options);

		this.conn = await mysql.createConnection({
			host: options.host,
			port: options.port,
			database: options.database,
			user: options.credentials.username,
			password: options.credentials.password,
			namedPlaceholders: true,
		});
	}

	public async disconnect(): Promise<void> {
		await this.conn.end();
		await super.disconnect();
	}

	public async query(sql: string, params: Record<string, any> = {}): Promise<any> {
		const result =  await this.conn.execute(sql, params);

		return result;
	}

	public async getVersion(): Promise<string> {
		return (await this.query('SHOW VARIABLES LIKE "%innodb_version%"'))[0][0].Value;
	}
}

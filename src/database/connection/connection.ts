import { Connection, ConnectionOptionsObject, ConnectionString } from 'riao/src/connection';

export interface DatabaseConnectionOptionsObject
	extends ConnectionOptionsObject {
	database: string;
}

export type DatabaseConnectionOptions =
	DatabaseConnectionOptionsObject |
	ConnectionString;

export abstract class DatabaseConnection extends Connection {
	public async connect(options: DatabaseConnectionOptions): Promise<void> {
		await super.connect(options);
	}

	public async query(sql: string, params: Record<string, any> = {}): Promise<any> {}

	public async getVersion(): Promise<string> {
		return '';
	}
}

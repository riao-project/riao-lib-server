import * as SqlServer from 'mssql';

import { DatabaseConnection, DatabaseConnectionOptionsObject } from './connection';

export type SqlServerConnectionOptionsObject = DatabaseConnectionOptionsObject;
export type SqlServerConnectionOptions = SqlServerConnectionOptionsObject;

export abstract class SqlServerConnection extends DatabaseConnection {
	protected conn: SqlServer.ConnectionPool;

	public async connect(options: SqlServerConnectionOptions): Promise<void> {
		await super.connect(options);

		this.conn = await SqlServer.connect({
			server: options.host,
			port: options.port,
			database: options.database,
			user: options.credentials.username,
			password: options.credentials.password,
			options: {
				trustServerCertificate: true
			},
		});
	}

	public async disconnect(): Promise<void> {
		await this.conn.close();
		await super.disconnect();
	}

	protected async _prepare(
		ps: SqlServer.PreparedStatement,
		sql: string
	): Promise<void> {
		return new Promise<void>((accept, reject) => {
			ps.prepare(sql, err =>
				err ? reject(err) : accept()
			);
		});
	}

	protected async _execute(
		ps: SqlServer.PreparedStatement,
		params: Record<string, any>
	): Promise<any> {
		return new Promise<any>((accept, reject) => {
			ps.execute(params, (err, result) =>
				err ? reject(err) : accept(result)
			);
		});
	}

	protected async _unprep(ps: SqlServer.PreparedStatement): Promise<void> {
		return new Promise<void>((accept, reject) => {
			ps.unprepare(err => err ? reject(err) : accept());
		});
	}

	protected async _preparedStatement(sql: string, params: Record<string, any>): Promise<any> {
		const ps = new SqlServer.PreparedStatement(this.conn);
		await this._prepare(ps, sql);
		const results = await this._execute(ps, params);
		await this._unprep(ps);

		return results;
	}

	protected async _noParamStatement(sql: string): Promise<any> {
		return await SqlServer.query(sql);
	}

	public async query(sql: string, params: Record<string, any> = {}): Promise<any> {
		if (Object.keys(params).length) {
			return await this._preparedStatement(sql, params);
		}
		else {
			return await this._noParamStatement(sql);
		}
	}

	public async getVersion(): Promise<string> {
		const result = (await this.query('SELECT @@version')).recordsets[0][0];

		return result[Object.keys(result)[0]];
	}
}

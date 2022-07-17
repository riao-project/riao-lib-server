import { DatabaseConnectionOptions, DatabaseConnection } from '../../../../src/database';

export interface ConnectionTestOptions<TConnection extends DatabaseConnection> {
	connectionType: { new(): TConnection },
	connectionOptions: DatabaseConnectionOptions,
	expectedVersion: RegExp,
}

export async function connectionTest<TConnection extends DatabaseConnection> (
	options: ConnectionTestOptions<TConnection>
) {
	it('can connect', async () => {
		const connection = new options.connectionType();
		await connection.connect(options.connectionOptions);

		expect(connection).toBeTruthy();
	});

	it('can disconnect', async () => {
		const connection = new options.connectionType();
		await connection.connect(options.connectionOptions);
		await connection.disconnect();

		expect(connection).toBeTruthy();
	});

	it('can get the version', async () => {
		const connection = new options.connectionType();
		await connection.connect(options.connectionOptions);

		expect(await connection.getVersion())
			.withContext('version test')
			.toMatch(options.expectedVersion);
	});
}

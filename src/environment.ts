import { AppConfig, configure } from 'ts-appconfig';

/**
 * Environment Variables Schema
 */
export class Environment extends AppConfig {
	readonly APP_TITLE = 'typescript-template-library';

	readonly TEST_MYSQL5_HOST = 'localhost';
	readonly TEST_MYSQL5_PORT = 3306;
	readonly TEST_MYSQL5_USERNAME = 'riao';
	readonly TEST_MYSQL5_PASSWORD = 'password1234';
	readonly TEST_MYSQL5_DATABASE = 'riao';

	readonly TEST_MYSQL8_HOST = 'localhost';
	readonly TEST_MYSQL8_PORT = 3307;
	readonly TEST_MYSQL8_USERNAME = 'riao';
	readonly TEST_MYSQL8_PASSWORD = 'password1234';
	readonly TEST_MYSQL8_DATABASE = 'riao';

	readonly TEST_POSTGRES13_HOST = 'localhost';
	readonly TEST_POSTGRES13_PORT = 5432;
	readonly TEST_POSTGRES13_USERNAME = 'riao';
	readonly TEST_POSTGRES13_PASSWORD = 'password1234';
	readonly TEST_POSTGRES13_DATABASE = 'riao';

	readonly TEST_POSTGRES14_HOST = 'localhost';
	readonly TEST_POSTGRES14_PORT = 5433;
	readonly TEST_POSTGRES14_USERNAME = 'riao';
	readonly TEST_POSTGRES14_PASSWORD = 'password1234';
	readonly TEST_POSTGRES14_DATABASE = 'riao';

	readonly TEST_SQLSERVER2019_HOST = 'localhost';
	readonly TEST_SQLSERVER2019_PORT = 1433;
	readonly TEST_SQLSERVER2019_USERNAME = 'riao';
	readonly TEST_SQLSERVER2019_PASSWORD = 'password12345';
	readonly TEST_SQLSERVER2019_DATABASE = 'riao';
}

/**
 * Load & export environment variables
 */
export const env: Environment = configure(Environment);

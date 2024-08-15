import { cleanEnv, port, str } from 'envalid';

/******
 * @function cleanEnv validating and accessing environment variables.
 * Ensure that your program only runs when all of its environment dependencies are met.
 */
const env = cleanEnv(process.env, {
	DB_URL: str(),
	PORT: port(),
	JWT_SECRET: str(),
	JWT_EXPIRES_IN: str(),
	MAILTRAP_HOST: str(),
	MAILTRAP_PORT: port(),
	MAILTRAP_USER: str(),
	MAILTRAP_PASS: str()
});

export default env;

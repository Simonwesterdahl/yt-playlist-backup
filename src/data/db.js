import { adapter } from 'modli';
import postgres from 'modli-postgres';

export default () => {
	adapter.add({
		name: 'postgres',
		source: postgres,
		config: {
			host: 'localhost',
			user: 'playlist-backup',
			password: 'password',
			database: 'playlist-backup',
		},
	});
}

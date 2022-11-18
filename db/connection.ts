import { Sequelize } from 'sequelize';

const db = new Sequelize('reconocimiento', 'root', '123456789', {
	host: '192.168.1.120',
	dialect: 'mysql',
	port: 3306
});

export default db;



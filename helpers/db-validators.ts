
import Usuario from '../models/usuario';


// eslint-disable-next-line import/prefer-default-export
export const emailExiste = async (email = '') => {
	const existeEmail = await Usuario.findOne({
		where: {
			email,
		}
	});

	if(existeEmail) {
		throw new Error('El email ya existe');
	}
};


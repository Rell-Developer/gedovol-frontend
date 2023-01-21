// Importaciones
import emailValidator from '../helpers/emailValidator.js';

// Testings
describe('Prueba de los Helpers', () => {

    // Prueba #1
    test('Verificar si el correo es válido', () => {
        let prueba = emailValidator('roque@outlook.net');
        expect(prueba).toBe(true);
    });
})
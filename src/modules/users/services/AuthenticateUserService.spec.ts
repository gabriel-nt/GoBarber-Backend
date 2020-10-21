import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticatedUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticatedUserService;

describe('AuthenticatedUserService', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        authenticateUser = new AuthenticatedUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });

    it('should be able to authenticate', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Gabriel',
            email: 'gabriel@teste.com',
            password: '123456',
        });

        const response = await authenticateUser.execute({
            email: 'gabriel@teste.com',
            password: '123456',
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });

    it('should be able to authenticate within non existing user', async () => {
        await expect(
            authenticateUser.execute({
                email: 'gabriel@teste.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to authenticate within wrong password', async () => {
        await fakeUsersRepository.create({
            name: 'Gabriel',
            email: 'gabriel@teste.com',
            password: '123456',
        });

        await expect(
            authenticateUser.execute({
                email: 'gabriel@teste.com',
                password: 'wrong-password',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});

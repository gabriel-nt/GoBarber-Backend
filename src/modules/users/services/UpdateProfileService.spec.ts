import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let updateProfileUser: UpdateProfileService;
let fakeHashProvider: FakeHashProvider;

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        updateProfileUser = new UpdateProfileService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });

    it('should be able to update your profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Gabriel',
            email: 'gabriel@teste.com',
            password: '123456',
        });

        const updateUser = await updateProfileUser.execute({
            user_id: user.id,
            name: 'Gabriel Teste',
            email: 'gabriel@teste2.com',
        });

        expect(updateUser.name).toBe('Gabriel Teste');
        expect(updateUser.email).toBe('gabriel@teste2.com');
    });

    it('should not be able to show the update from non-existing user', async () => {
        await expect(
            updateProfileUser.execute({
                name: 'teste',
                email: 'teste@teste.com',
                user_id: 'non-existing-user_id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to change to another user email', async () => {
        await fakeUsersRepository.create({
            name: 'Gabriel',
            email: 'gabriel@teste.com',
            password: '123456',
        });

        const user = await fakeUsersRepository.create({
            name: 'Teste',
            email: 'teste@teste.com',
            password: '123456',
        });

        await expect(
            updateProfileUser.execute({
                user_id: user.id,
                name: 'Gabriel Teste',
                email: 'gabriel@teste.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Gabriel',
            email: 'gabriel@teste.com',
            password: '123456',
        });

        const updateUser = await updateProfileUser.execute({
            user_id: user.id,
            name: 'Gabriel Teste',
            password: '123123',
            old_password: '123456',
            email: 'gabriel@teste2.com',
        });

        expect(updateUser.password).toBe('123123');
    });

    it('should be able to update the password withot old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Gabriel',
            email: 'gabriel@teste.com',
            password: '123456',
        });

        await expect(
            updateProfileUser.execute({
                user_id: user.id,
                name: 'Gabriel Teste',
                password: '123123',
                email: 'gabriel@teste2.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update the password with wrong old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Gabriel',
            email: 'gabriel@teste.com',
            password: '123456',
        });

        await expect(
            updateProfileUser.execute({
                user_id: user.id,
                name: 'Gabriel Teste',
                old_password: 'wrong-old-password',
                password: '123123',
                email: 'gabriel@teste2.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});

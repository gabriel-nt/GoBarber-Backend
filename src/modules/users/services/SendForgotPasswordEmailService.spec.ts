import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUserRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUsersRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeUserTokensRepository = new FakeUserTokensRepository();

        sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeUserRepository,
            fakeMailProvider,
            fakeUserTokensRepository,
        );
    });

    it('should be able to recovery the password using your email', async () => {
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        await fakeUserRepository.create({
            email: 'gabriel@teste.com',
            name: 'Gabriel Teste',
            password: '123456',
        });

        await sendForgotPasswordEmail.execute({
            email: 'gabriel@teste.com',
        });

        expect(sendMail).toHaveBeenCalled();
    });

    it('should not be able to recover a non existing user password', async () => {
        await expect(
            sendForgotPasswordEmail.execute({
                email: 'gabriel@teste.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should generate a forgot password token', async () => {
        const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

        const user = await fakeUserRepository.create({
            email: 'gabriel@teste.com',
            name: 'Gabriel Teste',
            password: '123456',
        });

        await sendForgotPasswordEmail.execute({
            email: 'gabriel@teste.com',
        });

        expect(generateToken).toHaveBeenCalledWith(user.id);
    });
});

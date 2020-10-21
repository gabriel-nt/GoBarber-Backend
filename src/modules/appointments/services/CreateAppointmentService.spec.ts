import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakesNotificationsRepository';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmensRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeCacheProvider: FakeCacheProvider;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeAppointmentRepository: FakeAppointmentRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeCacheProvider = new FakeCacheProvider();
        fakeNotificationsRepository = new FakeNotificationsRepository();
        fakeAppointmentRepository = new FakeAppointmentRepository();

        createAppointment = new CreateAppointmentService(
            fakeAppointmentRepository,
            fakeNotificationsRepository,
            fakeCacheProvider,
        );
    });

    it('should be able to create a new appointment', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 11, 10, 12).getTime();
        });

        const appointment = await createAppointment.execute({
            date: new Date(2020, 11, 10, 13),
            provider_id: 'provider_id',
            user_id: 'user_id',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('provider_id');
    });

    it('should not be able to create two appointment on the same time', async () => {
        const appointmentDate = new Date(2020, 11, 10, 11);

        await createAppointment.execute({
            date: appointmentDate,
            provider_id: 'provider_id',
            user_id: 'user_id',
        });

        await expect(
            createAppointment.execute({
                date: appointmentDate,
                provider_id: 'provider_id',
                user_id: 'user_id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointment on a past date', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 10, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2020, 10, 10, 11),
                provider_id: 'provider_id',
                user_id: 'user_id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointment on the same user as provider', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 10, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2020, 10, 10, 11),
                provider_id: 'same_user',
                user_id: 'same_user',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointment before 8 hours and after 18 hours', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 10, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2020, 10, 10, 7),
                provider_id: 'user_id',
                user_id: 'provider_id',
            }),
        ).rejects.toBeInstanceOf(AppError);

        await expect(
            createAppointment.execute({
                date: new Date(2020, 10, 10, 18),
                provider_id: 'user_id',
                user_id: 'provider_id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});

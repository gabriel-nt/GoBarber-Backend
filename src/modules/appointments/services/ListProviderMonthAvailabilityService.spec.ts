import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmensRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmensRepository: FakeAppointmentsRepository;
let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;

describe('ListProviders', () => {
    beforeEach(() => {
        fakeAppointmensRepository = new FakeAppointmentsRepository();
        listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
            fakeAppointmensRepository,
        );
    });

    it('should be able to list the month availability from provider', async () => {
        await fakeAppointmensRepository.create({
            provider_id: 'user',
            user_id: 'user_1',
            date: new Date(2020, 10, 20, 8, 0, 0),
        });

        await fakeAppointmensRepository.create({
            provider_id: 'user',
            user_id: 'user_1',
            date: new Date(2020, 10, 20, 9, 0, 0),
        });

        await fakeAppointmensRepository.create({
            provider_id: 'user',
            user_id: 'user_1',
            date: new Date(2020, 10, 20, 10, 0, 0),
        });

        await fakeAppointmensRepository.create({
            provider_id: 'user',
            user_id: 'user_1',
            date: new Date(2020, 10, 20, 11, 0, 0),
        });

        await fakeAppointmensRepository.create({
            provider_id: 'user',
            user_id: 'user_1',
            date: new Date(2020, 10, 20, 12, 0, 0),
        });

        await fakeAppointmensRepository.create({
            provider_id: 'user',
            user_id: 'user_1',
            date: new Date(2020, 10, 20, 13, 0, 0),
        });

        await fakeAppointmensRepository.create({
            provider_id: 'user',
            user_id: 'user_1',
            date: new Date(2020, 10, 20, 14, 0, 0),
        });

        await fakeAppointmensRepository.create({
            provider_id: 'user',
            user_id: 'user_1',
            date: new Date(2020, 10, 20, 15, 0, 0),
        });

        await fakeAppointmensRepository.create({
            provider_id: 'user',
            user_id: 'user_1',
            date: new Date(2020, 10, 20, 16, 0, 0),
        });

        await fakeAppointmensRepository.create({
            provider_id: 'user',
            user_id: 'user_1',
            date: new Date(2020, 10, 20, 17, 0, 0),
        });

        await fakeAppointmensRepository.create({
            provider_id: 'user',
            user_id: 'user_1',
            date: new Date(2020, 10, 21, 8, 0, 0),
        });

        const availability = await listProviderMonthAvailabilityService.execute(
            {
                provider_id: 'user',
                year: 2020,
                month: 11,
            },
        );

        expect(availability).toEqual(
            expect.arrayContaining([
                { day: 19, available: true },
                { day: 20, available: false },
                { day: 21, available: true },
                { day: 22, available: true },
            ]),
        );
    });
});

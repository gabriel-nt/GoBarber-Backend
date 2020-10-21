import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmensRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmensRepository: FakeAppointmentsRepository;
let listProviderDayAvailabilityService: ListProviderDayAvailabilityService;

describe('ListProviders', () => {
    beforeEach(() => {
        fakeAppointmensRepository = new FakeAppointmentsRepository();
        listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
            fakeAppointmensRepository,
        );
    });

    it('should be able to list the day availability from provider', async () => {
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

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 10, 20, 11).getTime();
        });

        const availability = await listProviderDayAvailabilityService.execute({
            provider_id: 'user',
            year: 2020,
            month: 11,
            day: 20,
        });

        expect(availability).toEqual(
            expect.arrayContaining([
                { hour: 8, available: false },
                { hour: 9, available: false },
                { hour: 10, available: false },
                { hour: 13, available: true },
                { hour: 14, available: false },
                { hour: 15, available: false },
                { hour: 16, available: true },
            ]),
        );
    });
});

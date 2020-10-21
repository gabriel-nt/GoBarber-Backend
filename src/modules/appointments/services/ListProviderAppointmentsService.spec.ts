import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmensRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeCacheProvider: FakeCacheProvider;
let fakeAppointmensRepository: FakeAppointmentsRepository;
let listProviderAppointmentsService: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
    beforeEach(() => {
        fakeCacheProvider = new FakeCacheProvider();
        fakeAppointmensRepository = new FakeAppointmentsRepository();

        listProviderAppointmentsService = new ListProviderAppointmentsService(
            fakeAppointmensRepository,
            fakeCacheProvider,
        );
    });

    it('should be able to list the appointments on a specific day', async () => {
        const appointment1 = await fakeAppointmensRepository.create({
            provider_id: 'provider',
            user_id: 'user_1',
            date: new Date(2020, 10, 20, 14, 0, 0),
        });

        const appointment2 = await fakeAppointmensRepository.create({
            provider_id: 'provider',
            user_id: 'user_1',
            date: new Date(2020, 10, 20, 15, 0, 0),
        });

        const appointments = await listProviderAppointmentsService.execute({
            provider_id: 'provider',
            year: 2020,
            month: 11,
            day: 20,
        });

        expect(appointments).toEqual([appointment1, appointment2]);
    });
});

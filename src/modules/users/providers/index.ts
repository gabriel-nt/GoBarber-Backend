import { container } from 'tsyringe';

import IUsersHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IUsersHashProvider>(
    'HashProvider',
    BCryptHashProvider,
);

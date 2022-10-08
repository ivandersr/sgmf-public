import { container } from 'tsyringe';
import '@modules/users/providers';
import AthleteGroupsRepository from '@modules/athletegroups/infra/typeorm/repositories/AthleteGroupsRepository';
import IAthleteGroupsRepository from '@modules/athletegroups/repositories/IAthleteGroupsRepository';
import AthletesRepository from '@modules/athletes/infra/typeorm/repositories/AthletesRepository';
import IAthletesRepository from '@modules/athletes/repositories/IAthletesRepository';
import ISubscriptionsRepository from '@modules/subscriptions/repositories/ISubscriptionsRepository';
import SubscriptionsRepository from '@modules/subscriptions/infra/typeorm/repositories/SubscriptionsRepository';
import IPaymentsRepository from '@modules/payments/repositories/IPaymentsRepository';
import PaymentsRepository from '@modules/payments/infra/typeorm/repositories/PaymentsRepository';
import IReferralGroupsRepository from '@modules/referralgroups/repositories/IReferralGroupsRepository';
import ReferralGroupsRepository from '@modules/referralgroups/infra/typeorm/repositories/ReferralGroupsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IOutcomesRepository from '@modules/outcomes/repositories/IOutcomesRepository';
import OutcomesRepository from '@modules/outcomes/infra/typeorm/repositories/OutcomesRepository';

container.registerSingleton<IAthleteGroupsRepository>(
  'AthleteGroupsRepository',
  AthleteGroupsRepository,
);

container.registerSingleton<IAthletesRepository>(
  'AthletesRepository',
  AthletesRepository,
);

container.registerSingleton<ISubscriptionsRepository>(
  'SubscriptionsRepository',
  SubscriptionsRepository,
);

container.registerSingleton<IPaymentsRepository>(
  'PaymentsRepository',
  PaymentsRepository,
);

container.registerSingleton<IReferralGroupsRepository>(
  'ReferralGroupsRepository',
  ReferralGroupsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IOutcomesRepository>(
  'OutcomesRepository',
  OutcomesRepository,
);

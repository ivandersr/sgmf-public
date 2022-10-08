import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import AthleteGroup from '@modules/athletegroups/infra/typeorm/entities/AthleteGroup';
import ReferralGroup from '@modules/referralgroups/infra/typeorm/entities/ReferralGroup';
import Subscription from '@modules/subscriptions/infra/typeorm/entities/Subscription';

@Entity('athletes')
class Athlete {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  active: boolean;

  @Column()
  name: string;

  @Column()
  birthDate: Date;

  @Column()
  phoneNumber: string;

  @Column()
  nextDueDate: Date;

  @Column()
  subscription_id: string;

  @Column()
  athlete_group_id: string;

  @Column()
  referral_group_id: string;

  @Column()
  observation: string;

  @ManyToOne(() => Subscription, { eager: true })
  @JoinColumn({ name: 'subscription_id' })
  subscription: Subscription;

  @ManyToOne(() => AthleteGroup, { eager: true })
  @JoinColumn({ name: 'athlete_group_id' })
  athleteGroup: AthleteGroup;

  @ManyToOne(() => ReferralGroup, { eager: true })
  @JoinColumn({ name: 'referral_group_id' })
  referralGroup: ReferralGroup;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Athlete;

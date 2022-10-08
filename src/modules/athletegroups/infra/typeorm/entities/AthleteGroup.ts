import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('athlete_groups')
class AthleteGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;
}

export default AthleteGroup;

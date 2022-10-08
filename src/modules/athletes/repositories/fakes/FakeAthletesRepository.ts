import { v4 } from 'uuid';
import IActiveByReferralDTO from "@modules/athletes/dtos/IActiveByReferralDTO";
import ICreateAthleteDTO from "@modules/athletes/dtos/ICreateAthleteDTO";
import IFindAthleteDTO from "@modules/athletes/dtos/IFindAthleteDTO";
import IFindByReferralGroupDTO from "@modules/athletes/dtos/IFindByReferralGroupDTO";
import IFindManyOptionsDTO from "@modules/athletes/dtos/IFindManyOptionsDTO";
import Athlete from "@modules/athletes/infra/typeorm/entities/Athlete";
import IFindManyByNameOptionsDTO from '@modules/athletes/dtos/IFindManyByNameOptionsDTO';
import IAthletesRepository from "../IAthletesRepository";

class FakeAthletesRepository implements IAthletesRepository {
  private athletes: Athlete[] = [];

  public async find(): Promise<Athlete[]> {
    return this.athletes;
  }

  public async findAndCount(
    options?: IFindManyOptionsDTO
  ): Promise<[Athlete[], number]> {
    if (options) {
      const { skip, take } = options;

      if (skip && take) {
        const findAthletes = this.athletes.slice(skip, skip + take);
        return [findAthletes, this.athletes.length]
      }
    }

    return [this.athletes, this.athletes.length];
  }

  public async findByName(
    { text, skip, take, order }: IFindManyByNameOptionsDTO
  ): Promise<[Athlete[], number]> {
    if (skip && take) {
      const filteredAthletes = this.athletes.filter(
        athlete => athlete.name.toLocaleLowerCase().includes(text.toLowerCase())
      );
      const findAthletes = filteredAthletes.slice(skip, skip + take);

      return [findAthletes, this.athletes.length]
    }

    const filteredAthletes = this.athletes.filter(
      athlete => athlete.name.toLocaleLowerCase().includes(text.toLowerCase())
    );

    if (order) {
      filteredAthletes.sort((a, b) => a.name <= b.name ? 1 : -1);
    }

    return [filteredAthletes, this.athletes.length];
  }

  public async findByReferralGroup(
    { referral_group_id }: IFindByReferralGroupDTO
  ): Promise<Athlete[]> {
    const findAthletes = this.athletes.filter(
      athlete => athlete.referral_group_id === referral_group_id
    );

    return findAthletes;
  }

  public async findActiveByReferralGroup(
    { referral_group_id }: IFindByReferralGroupDTO
  ): Promise<IActiveByReferralDTO> {
    const findAthletes = this.athletes.filter(
      athlete => athlete.referral_group_id === referral_group_id
    ).filter(
      athlete => athlete.active
    );

    const count = findAthletes.length;

    return { athletes: findAthletes, count };
  }

  public async findOne({ id }: IFindAthleteDTO): Promise<Athlete | undefined> {
    const findAthlete = this.athletes.find(athlete => athlete.id === id);

    return findAthlete;
  }

  public async create({
    name,
    phoneNumber,
    birthDate,
    athleteGroup,
    subscription }: ICreateAthleteDTO): Promise<Athlete> {
    const newAthlete = new Athlete();

    Object.assign(newAthlete, {
      id: v4(),
      active: true,
      name,
      phoneNumber,
      birthDate,
      athleteGroup,
      subscription
    });

    this.athletes.push(newAthlete);

    return newAthlete;
  }

  public async save(data: Athlete): Promise<Athlete> {
    const findIndex = this.athletes.findIndex(
      athlete => athlete.id === data.id
    );

    if (findIndex !== -1) {
      Object.assign(this.athletes[findIndex], data);

      return this.athletes[findIndex];
    }

    this.athletes.push(data);

    return data;
  }
}

export default FakeAthletesRepository;

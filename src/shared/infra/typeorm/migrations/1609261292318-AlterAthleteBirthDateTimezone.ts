import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AlterAthleteBirthDateTimezone1609261292318
  implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('athletes', 'birthDate');
    await queryRunner.addColumn('athletes', new TableColumn({
      name: 'birthDate',
      type: 'timestamptz',
      isNullable: true,
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('athletes', 'birthDate');
    await queryRunner.addColumn('athletes', new TableColumn({
      name: 'birthDate',
      type: 'timestamp',
      isNullable: true,
    }));
  }
}

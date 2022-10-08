import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class
  AlterAthletesAddNextDueDate1609874672859
  implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('athletes', new TableColumn({
      name: 'nextDueDate',
      type: 'timestamp',
      isNullable: true,
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('athletes', 'nextDueDate');
  }
}

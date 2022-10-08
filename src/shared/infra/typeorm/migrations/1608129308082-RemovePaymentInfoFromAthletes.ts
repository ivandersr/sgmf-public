import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class RemovePaymentInfoFromAthletes1608129308082
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('athletes', 'lastPayValue');
    await queryRunner.dropColumn('athletes', 'dueDate');
    await queryRunner.dropColumn('athletes', 'lastPayDate');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('athletes', [
      new TableColumn({
        name: 'lastPayValue',
        type: 'decimal(10, 2)',
      }),
      new TableColumn({
        name: 'dueDate',
        type: 'timestamp',
      }),
      new TableColumn({
        name: 'lastPayDate',
        type: 'timestamp',
      }),
    ]);
  }
}

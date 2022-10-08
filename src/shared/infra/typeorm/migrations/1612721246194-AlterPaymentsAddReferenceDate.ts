import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AlterPaymentsAddReferenceDate1612721246194
  implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('payments', 'monthsPaid');
    await queryRunner.addColumn('payments', new TableColumn({
      name: 'referenceDate',
      type: 'timestamp',
      isNullable: true,
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('payments', 'referenceDate');
    await queryRunner.addColumn('payments', new TableColumn({
      name: 'monthsPaid',
      type: 'smallint'
    }));
  }
}

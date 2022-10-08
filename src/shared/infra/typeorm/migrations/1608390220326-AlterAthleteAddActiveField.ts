import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterAthleteAddActiveField1608390220326
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'athletes',
      new TableColumn({
        name: 'active',
        type: 'boolean',
        default: 'true',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('athletes', 'active');
  }
}

import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterRefGroupsAddCreateUpdateDate1608554808438
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('referral_groups', [
      new TableColumn({
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
      }),
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('referral_groups', 'updated_at');
    await queryRunner.dropColumn('referral_groups', 'created_at');
  }
}

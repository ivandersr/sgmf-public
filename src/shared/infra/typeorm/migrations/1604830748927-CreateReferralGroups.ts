import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateReferralGroups1604830748927
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'referral_groups',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'referral_id',
            type: 'uuid',
          },
          {
            name: 'title',
            type: 'varchar',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'referral_groups',
      new TableForeignKey({
        name: 'ReferralAthlete',
        columnNames: ['referral_id'],
        referencedTableName: 'athletes',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('referral_groups');
  }
}

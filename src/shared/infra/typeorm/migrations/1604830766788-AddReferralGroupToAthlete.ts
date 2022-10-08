import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddReferralGroupToAthlete1604830766788
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'athletes',
      new TableColumn({
        name: 'referral_group_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'athletes',
      new TableForeignKey({
        name: 'ReferralGroupAthletes',
        columnNames: ['referral_group_id'],
        referencedTableName: 'referral_groups',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('athletes', 'ReferralGroupAthletes');
    await queryRunner.dropColumn('athletes', 'referral_group_id');
  }
}

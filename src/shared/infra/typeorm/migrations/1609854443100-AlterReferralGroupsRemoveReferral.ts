import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey
} from "typeorm";

export default class
  AlterReferralGroupsRemoveReferral1609854443100
  implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('referral_groups', 'ReferralAthlete');
    await queryRunner.dropColumn('referral_groups', 'referral_id');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('referral_groups', new TableColumn(
      {
        name: 'referral_id',
        type: 'uuid',
      },
    ));

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
}

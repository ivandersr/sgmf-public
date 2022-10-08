import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddAthleteGroupToAthlete1604827054272
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'athletes',
      new TableColumn({
        name: 'athlete_group_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'athletes',
      new TableForeignKey({
        name: 'AtheteGroupAthlete',
        columnNames: ['athlete_group_id'],
        referencedTableName: 'athlete_groups',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('athlets', 'AtheteGroupAthlete');
    await queryRunner.dropColumn('athletes', 'athlete_group_id');
  }
}

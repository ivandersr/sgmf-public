import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreatePayments1608128750657 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'payments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'value',
            type: 'decimal(10,2)',
          },
          {
            name: 'paymentDate',
            type: 'timestamp',
          },
          {
            name: 'monthsPaid',
            type: 'smallint',
          },
          {
            name: 'nextDueDate',
            type: 'timestamp',
          },
          {
            name: 'athlete_id',
            type: 'uuid',
            isNullable: true
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'payments',
      new TableForeignKey({
        name: 'PaymentAthlete',
        columnNames: ['athlete_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'athletes',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('payments');
  }
}

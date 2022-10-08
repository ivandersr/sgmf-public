import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateOutcomes1610121269169 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'outcomes',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        {
          name: 'description',
          type: 'varchar',
        },
        {
          name: 'value',
          type: 'decimal(6,2)',
        },
        {
          name: 'dueDate',
          type: 'timestamp',
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
        }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('outcomes');
  }

}

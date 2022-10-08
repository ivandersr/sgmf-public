import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterAthletesAddObservationsField1620240283746 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('athletes', new TableColumn({
            name: 'observation',
            type: 'text',
            isNullable: true,
          }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('athletes', 'observation');
    }
}

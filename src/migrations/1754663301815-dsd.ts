import { MigrationInterface, QueryRunner } from "typeorm";

export class Dsd1754663301815 implements MigrationInterface {
    name = 'Dsd1754663301815'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "customer_id" integer NOT NULL, "order_date" TIMESTAMP NOT NULL, "status" character varying(20) NOT NULL DEFAULT 'Pending', "total_amount" numeric(10,2) NOT NULL, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "orders"`);
    }

}

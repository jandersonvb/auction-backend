import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableOffer1715794124310 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "offer" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "amount" decimal(10,2) NOT NULL,
                "status" character varying NOT NULL DEFAULT 'pending',
                "buyer_id" uuid NOT NULL,
                "auction_id" uuid NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_0e24d7b7d7c8b3b8b3f3f8a7f8d" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "offer"
            ADD CONSTRAINT "FK_0e24d7b7d7c8b3b8b3f3f8a7f8d" FOREIGN KEY ("buyer_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "offer"
            ADD CONSTRAINT "FK_0e24d7b7d7c8b3b8b3f3f8a7f8d" FOREIGN KEY ("auction_id") REFERENCES "auction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "offer" DROP CONSTRAINT "FK_0e24d7b7d7c8b3b8b3f3f8a7f8d"
        `);
        await queryRunner.query(`
            ALTER TABLE "offer" DROP CONSTRAINT "FK_0e24d7b7d7c8b3b8b3f3f8a7f8d"
        `);
        await queryRunner.query(`
            DROP TABLE "offer"
        `);
    }

}

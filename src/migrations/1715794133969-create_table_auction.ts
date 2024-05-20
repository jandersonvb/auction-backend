import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableAuction1715794133969 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE public.auction (
                id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
                book_id uuid NOT NULL,
                seller_id uuid NOT NULL,
                status character varying(255) NOT NULL,
                created_at timestamp with time zone DEFAULT now() NOT NULL,
                updated_at timestamp with time zone DEFAULT now() NOT NULL,
                CONSTRAINT fk_book_id FOREIGN KEY (book_id) REFERENCES book(id),
                CONSTRAINT fk_seller_id FOREIGN KEY (seller_id) REFERENCES "user"(id)
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE public.auction;
        `)
    }

}

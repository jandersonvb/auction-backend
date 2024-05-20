import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUser1716226847484 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE public.user (
                id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
                user_name character varying(255) NOT NULL,
                password character varying(255) NOT NULL,
                email character varying(255) NOT NULL,
                type character varying(255) DEFAULT 'buyer' NOT NULL,
                created_at timestamp with time zone DEFAULT now() NOT NULL,
                updated_at timestamp with time zone DEFAULT now() NOT NULL
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE public.user;
        `)
    }

}

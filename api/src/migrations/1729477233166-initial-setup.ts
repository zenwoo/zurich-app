import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertProduct1729477233166 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      CREATE SEQUENCE IF NOT EXISTS product_id_seq
        INCREMENT 1
        START 1
        MINVALUE 1
        MAXVALUE 2147483647
        CACHE 1;

      ALTER SEQUENCE product_id_seq
        OWNER TO postgres;

      CREATE TABLE product
      (
        id integer NOT NULL DEFAULT nextval('product_id_seq'::regclass),
        code integer NOT NULL,
        description character varying(500),
        location character varying NOT NULL,
        price numeric NOT NULL DEFAULT 0,
        CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY (id)
      );

      ALTER TABLE IF EXISTS product
      OWNER to postgres;

      ALTER SEQUENCE IF EXISTS product_id_seq
      OWNED BY product.id;

      INSERT INTO product(code, description, location, price)
	    VALUES (1000, 'Sedan', 'West Malaysia', '300');

      INSERT INTO product(code, description, location, price)
	    VALUES (1000, 'Sedan', 'East Malaysia', '450');

      INSERT INTO product(code, description, location, price)
	    VALUES (2000, 'SUV', 'West Malaysia', '500');

      INSERT INTO product(code, description, location, price)
	    VALUES (2000, 'SUV', 'West Malaysia', '650');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('TRUNCATE TABLE product;');
  }
}

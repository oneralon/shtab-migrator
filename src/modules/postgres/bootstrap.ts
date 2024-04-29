import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class Bootstrap implements OnModuleInit {
  @InjectDataSource()
  private readonly dataSource: DataSource;

  public async onModuleInit() {
    await this.dataSource.query(`
      CREATE TABLE IF NOT EXISTS "anomaly" (
        "id" SERIAL NOT NULL,
        "title" character varying NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT 'now()',

        CONSTRAINT "PK_77cff63e8e328eae7769c0b839e"
        PRIMARY KEY ("id")
      );

      CREATE TABLE IF NOT EXISTS "donor" (
        "id" SERIAL NOT NULL,
        "name" character varying NOT NULL,
        "email" character varying NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT 'now()',

        CONSTRAINT "UQ_aa95193e5bf2951ad67fe00ba86" UNIQUE ("email"),
        CONSTRAINT "PK_51f7b00d1120f7130b69f8a3a46"
        PRIMARY KEY ("id")
      );

      CREATE INDEX IF NOT EXISTS "IDX_aa95193e5bf2951ad67fe00ba8" ON "donor" ("email");

      CREATE TABLE IF NOT EXISTS "sync" (
        "id" SERIAL NOT NULL,
        "log" character varying NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT 'now()',

        CONSTRAINT "PK_43a2b32a81faa38521e1f74b368"
        PRIMARY KEY ("id")
      );
    `);
  }
}

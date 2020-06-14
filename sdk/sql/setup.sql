DROP TABLE IF EXISTS "bnb_accounts";
CREATE TABLE "bnb_accounts" (
  "uuid" char(36) NOT NULL,
  "public_key" varchar(128),
  "seed_phrase" text,
  "address" varchar(64),
  "key_name" varchar(64),
  "password" text,
  "created" timestamp(6),
  "encr_key" text
)
WITH (OIDS=FALSE);

DROP TABLE IF EXISTS "client_accounts_bnb";
CREATE TABLE "client_accounts_bnb" (
  "uuid" char(36) NOT NULL,
  "bnb_address" varchar(64),
  "client_eth_account_uuid" char(36),
  "created" timestamp(6)
)
WITH (OIDS=FALSE);

DROP TABLE "client_accounts_eth";
CREATE TABLE "client_accounts_eth" (
  "uuid" char(36) NOT NULL,
  "eth_address" varchar(64),
  "client_bnb_account_uuid" char(36),
  "created" timestamp(6)
)
WITH (OIDS=FALSE);

DROP TABLE "client_bnb_accounts";
CREATE TABLE "client_bnb_accounts" (
  "uuid" char(36) NOT NULL,
  "public_key" varchar(128),
  "seed_phrase" text,
  "address" varchar(64),
  "key_name" varchar(64),
  "password" text,
  "created" timestamp(6),
  "encr_key" text
)
WITH (OIDS=FALSE);

DROP TABLE "client_eth_accounts";
CREATE TABLE "client_eth_accounts" (
  "uuid" char(36) NOT NULL,
  "private_key" text,
  "address" varchar(64),
  "created" timestamp(6),
  "encr_key" text
)
WITH (OIDS=FALSE);

DROP TABLE "eth_accounts";
CREATE TABLE "eth_accounts" (
  "uuid" char(36) NOT NULL,
  "private_key" text,
  "address" varchar(64),
  "created" timestamp(6),
  "encr_key" text
)
WITH (OIDS=FALSE);

DROP TABLE "list_proposals";
CREATE TABLE "list_proposals" (
  "uuid" char(36) NOT NULL,
  "token_uuid" char(36),
  "unique_symbol" varchar(32),
  "title" varchar(128),
  "description" varchar(128),
  "initial_price" varchar(32),
  "expiry_time" int8,
  "voting_period" int8,
  "submitted" bool,
  "transaction_hash" varchar(64),
  "proposal_id" int8,
  "processed" bool,
  "voting_status" varchar(32),
  "created" timestamp(6)
)
WITH (OIDS=FALSE);

DROP TABLE "swaps";
CREATE TABLE "swaps" (
  "uuid" char(36) NOT NULL,
  "token_uuid" char(36),
  "eth_address" varchar(64),
  "bnb_address" varchar(64),
  "amount" varchar(32),
  "deposit_transaction_hash" varchar(128),
  "transfer_transaction_hash" varchar(128),
  "processed" bool,
  "created" timestamp(6),
  "client_account_uuid" char(36),
  "direction" text
)
WITH (OIDS=FALSE);

DROP TABLE "tokens";
CREATE TABLE "tokens" (
  "uuid" char(36) NOT NULL,
  "name" varchar(64),
  "symbol" varchar(10),
  "unique_symbol" varchar(32),
  "total_supply" varchar(64),
  "erc20_address" varchar(64),
  "eth_account_uuid" char(36),
  "bnb_account_uuid" char(36),
  "processed" bool,
  "listing_proposed" bool,
  "listing_proposal_uuid" char(36),
  "listed" bool,
  "created" timestamp(6),
  "mintable" bool,
  "minimum_swap_amount" varchar(32),
  "fee_per_swap" varchar(32),
  "process_date" timestamp(6),
  "bnb_to_eth_enabled" boolean,
  "eth_to_bnb_enabled" boolean,
)
WITH (OIDS=FALSE);

ALTER TABLE "bnb_accounts" ADD PRIMARY KEY ("uuid");

ALTER TABLE "client_accounts_bnb" ADD PRIMARY KEY ("uuid");

ALTER TABLE "client_accounts_eth" ADD PRIMARY KEY ("uuid");

ALTER TABLE "client_bnb_accounts" ADD PRIMARY KEY ("uuid");

ALTER TABLE "client_eth_accounts" ADD PRIMARY KEY ("uuid");

ALTER TABLE "eth_accounts" ADD PRIMARY KEY ("uuid");

ALTER TABLE "list_proposals" ADD PRIMARY KEY ("uuid");

ALTER TABLE "swaps" ADD PRIMARY KEY ("uuid");

ALTER TABLE "tokens" ADD PRIMARY KEY ("uuid");

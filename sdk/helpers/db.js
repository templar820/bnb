const pgp = require('pg-promise')(/*options*/)
const config = require('../config')


const QueryFile = pgp.QueryFile;
const path = require('path');

function sql(file) {
  const fullPath = path.join(__dirname, file); // generating full path;
  return new QueryFile(fullPath, {minify: true});
}



const cn = {
  host: config.host,
  port: 5432,
  database: config.database,
  user: config.user,
  password: config.password
}
const db = pgp(cn)


//bnb_accounts
db.none('DROP TABLE IF EXISTS bnb_accounts').then(el => {
  db.none('CREATE TABLE bnb_accounts ( uuid char(36) NOT NULL, public_key varchar(128), seed_phrase text, address varchar(64), key_name varchar(64), password text, created timestamp(6), encr_key text, PRIMARY KEY (uuid)) WITH (OIDS=FALSE);')
}).catch(error => {
  console.log(error);
})

//client_accounts_bnb
db.none('DROP TABLE IF EXISTS client_accounts_bnb').then(el => {
  db.none('CREATE TABLE client_accounts_bnb ( uuid char(36) NOT NULL, bnb_address varchar(64), client_eth_account_uuid char(36), created timestamp(6),  PRIMARY KEY (uuid)) WITH (OIDS=FALSE);')
}).catch(error => {
  console.log(error);
})

//client_accounts_eth
db.none('DROP TABLE IF EXISTS client_accounts_eth').then(el => {
  db.none('CREATE TABLE client_accounts_eth ( uuid char(36) NOT NULL, eth_address varchar(64), client_bnb_account_uuid char(36), created timestamp(6),  PRIMARY KEY (uuid)) WITH (OIDS=FALSE);')
}).catch(error => {
  console.log(error);
})

//client_bnb_accounts
db.none('DROP TABLE IF EXISTS client_bnb_accounts').then(el => {
  db.none('CREATE TABLE client_bnb_accounts ( uuid char(36) NOT NULL, public_key varchar(128), seed_phrase text, address varchar(64), key_name varchar(64), password text, created timestamp(6), encr_key text,  PRIMARY KEY (uuid)) WITH (OIDS=FALSE);')
}).catch(error => {
  console.log(error);
})

//client_eth_accounts
db.none('DROP TABLE IF EXISTS client_eth_accounts').then(el => {
  db.none('CREATE TABLE client_eth_accounts ( uuid char(36) NOT NULL, private_key text, address varchar(64), created timestamp(6), encr_key text,  PRIMARY KEY (uuid)) WITH (OIDS=FALSE);')
}).catch(error => {
  console.log(error);
})

//eth_accounts
db.none('DROP TABLE IF EXISTS eth_accounts').then(el => {
  db.none('CREATE TABLE eth_accounts (uuid char(36) NOT NULL, private_key text, address varchar(64), created varchar(32), encr_key text,  PRIMARY KEY (uuid)) WITH (OIDS=FALSE);')
  .then(i => {
    db.none("INSERT INTO eth_accounts (uuid, private_key, address, created, encr_key) VALUES ('d7bb664a-6b4b-29e5-8f40-b6ef699a58dd', 'password', '0xd0352a019e9ab9d757776f532377aaebd36fd541', '123', 'kek')")
  }) 
}).catch(error => {
  console.log(error);
})

//list_proposals
db.none('DROP TABLE IF EXISTS list_proposals').then(el => {
  db.none('CREATE TABLE list_proposals ( uuid char(36) NOT NULL, token_uuid char(36), unique_symbol varchar(32), title varchar(128), description varchar(128), initial_price varchar(32), expiry_time int8, voting_period int8, submitted bool, transaction_hash varchar(64), proposal_id int8, processed bool, voting_status varchar(32), created timestamp(6),  PRIMARY KEY (uuid)) WITH (OIDS=FALSE);')
}).catch(error => {
  console.log(error);
})

//swaps
db.none('DROP TABLE IF EXISTS swaps').then(el => {
  db.none('CREATE TABLE "swaps" ( uuid char(36) NOT NULL, token_uuid char(36), eth_address varchar(64), bnb_address varchar(64), amount varchar(32), deposit_transaction_hash varchar(128), transfer_transaction_hash varchar(128), processed bool, created timestamp(6), client_account_uuid char(36), direction text,  PRIMARY KEY (uuid) ) WITH (OIDS=FALSE);')
}).catch(error => {
  console.log(error);
})

//tokens
db.none('DROP TABLE IF EXISTS tokens').then(el => {
  db.none('CREATE TABLE tokens ( uuid char(36) NOT NULL, name varchar(64), symbol varchar(10), unique_symbol varchar(32), total_supply varchar(64), erc20_address varchar(64), eth_account_uuid char(36), bnb_account_uuid char(36), processed bool, listing_proposed bool, listing_proposal_uuid char(36), listed bool, created char(36), mintable bool, minimum_swap_amount varchar(32), fee_per_swap varchar(32), process_date char(36), bnb_to_eth_enabled boolean, eth_to_bnb_enabled boolean, PRIMARY KEY (uuid)) WITH (OIDS=FALSE);')
  .then(i => {
    db.none("INSERT INTO tokens (uuid, name, symbol, unique_symbol, total_supply, erc20_address, eth_account_uuid, bnb_account_uuid, processed, listing_proposed, listing_proposal_uuid, listed, created, mintable, minimum_swap_amount, fee_per_swap, process_date, bnb_to_eth_enabled, eth_to_bnb_enabled) VALUES ('d7bb664a-6b4b-29e5-8f40-b6ef699a58dd', 'Mesefa', 'SEFA', 'SEFA-E02','30,000,000','0xd0352a019e9ab9d757776f532377aaebd36fd541', 'd7bb664a-6b4b-29e5-8f40-b6ef699a58dd', 'd7bb664a-6b4b-29e5-8f40-b6ef699a58dd', true, false, '1577836', true, '1577836', false, '1', '0.02', '', true, true)")
  })
}).catch(error => {
  console.log(error);
})
//"INSERT INTO tokens (uuid, symbol, unique_symbol, total_supply, erc20_address, eth_account_uuid, bnb_account_uuid, processed, listing_proposed, listing_proposal_uuid, listed, created, mintable, minimum_swap_amount, fee_per_swap, process_date, bnb_to_eth_enabled, eth_to_bnb_enabled) VALUES ('0xAB65aa55175cf0429b0eC3153637e5feBd5920E8', '100', '100', false, false, '', true, '', false, '1', '0.02', '', true, true)"




module.exports = {
  pgp, db
}


exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('accounts', function(table) {
      table.varchar('account_id').primary();
      table.unique('account_id');
      table.string('name', 100).nullable();
      table.string('email', 100).nullable();
      table.string('provider', 20).notNullable();
      table.string('org_unit', 20).notNullable();
      table.string('sync_state', 20).notNullable();
      table.varchar('cursor');
    }),
    knex.schema.createTableIfNotExists('folders', function(table) {
      table.varchar('folder_id').primary();
      table.unique('folder_id');
      table.varchar('account_id').references('accounts.account_id');
      table.string('display_name', 100).nullable();
      table.string('color', 6).notNullable();
      table.integer('count').nullable();
    }),
    knex.schema.createTableIfNotExists('messages', function(table) {
      table.varchar('message_id').primary();
      table.unique('message_id');
      table.varchar('account_id').references('accounts.account_id');
      table.varchar('thread_id').nullable(); //foreign key to threads if we import threads
      table.varchar('subject').nullable();
      table.string('color', 7).notNullable();
      table.json('from').notNullable(); //arrays need to be JSON.stringified 
      table.json('to').notNullable();
      table.json('cc').nullable();
      table.json('bcc').nullable();
      table.json('reply_to').nullable();
      table.timestamp('date_received').notNullable().index().defaultTo(knex.fn.now()); //index for table
      table.boolean('unread').notNullable();
      table.boolean('starred').notNullable();
      table.string('snippet', 500).nullable();
      table.text('body').nullable(); //text type
      table.json('files').nullable();
      table.json('events').nullable();
      table.json('folders').nullable();
      table.json('labels').nullable();
    }),
    knex.schema.createTableIfNotExists('sortedMessages', function(table) {
      table.increments('id').unsigned().primary();
      table.varchar('message_id');
      table.varchar('folder_id');
      table.foreign('message_id').references('messages.message_id');
      table.foreign('folder_id').references('folders.folder_id');
    }),
    knex.schema.createTableIfNotExists('contacts', function(table) {
      table.varchar('account_id').references('accounts.account_id'); //already a primary key
      table.json('contact_id');
      table.varchar('email').nullable();
      table.varchar('name').nullable();
      table.json('phone_numbers').nullable();
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.raw('DROP TABLE accounts CASCADE'),
    knex.raw('DROP TABLE folders CASCADE'),
    knex.raw('DROP TABLE messages CASCADE'),
    knex.raw('DROP TABLE "sortedMessages" CASCADE')
    // knex.raw('DROP TABLE contacts CASCADE')
  ]);
};

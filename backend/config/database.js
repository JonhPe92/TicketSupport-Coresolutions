module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', '10.10.130.94'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'core'),
      user: env('DATABASE_USERNAME', 'core'),
      password: env('DATABASE_PASSWORD', 'C0rE.Cloud!2022$$'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});

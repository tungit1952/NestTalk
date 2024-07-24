export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    db: {
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        password: process.env.DATABASE_PASSWORD,
        username: process.env.DATABASE_USERNAME,
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}'
        ],
        database: process.env.DATABASE_NAME,
        synchronize: true,
        logging: true,
    },
    secret_jwt:process.env.SECRET_JWT
});
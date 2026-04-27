export const env = {
    accessSecret: process.env.JWT_ACCESS_SECRET ?? "",
    refreshSecret: process.env.JWT_REFRESH_SECRET ?? "", 
    accessTtl: process.env.JWT_ACCESS_EXPIRES_IN ?? 900000,
    refreshTtl: process.env.JWT_REFRESH_EXPIRES_IN ?? 2.88e+7,
};
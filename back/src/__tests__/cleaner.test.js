import request from 'supertest';
import app from '../app.js';
import bcrypt from 'bcrypt';
import { signAccessToken } from '../utils/jwt.js';
import prisma from '../config/prisma.js';

const setupDatabase = async () => {
  await prisma.cleaner.deleteMany();
  await prisma.usuario.deleteMany();

  const hashedPassword = await bcrypt.hash('password123', 10);
  const user = await prisma.usuario.create({
    data: {
      nome: 'Auth User',
      email: 'auth@example.com',
      senha: hashedPassword,
      tipoUsuario: 'ADMIN',
    },
  });

  const token = signAccessToken({ userId: user.id, tipoUsuario: user.tipoUsuario });
  return { user, token };
};

describe('Cleaner Management', () => {
  let authToken;

  beforeAll(async () => {
    await prisma.cleaner.deleteMany();
    await prisma.usuario.deleteMany();

    const { token } = await setupDatabase();
    authToken = token;
  });

  afterAll(async () => {
    await prisma.cleaner.deleteMany();
    await prisma.usuario.deleteMany();
  });

  it('should create a new cleaner successfully when authenticated', async () => {
    const res = await request(app)
      .post('/api/cleaner')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'New Cleaner',
        email: 'new.cleaner@example.com',
        phone: '1122334455',
      });
    expect(res.statusCode).toEqual(201);
    testCleanerId = res.body.id;
  });

  it('should not create a cleaner without authentication', async () => {
    const res = await request(app)
      .post('/api/cleaner')
      .send({
        nome: 'Unauthorized Cleaner',
        email: 'unauth@example.com',
        telefone: '9988776655',
        serviceType: 'Commercial',
      });
    expect(res.statusCode).toEqual(401);
  });
});

import request from 'supertest';
import app from '../app.js';
import prisma from '../config/prisma.js';

describe('User Authentication and Management', () => {
  let authToken;
  let testUserId;

  beforeAll(async () => {
    await prisma.usuario.deleteMany();
    
    // Registrar um usuário de teste
    const res = await request(app)
      .post('/api/usuario/register')
      .send({
        nome: 'Test User',
        email: 'test@example.com',
        senha: 'password123',
        tipoUsuario: 'ADMIN',
      });
    testUserId = res.body.id;

    // Login para obter o token
    const loginRes = await request(app)
      .post('/api/usuario/login')
      .send({
        email: 'test@example.com',
        senha: 'password123',
      });
    authToken = loginRes.body.accessToken;
  });

  afterAll(async () => {
    await prisma.usuario.deleteMany();
  });

  it('should register a new user successfully', async () => {
    const registerRes = await request(app)
      .post('/api/usuario/register')
      .send({
        nome: 'Another User',
        email: 'another.user@example.com',
        senha: 'password456',
        tipoUsuario: 'USER',
      });
    expect(registerRes.statusCode).toEqual(201);
    expect(registerRes.body).toHaveProperty('id');
    expect(registerRes.body).toHaveProperty('email', 'another.user@example.com');
    await prisma.usuario.delete({ where: { id: registerRes.body.id } });
  });

  it('should not register a user with an existing email', async () => {
    const res = await request(app)
      .post('/api/usuario/register')
      .send({
        nome: 'Another Test User',
        email: 'test@example.com',
        senha: 'anotherpassword',
        tipoUsuario: 'USER',
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Email já cadastrado');
  });

  it('should not register a user with invalid/missing data', async () => {
    const res = await request(app)
      .post('/api/usuario/register')
      .send({
        nome: 'Invalid User',
        email: 'invalid-email',
        senha: '',
        tipoUsuario: 'USER',
      });
    expect(res.statusCode).toEqual(400);
  });

  it('should not log in with invalid email', async () => {
    const res = await request(app)
      .post('/api/usuario/login')
      .send({
        email: 'nonexistent@example.com',
        senha: 'password123',
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'Email ou senha inválidos');
  });

  it('should not log in with incorrect password', async () => {
    const res = await request(app)
      .post('/api/usuario/login')
      .send({
        email: 'test@example.com',
        senha: 'wrongpassword',
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'Email ou senha inválidos');
  });

  it('should retrieve user by ID when authenticated', async () => {
    const res = await request(app)
      .get(`/api/usuario/${testUserId}`)
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', testUserId);
  });

  it('should return 404 for non-existent user ID when authenticated', async () => {
    const nonExistentId = 999999;
    const res = await request(app)
      .get(`/api/usuario/${nonExistentId}`)
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.statusCode).toEqual(404);
  });

  it('should not retrieve user by ID without authentication', async () => {
    const res = await request(app)
      .get(`/api/usuario/${testUserId}`);
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'Token não fornecido');
  });
});

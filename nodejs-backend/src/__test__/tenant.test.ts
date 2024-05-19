import supertest from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import createServer from '../utils/server';
import mongoose from 'mongoose';
import { signJwt } from '../utils/jwt.utils';
import { createTenant } from '../service/tenant.service';
import { createUser } from '../service/user.service';

const app = createServer();
const userId = new mongoose.Types.ObjectId().toString();

export const tenantPayload = {
  user: userId,
  firstName: 'string',
  lastName: 'string',
  email: 'example@example.com',
  apartmentNumber: '1',
  phone: '1234567890',
  moveInDate: '2022-01-01',
  moveOutDate: '2022-12-31',
  emergencyContactName: 'Jane Doe',
  emergencyContactPhoneNumber: '0987654321',
  activeTenant: true,
};

export const userPayload = {
  _id: userId,
  email: 'jane.doe@example.com',
  password: 'JaneDoe',
  passwordConfirmation: 'JaneDoe',
  role: 'admin',
};

export const userAuth = {
  email: 'test@example.com',
  password: 'Password456!',
};

describe('Tenant', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe('get Tenant route', () => {
    describe('given tenant does not exist', () => {
      it('should return 404', async () => {
        const tenantId = new mongoose.Types.ObjectId().toString();
        const token = signJwt(userPayload);
        const res = await supertest(app)
          .get(`/api/tenants/${tenantId}`)
          .set('Authorization', `Bearer ${token}`)
          .expect(404);
      });
    });

    describe('given the user is not logged in', () => {
      it('should return a 403', async () => {
        const tenantId = Math.floor(1000 + Math.random() * 9000);
        const tenantPayload = {
          user: userId,
          firstName: 'string',
          lastName: 'string',
          email: 'exampxle@example.com',
          apartmentNumber: '1',
          phone: '1234567840',
          moveInDate: '2022-01-01',
          moveOutDate: '2022-12-31',
          emergencyContactName: 'Jane Doe',
          emergencyContactPhoneNumber: '0987604321',
          activeTenant: true,
        };
        const user = await createTenant({
          ...tenantPayload,
          user: userId,
          tenantId: tenantId,
        });
        
        const { statusCode } = await supertest(app).get(`/api/tenants/${tenantId}`);
        expect(statusCode).toBe(403);
      });
    });

    describe('given the user logged in', () => {
      it('Should return a 200 and the tenant', async () => {
        const tenantId = Math.floor(1000 + Math.random() * 9000);
        const user = await createUser({ ...userPayload, name: userId });
        const token = signJwt(user);
        await createTenant({
          ...tenantPayload,
          user: user._id,
          tenantId: tenantId,
        });
        const { body, statusCode } = await supertest(app)
          .get(`/api/tenants/${tenantId}`)
          .set('Authorization', `Bearer ${token}`)
          .send(tenantPayload);

        expect(statusCode).toBe(200);
        expect(body).toEqual({
          _id: expect.any(String),
          tenantId: tenantId,
          user: user.name,
          firstName: 'string',
          lastName: 'string',
          email: 'example@example.com',
          apartmentNumber: '1',
          phone: '1234567890',
          moveInDate: '2022-01-01',
          moveOutDate: '2022-12-31',
          emergencyContactName: 'Jane Doe',
          emergencyContactPhoneNumber: '0987654321',
          activeTenant: true,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          __v: 0,
        });
      });
    });
  });

});
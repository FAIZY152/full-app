import request from "supertest";
import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import mongoose from "mongoose";
import app from "../../src/index";
import dotenv from "dotenv";
import UserModel from "../../src/models/UserSchema";
import bcrypt from "bcrypt";

dotenv.config({ path: ".env.test" });

const API_BASE = "/api/v1/auth";

describe("User Authentication Tests", () => {
  let testEmail = "testuser@example.com";
  let testPassword = "Test@1234";

  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.TEST_DB as string);
    }
  });

  beforeEach(async () => {
    // ✅ Clear users before each test
    await UserModel.deleteMany();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should register a new user", async () => {
    const res = await request(app).post(`${API_BASE}/register`).send({
      fullname: "Test User",
      email: testEmail,
      password: testPassword,
      phone: "+1234567890",
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("should not allow duplicate email registration", async () => {
    // ✅ First registration
    await request(app).post(`${API_BASE}/register`).send({
      fullname: "Test User",
      email: testEmail,
      password: testPassword,
      phone: "+1234567890",
    });

    // ✅ Second registration should fail
    const res = await request(app).post(`${API_BASE}/register`).send({
      fullname: "Test User",
      email: testEmail,
      password: testPassword,
      phone: "+1234567890",
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Email already exists");
  });

  it("should regester and return user data", async () => {
    // ✅ First, register the user
    await request(app).post(`${API_BASE}/register`).send({
      fullname: "Test User",
      email: testEmail,
      password: testPassword,
      phone: "+1234567890",
    });

    // ✅ Now, attempt to login
    const res = await request(app).post(`${API_BASE}/login`).send({
      email: testEmail,
      password: testPassword,
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("user");
    expect(res.body.success).toBe(true);
  });

  describe("User Login Tests", () => {
    it("should login with correct credentials", async () => {
      // ✅ First, register the user
      await request(app).post(`${API_BASE}/register`).send({
        fullname: "Test User",
        email: testEmail,
        password: testPassword,
        phone: "+1234567890",
      });

      // ✅ Now, attempt to login
      const res = await request(app).post(`${API_BASE}/login`).send({
        email: testEmail,
        password: testPassword,
      });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("user");
      expect(res.body.success).toBe(true);
    });

    it("should not login with incorrect password", async () => {
      // ✅ First, register the user
      await request(app).post(`${API_BASE}/register`).send({
        fullname: "Test User",
        email: testEmail,
        password: testPassword,
        phone: "+1234567890",
      });

      // ✅ Attempt to login with wrong password
      const res = await request(app).post(`${API_BASE}/login`).send({
        email: testEmail,
        password: "WrongPassword123",
      });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Password is not correct");
    });

    it("should not login with non-existent email", async () => {
      const res = await request(app).post(`${API_BASE}/login`).send({
        email: "doesnotexist@example.com",
        password: testPassword,
      });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Email not found");
    });

    it("should correctly compare hashed passwords", async () => {
      const plainPassword = "SecurePass123";
      const hashedPassword = await bcrypt.hash(plainPassword, 10);

      const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
      const isIncorrectMatch = await bcrypt.compare(
        "WrongPassword",
        hashedPassword
      );

      expect(isMatch).toBe(true);
      expect(isIncorrectMatch).toBe(false);
    });
  });
});

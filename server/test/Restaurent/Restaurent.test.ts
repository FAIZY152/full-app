import request from "supertest";
import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import mongoose from "mongoose";
import app from "../../src/index";
import dotenv from "dotenv";
import path from "path";
import ResturentModel from "../../src/models/ResturentSchema";

dotenv.config({ path: ".env.test" });

const API_BASE = "/api/v1/restaurants";

describe("Restaurant Creation Tests", () => {
  let authToken: string;

  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.TEST_DB as string);
    }

    // Create a test user and get a token
    const userRes = await request(app).post("/api/v1/auth/register").send({
      fullname: "Test User",
      email: "testuser@example.com",
      password: "Test@1234",
      phone: "+1234567890",
    });

    authToken = userRes.body.token;
  });

  beforeEach(async () => {
    await ResturentModel.deleteMany(); // Clear restaurant data before each test
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should create a new restaurant", async () => {
    const filePath = path.join(__dirname, "../images/rss.png");
    const res = await request(app)
      .post(`${API_BASE}/create-resturent`)
      .set("Authorization", `Bearer ${authToken}`)
      .field("resturentName", "Test Restaurant")
      .field("city", "New York")
      .field("country", "USA")
      .field("deliveryPrice", "5.99") // Ensure this is a string
      .field("deliveryTime", "30-40 mins")
      .field("cusines", "Italian, Chinese, Mexican")
      .attach("file", filePath);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.restaurant).toHaveProperty("restaurant");
  });

  it("should not create a restaurant if required fields are missing", async () => {
    const res = await request(app)
      .post(`${API_BASE}/create-resturent`)
      .set("Authorization", `Bearer ${authToken}`)
      .field("city", "New York"); // Missing required fields

    expect(res.status).toBe(404);
  });
});

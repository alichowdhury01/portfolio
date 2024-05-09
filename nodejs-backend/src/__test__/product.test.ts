import mongoose from "mongoose";

import supertest from "supertest";

import { MongoMemoryServer } from "mongodb-memory-server";
import { describe, it, expect } from "@jest/globals";
const userId = new mongoose.Types.ObjectId().toString();

export const productPayload = {
  user: userId,
  title: "Canon EOS 1500D DSLR Camera with 18-55mm Lens",
  description:
    "Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.",
  price: 879.99,
  image: "https://i.imgur.com/QlRphfQ.jpg",
};

export const userPayload = {
  _id: userId,
  email: "jane.doe@example.com",
  name: "Jane Doe",
};

describe("Product", () => {
    describe("get product route", () => {
        describe("given the product does not exist", () => {
            it("should return 404", async () => {
                const productId = "product-id";
                
                expect(true).toBe(true);
            });
        });

        describe("given the product exists", () => {
            it("should return a 200 status and the product", async () => {
                
            });
        });
    });
});


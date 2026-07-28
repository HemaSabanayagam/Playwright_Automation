import dotenv from "dotenv";
dotenv.config();

export const BASE_URL = process.env.BASE_URL || "https://www.saucedemo.com/";
export const API_BASE_URL = process.env.API_BASE_URL || "https://restful-booker.herokuapp.com";
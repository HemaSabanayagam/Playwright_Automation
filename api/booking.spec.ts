import { test, expect, request, APIRequestContext } from "@playwright/test";
import { APIUtils } from "../utils/APIUtils";
import { API_BASE_URL } from "../utils/env";

const authRequestValue: any =
{
    username: "admin",
    password: "password123"
}

const details: any =
{
    "firstname": "Jim",
    "lastname": "Brown",
    "totalprice": 111,
    "depositpaid": true,
    "bookingdates": {
        "checkin": "2026-12-01",
        "checkout": "2026-12-10"
    },
    "additionalneeds": "Breakfast"
}

const update_details: any =
{
    "firstname": "Jim",
    "lastname": "Brown",
    "totalprice": 222,
    "depositpaid": true,
    "bookingdates": {
        "checkin": "2026-12-01",
        "checkout": "2026-12-10"
    },
    "additionalneeds": "Breakfast"
}

let apiContext: APIRequestContext;
let apiUtils: APIUtils;
let bookingID: number;
let token: string;

test.describe.serial('API booking flow', () => {
    test.beforeAll(async () => {
        apiContext = await request.newContext(
            {
                baseURL: API_BASE_URL,
            });
        apiUtils = new APIUtils(apiContext);
    });

    test.afterAll(async () => {
        await apiContext.dispose();

    })

    //get token
    test('create token', async () => {
        const createToken = await apiUtils.createToken(authRequestValue);
        expect(createToken.status).toBe(200);
        expect(createToken.token).toBeTruthy();
        token = createToken.token;
        console.log(token);
    });

    //create booking
    test('create bookingID', async () => {
        const booking = await apiUtils.createBooking(details);
        expect(booking.status).toBe(200);
        expect(booking.bookingid).toBeDefined();
        bookingID = booking.bookingid;
        console.log(booking.bookingid);
    });

    //get booking 
    test('Get booking details', async () => {
        const information = await apiUtils.getBooking(bookingID);
        expect(information.data.firstname).toBe('Jim');
        expect(information.data.lastname).toBe('Brown');
    });

    //update booking
    test('Update booking details', async () => {
        const updated_information = await apiUtils.updateBooking(bookingID, update_details, token);
        expect(updated_information.data.totalprice).toBe(222);
    });

    //delete booking
    test('delete booking details', async () => {
        const result = await apiUtils.deletebooking(bookingID, token);
        expect(result.status).toBe(201);
        console.log(result.status);
    });
});
import { APIRequestContext, expect } from "@playwright/test";

export class APIUtils {
    private apiContext: APIRequestContext;
    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
    }

    async createToken(authRequestValue: any) {
        const response = await this.apiContext.post('/auth', {
            data: authRequestValue
        });
        const responseJson = await response.json();
        if (!responseJson.token) {
            throw new Error("Failed to get token");
        } else {
            return {
                status: response.status(),
                token: responseJson.token
            }
        };
    }

    async createBooking(details: any) {
        const booking = await this.apiContext.post('/booking', {
            data: details
        });
        const bookingJson = await booking.json();
        return {
            status: booking.status(),
            bookingid: bookingJson.bookingid
        };
    }

    async getBooking(bookingID: number) {
        const bookinginformation = await this.apiContext.get(`/booking/${bookingID}`);
        const bookinginformationJson = await bookinginformation.json();
        return {
            status: bookinginformation.status(),
            data: bookinginformationJson
        }
    }

    async updateBooking(bookingID: number, update_details: any, token: string) {
        const updated_bookinginformation = await this.apiContext.put(`/booking/${bookingID}`, {
            data: update_details,
            headers: { Cookie: `token=${token}` }
        });
        const updated_bookingJson = await updated_bookinginformation.json();
        return {
            status: updated_bookinginformation.status(),
            data: updated_bookingJson
        }
    }

    async deletebooking(bookingID: number, token: string) {
        const delete_booking = await this.apiContext.delete(`/booking/${bookingID}`, {
            headers: { Cookie: `token=${token}` }
        });
        expect(delete_booking.status()).toBe(201);
        return {
            status: delete_booking.status()
        };
    }
}
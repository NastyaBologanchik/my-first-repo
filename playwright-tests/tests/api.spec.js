const { test, expect } = require('@playwright/test');

const data = {
  baseUrl: 'https://restful-booker.herokuapp.com',
  token: undefined,
  bookingId: undefined,
};

const testBooking = {
  firstname : 'Jim',
  lastname : 'Brown',
  totalprice : 111,
  depositpaid : true,
  bookingdates : {
    checkin : '2018-01-01',
    checkout : '2019-01-01'
  },
  additionalneeds : 'Breakfast'
};

test.beforeAll(async ({ request }) => {
  const response = await request.post(`${data.baseUrl}/auth`, {
    data: {
      username: 'admin',
      password: 'password123'
    }
  });
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  data.token = responseBody.token;
});

test.describe('API-тесты для Restful-booker', () => {
  test('Создает новое бронирование', async ({ request }) => {
    const response = await request.post(`${data.baseUrl}/booking`, {
      data: testBooking
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();

    expect(responseBody.bookingid).toBeDefined();
    expect(responseBody.booking).toBeDefined();
    expect(responseBody.booking.firstname).toBe(testBooking.firstname);
    expect(responseBody.booking.lastname).toBe(testBooking.lastname);
    expect(responseBody.booking.totalprice).toBe(testBooking.totalprice);
    expect(responseBody.booking.depositpaid).toBe(testBooking.depositpaid);
    expect(responseBody.booking.bookingdates).toBeDefined();
    expect(responseBody.booking.bookingdates.checkin).toBe(testBooking.bookingdates.checkin);
    expect(responseBody.booking.bookingdates.checkout).toBe(testBooking.bookingdates.checkout);
    expect(responseBody.booking.additionalneeds).toBe(testBooking.additionalneeds);

    data.bookingId = responseBody.bookingid;
  });

  test('Возвращает бронирование по id', async ({ request }) => {
    const response = await request.get(`${data.baseUrl}/booking/${data.bookingId}`);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();

    expect(responseBody.firstname).toBe(testBooking.firstname);
    expect(responseBody.lastname).toBe(testBooking.lastname);
    expect(responseBody.totalprice).toBe(testBooking.totalprice);
    expect(responseBody.depositpaid).toBe(testBooking.depositpaid);
    expect(responseBody.bookingdates).toBeDefined();
    expect(responseBody.bookingdates.checkin).toBe(testBooking.bookingdates.checkin);
    expect(responseBody.bookingdates.checkout).toBe(testBooking.bookingdates.checkout);
    expect(responseBody.additionalneeds).toBe(testBooking.additionalneeds);
  });

  test('Обновляет бронирование по id', async ({ request }) => {
    const bookingToUpdate = {
      firstname : testBooking.firstname,
      lastname : 'test_user',
      totalprice : 200,
      depositpaid : testBooking.depositpaid,
      bookingdates : {
        checkin: testBooking.bookingdates.checkin,
        checkout:  testBooking.bookingdates.checkout,
      },
      additionalneeds : testBooking.additionalneeds
    };

    const response = await request.put(`${data.baseUrl}/booking/${data.bookingId}`, {
      headers: {
        cookie: `token=${data.token}`
      },
      data: bookingToUpdate,
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();

    expect(responseBody.firstname).toBe(bookingToUpdate.firstname);
    expect(responseBody.lastname).toBe(bookingToUpdate.lastname);
    expect(responseBody.totalprice).toBe(bookingToUpdate.totalprice);
    expect(responseBody.depositpaid).toBe(bookingToUpdate.depositpaid);
    expect(responseBody.bookingdates).toBeDefined();
    expect(responseBody.bookingdates.checkin).toBe(bookingToUpdate.bookingdates.checkin);
    expect(responseBody.bookingdates.checkout).toBe(bookingToUpdate.bookingdates.checkout);
    expect(responseBody.additionalneeds).toBe(bookingToUpdate.additionalneeds);
  });

  test('Удаляет бронирование по id', async ({ request }) => {
    let response = await request.delete(`${data.baseUrl}/booking/${data.bookingId}`, {
      headers: {
        cookie: `token=${data.token}`
      }
    });
    expect(response.status()).toBe(201);

    response = await request.get(`${data.baseUrl}/booking/${data.bookingId}`);
    expect(response.status()).toBe(404);
  });
});
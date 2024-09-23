import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { DashboardPage } from './pages/dashboard-page';
import { CreateBill } from './pages/create-bills-page';
import { CreateClient } from './pages/create-client-page';
import { CreateRoom } from './pages/create-room-page';
import { EditClient } from './pages/edit-client-page';
import { DeleteBills } from './pages/delete-bills-page';
import { CreateReservation } from './pages/create-reservation-page';
import { EditReservation } from './pages/edit-reservation-page';
import { CreateBillsChooseInReservation } from './pages/create-bills-choose-in-reservation-page';

test('Test case 01', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.goto();
  await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`);

  await dashboardPage.performLogout();
});


test('Test case 02', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.performLogin('tester01', 'hej123');

  await expect(page.locator('#app > div > div')).toBeVisible();
});


test('Test case 03', async ({ page }) => {
  const createBill = new CreateBill(page);
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`);

  await createBill.createNewBill('5000');
  await createBill.verifyBillCreated();
});


test('Test case 04', async ({ page }) => {
  const createClient = new CreateClient(page);
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`);

  await createClient.createNewClient('GunnarGren', 'GunnarGren@gmail.com', '0700000000');
  await createClient.verifyClientCreated();
});


test('Test case 05', async ({ page }) => {
  const createRoom = new CreateRoom(page);
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`);
  await createRoom.createNewRoom({
    roomNumber: '401',
    floor: '4',
    price: '8000',
    categoryIndex: 2,
    featureIndex: 0
  });
  await createRoom.verifyRoomCreated();
});


test('Test case 06', async ({ page }) => {
  const editClient = new EditClient(page);
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`);
  await editClient.editClient('Pernilla Svensson', 'PernillaSvensson@gmail.com', '0700000000');
  await editClient.verifyClientEdited();
});


test('Test case 07', async ({ page }) => {
  const deleteBills = new DeleteBills(page);
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`);
  await deleteBills.deleteFirstBill();
  await deleteBills.verifyBillDeleted();
});


test('Test case 08', async ({ page }) => {
  const createReservation = new CreateReservation(page);
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`);

  await createReservation.createNewReservation('2024-05-05', '2024-05-06', 3, 1, 1);
  await createReservation.verifyReservationCreated();
});


test('Test case 09', async ({ page }) => {
  const editReservation = new EditReservation(page);
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`);

  await editReservation.editExistingReservation('2024-05-08', '2024-05-09', 3, 1, 1);
  await editReservation.verifyReservationEdited();
});


test('Test case 10', async ({ page }) => {
  const createBillsChooseInReservation = new CreateBillsChooseInReservation(page);
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`);

  await createBillsChooseInReservation.createBill('4500');
  await createBillsChooseInReservation.createReservation('2024-09-20', '2024-09-21', 1, 1, 2);
  await createBillsChooseInReservation.verifyReservationCreated();
});
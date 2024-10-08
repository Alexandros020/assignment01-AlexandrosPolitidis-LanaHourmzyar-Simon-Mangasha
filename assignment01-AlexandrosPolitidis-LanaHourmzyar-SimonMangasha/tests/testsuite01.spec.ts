import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { DashboardPage } from './pages/dashboard-page';
import { CreateBill } from './pages/create-bills-page';
import { CreateClient } from './pages/create-client-page';
import { CreateRoom } from './pages/create-room-page';
import { EditClient } from './pages/edit-client-page';
import { DeleteBills } from './pages/delete-bills-page';
import { CreateReservation } from './pages/create-reservation-page';

test('Test case 01', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.goto();
  await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
  await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
  await dashboardPage.performLogout();
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  await page.waitForTimeout(5000);

});


test('Test case 02', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.usernameTextfield.fill('tester01');
  await loginPage.passwordTextfield.fill('hej123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.locator('#app > div > div')).toBeVisible();
});

test('Test case 03', async ({ page }) => {
  const createBill = new CreateBill(page);

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`);
  await createBill.billsView.click();
  await createBill.createBillBtn.click();
  await createBill.value.fill('5000');
  await createBill.save.click();
  await expect(page.locator('#app > div > div.bills > div:nth-child(2) > h3')).toBeVisible();

});

test('Test case 04', async ({ page }) => {
  const createClient = new CreateClient(page);

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`);
  await createClient.clientView.click();
  await createClient.createClientBtn.click();
  await createClient.name.fill('GunnarGren');
  await createClient.email.fill('GunnarGren@gmail.com');
  await createClient.telephone.fill('0700000000');
  await createClient.save.click();
  await expect(page.locator('#app > div > div.clients > div:nth-child(3)')).toBeVisible();

});

test('Test case 05', async ({ page }) => {
  const createRoom = new CreateRoom(page);

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
  await createRoom.roomView.click();
  await createRoom.createRoomBtn.click();
  await createRoom.category.selectOption({ index: 2 });
  await createRoom.number.fill('401');
  await createRoom.floor.fill('4');
  await createRoom.available.click();
  await createRoom.price.fill('8000');
  await createRoom.features.selectOption({ index: 0 });
  await createRoom.save.click();
  // await expect(page).toHaveURL(/rooms$/); chatgpts kod
  await expect(page.locator('#app > div > div.rooms > div:nth-child(3)')).toBeVisible();

});

test('Test case 06', async ({ page }) => {
  const editClient = new EditClient(page);

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`);
  await editClient.clientView.click();
  await editClient.dotsBtn.click();
  await editClient.editClientBtn.click();
  await editClient.name.fill('PernillaSvensson');
  await editClient.email.fill('PernillaSvensson@gmail.com');
  await editClient.telephone.fill('0700000000');
  await editClient.save.click();
  await expect(page.locator('#app > div > div.clients > div:nth-child(1)')).toBeVisible();

});

test('Test case 07', async ({ page }) => {
  const deleteBills = new DeleteBills(page);

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
  await deleteBills.billsView.click();
  await deleteBills.dotsBtn.click();
  await deleteBills.deleteBtn.click();
  await expect(page.locator('#app > div > div.bills > div:nth-child(1) > div.paid')).toBeVisible();

});

test('Test case 08', async ({ page }) => {
  const createreservation = new CreateReservation(page);

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
  await createreservation.reservationView.click();
  await createreservation.createReservationBtn.click();
  await createreservation.Start.fill('2024-05-05');
  await createreservation.End.fill('2024-05-06');
  await createreservation.Client.selectOption({ index: 3 });
  await createreservation.Room.selectOption({ index: 1 });
  await createreservation.Bill.selectOption({ index: 1 });
  await createreservation.save.click();
  await expect(page.locator('#app > div > div.reservations > div:nth-child(2) > div.end')).toBeVisible();

});










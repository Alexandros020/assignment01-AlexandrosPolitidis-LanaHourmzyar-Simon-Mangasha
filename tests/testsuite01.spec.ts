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
  await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
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
  await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
  await createClient.clientView.click();
  await createClient.createClientBtn.click();
  await createClient.name.fill('GunnarGren');
  await createClient.email.fill('GunnarGren@gmail.com');
  await createClient.telephone.fill('0700000000');
  await createClient.save.click();
  await expect(page.locator('#app > div > div.clients > div:nth-child(3)')).toBeVisible();


});
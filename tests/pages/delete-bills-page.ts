import { expect, type Locator, type Page } from '@playwright/test';

export class DeleteBills {
  readonly page: Page;
  readonly billsView: Locator;
  readonly dotsBtn: Locator;
  readonly deleteBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.billsView = page.locator('#app > div > div > div:nth-child(3) > a');
    this.dotsBtn = page.locator('#app > div > div.bills > div:nth-child(1) > div.action > img');
    this.deleteBtn = page.locator('#app > div > div.bills > div:nth-child(1) > div.menu > a:nth-child(2)');
  }

  async deleteFirstBill() {
    await this.billsView.click();
    await this.dotsBtn.click();
    await this.deleteBtn.click();
  }

  async verifyBillDeleted() {
    await expect(this.page.locator('#app > div > div.bills > div:nth-child(1) > div.paid')).toBeVisible();
  }
}

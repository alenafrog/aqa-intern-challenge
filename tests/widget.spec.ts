import { test, expect } from '@playwright/test';
import {WidgetPage} from "./widget.page";

test.describe('Uchi.ru widget ', () => {
  let widgetPage: WidgetPage;

  test.beforeEach(async ({page}) => {
    widgetPage = new WidgetPage(page);

    // open uchi.ru main page
    await page.goto('/');

    // close cookies popup
    await page.click('._UCHI_COOKIE__button');
  });

  test('opens', async ({page}) => {
    await widgetPage.openWidget();

    await expect(widgetPage.getWidgetBody()).toBeVisible();
  });

  test('has correct title', async ({ page }) => {
    await widgetPage.openWidget();
	
	  await expect(widgetPage.getWidgetBody()).toBeVisible();

    const articles = await widgetPage.getPopularArticles();
	  await expect(articles).toHaveCount(5);

    await articles.nth(1).click();

    await widgetPage.clickWriteToUs();

    expect(await widgetPage.getTitle()).toEqual('Связь с поддержкой');
  });
});

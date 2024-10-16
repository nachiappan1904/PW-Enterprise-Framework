import {test} from "@playwright/test";
import LoginPage from "../pages/LoginPage";

test("test",async ({page})=>{
const loginPage = new LoginPage(page);

await loginPage.navigateToLoginPage();
await loginPage.fillUsername("nachi@testleaf.com");
await loginPage.fillPassword("Portal1!");
const homePage = await loginPage.clickLoginButton();
await homePage.expectSetupTitleToBeVisible();

});
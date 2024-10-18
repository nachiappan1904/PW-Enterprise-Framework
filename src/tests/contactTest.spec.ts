import {test} from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import logger from "../utils/LoggerUtil";
import { decrypt } from "../utils/CryptojsUtil";
import cdata from "../testdata/contacts.json"
import { demoOutput } from "../utils/fakerSample";
import { faker } from "@faker-js/faker";

for(const contact of cdata){
test.skip(`Advance Data Driven test for ${contact.firstName} `, async ({ page }) => {
    logger.info("Test for Contact Creation is started...");
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.fillUsername(decrypt(process.env.userid!));
    await loginPage.fillPassword(decrypt(process.env.password!));
    const homePage = await loginPage.clickLoginButton();
    await homePage.expectSetupTitleToBeVisible();
    await homePage.clickAppLauncher();
    await homePage.clickServiceInAppLauncher();
    const contactsPage = await homePage.navigateToContactTab();
    await contactsPage.createNewContact(contact.firstName, contact.lastName);
    await contactsPage.expectContactLabelContainsFirstNameAndLastName(
      contact.firstName,
      contact.lastName
    );
    logger.info("Test for Contact Creation is completed");
  });
}



test("simple Data Driven test with hardcoded value", async ({ page }) => {
    logger.info("Test for Contact Creation is started...");
    const fname = faker.person.firstName('male');
    const lname = faker.person.lastName('male');
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.fillUsername(decrypt(process.env.userid!));
    await loginPage.fillPassword(decrypt(process.env.password!));
    const homePage = await loginPage.clickLoginButton();
    await homePage.expectSetupTitleToBeVisible();
    await homePage.clickAppLauncher();
    await homePage.clickServiceInAppLauncher();
    const contactPage = await homePage.navigateToContactTab();
    await contactPage.createNewContact(fname, lname);
    await contactPage.expectContactLabelContainsFirstNameAndLastName(
      fname,
      lname
    );
    logger.info("Test for Contact Creation is completed");
  });


  test.skip("demo faker", async () => { 

    console.log(demoOutput)
  
   });
import {test} from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import { decrypt, encrypt } from "../utils/CryptojsUtil";
import { decryptEnvFile, encryptEnvFile } from "../utils/Encryptenvfile";
import logger from "../utils/LoggerUtil";

test("TC-123: Login to salesforce",async ({page})=>{
logger.info("TC-123: Login to salesforce");
const loginPage = new LoginPage(page);
await loginPage.navigateToLoginPage();
// console.log(process.env.NODE_ENV);
// console.log(process.env.SALT);
// console.log(decrypt(process.env.userid!));
// console.log(decrypt(process.env.password!));
await loginPage.fillUsername(decrypt(process.env.userid!));
await loginPage.fillPassword(decrypt(process.env.password!));

const homePage = await loginPage.clickLoginButton();
await homePage.expectSetupTitleToBeVisible();
await homePage.clickAppLauncher();
await homePage.clickServiceInAppLauncher();
await homePage.navigateToContactTab();
});

test.skip("Sample env test",({page})=>{
    // console.log(process.env.NODE_ENV);
    // console.log(process.env.userid);
    // console.log(process.env.password);
   
    // const plainText = "Hello, Mars!";
    // const encryptedText = encrypt(plainText);
    // console.log('SALT:',process.env.SALT);
    // console.log('Encrypted:', encryptedText);
    // const decryptedText = decrypt(encryptedText);
    // console.log('Decrpted:', decryptedText);
    // encryptEnvFile();
    // decryptEnvFile();

});
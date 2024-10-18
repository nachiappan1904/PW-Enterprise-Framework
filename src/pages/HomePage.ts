import { Page, expect } from "@playwright/test";
import logger from "../utils/LoggerUtil";
import { info } from "console";
import ContactPage from "./ContactPage";


export default class homePage{
private readonly SetupTitleLocator = "//span[@title='Setup']";
private readonly appLauncherLinkLocator = "App Launcher";
private readonly serviceLinkLocator = "//a[@data-label='Service']";
private readonly contactsLinkLocator = "Contacts"

constructor(private page: Page){

}

async expectSetupTitleToBeVisible(){
await expect(this.page.locator(this.SetupTitleLocator))
.toBeVisible({timeout:15000})
.catch((error)=>{
    logger.error(`Error clicking login button: ${error}`);
    throw error;})
.then(()=>logger.info("Setup Title is visible"));
}

async clickAppLauncher(){
await this.page.getByTitle(this.appLauncherLinkLocator)
                .click()
                .catch((error)=>{
                logger.error("App Luancher option is not clickable");
                throw error;})
                .then(()=>logger.info("Clicked on App launcher icon"));
} 

async clickServiceInAppLauncher(){
    await this.page.locator(this.serviceLinkLocator).click()
    .catch((error)=>{logger.error("Unableto click on Service link in App launcher");throw error})
    .then(()=>logger.info("Clicked on Service link in App launcher"));
}

async navigateToContactTab(){
    await expect(this.page.getByRole('link',{name: this.contactsLinkLocator})).toBeVisible();
    logger.info("Contacts tab is visible")
    await this.page.getByRole('link',{name: this.contactsLinkLocator}).click()
    .catch((error)=>{logger.error('Contacts Tab is not clickable');throw error})
    .then(()=>logger.info("Contacts Tab is clicked"))
    const contactPage = new ContactPage(this.page);
    return contactPage;
}

}
import { Page, expect } from "@playwright/test";
import logger from "../utils/LoggerUtil";


export default class homePage{
private readonly SetupTitleLocator = "//span[@title='Setup']";

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
await expect(this.page.getByTitle("App Launcher"))

}
}
import { Page, expect } from "@playwright/test";


export default class homePage{
private readonly SetupTitleLocator = "//span[@title='Setup']";

constructor(private page: Page){

}

async expectSetupTitleToBeVisible(){
await expect(this.page.locator(this.SetupTitleLocator)).toBeVisible({timeout:15000});
}
}
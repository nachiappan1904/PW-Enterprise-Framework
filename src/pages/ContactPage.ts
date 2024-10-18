import { expect, Page } from "@playwright/test";
import logger from "../utils/LoggerUtil";

export default class ContactPage{

    private readonly newButtonLocator = "New";
    private readonly firstNameTextFieldLocator = "First Name";
    private readonly lastNameTextFieldLocator = "Last Name";
    private readonly saveButtonLocator = "Save";
    private readonly contactFullNameLabelLocator = "//lightning-formatted-name[@slot='primaryField']";
    private readonly ContactsLinkloctor = "Contacts";

constructor(private page: Page){

}

async createNewContact(fname: string, lname:string){
    await this.page.getByRole("button",{name: this.newButtonLocator}).click();
    logger.info("New button isclicked");
    await this.page.getByPlaceholder(this.firstNameTextFieldLocator).click();
    await this.page.getByPlaceholder(this.firstNameTextFieldLocator).fill(fname);
    logger.info(`First nameis filled as ${fname}`);
    await this.page.getByPlaceholder(this.lastNameTextFieldLocator).press("Tab");
    await this.page.getByPlaceholder(this.lastNameTextFieldLocator).fill(lname);
    logger.info(`Last nameis filled as ${lname}`)
    await this.page.getByRole("button",{name: this.saveButtonLocator, exact: true})
    .click().catch((error)=>{
        logger.error(`Error clicking Save button: ${error}`)
    })
    .then(()=>logger.info("Save button is cicked"));
}

async expectContactLabelContainsFirstNameAndLastName(fname: string, lname: string){
await expect(this.page.locator(this.contactFullNameLabelLocator)).toContainText(`${fname} ${lname}`,{timeout:15000});
logger.info(`New Contacted created and ${fname} ${lname} is visible`)
await this.page.getByRole("link",{name: this.ContactsLinkloctor}).click();

}

}
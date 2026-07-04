import { faker } from '@faker-js/faker';
import { ContactPage } from "../pages/contact-page";

export class ContactPageSteps {
    readonly contactPage: ContactPage;

    constructor(contactPage: ContactPage) {
        this.contactPage = contactPage;
    }

    async clickSubmitBtn(): Promise<void> {
        await this.contactPage.submitBtn.click();
    }

    async populateMandatoryFields(): Promise<{ firstName: string; email: string; message: string }> {
        const firstName = faker.person.firstName()
        const email = faker.internet.email()
        const message = faker.lorem.sentence()
        await this.contactPage.forenameTextField.fill(firstName);
        await this.contactPage.emailTextField.fill(email);
        await this.contactPage.messageTextField.fill(message);
        return {
            firstName: firstName,
            email: email,
            message: message
        };
    }
}
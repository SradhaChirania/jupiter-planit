import { ContactPage } from "../pages/contact-page";
import { expect } from "@playwright/test";

export class ContactPageVerification {
    readonly contactPage: ContactPage;

    constructor(contactPage: ContactPage) {
        this.contactPage = contactPage;
    }

    async verifyMandatoryFeildError(): Promise<void> {
        await expect(this.contactPage.mandatoryFieldsError).toBeVisible();
        await expect(this.contactPage.mandatoryForenameError).toBeVisible();
        await expect(this.contactPage.mandatoryEmailError).toBeVisible();
        await expect(this.contactPage.mandatoryMessageError).toBeVisible();
    }

    async verifyMandatoryFeildErrorNotVisible(): Promise<void> {
        await expect(this.contactPage.mandatoryFieldsError).not.toBeVisible();
        await expect(this.contactPage.mandatoryForenameError).not.toBeVisible();
        await expect(this.contactPage.mandatoryEmailError).not.toBeVisible();
        await expect(this.contactPage.mandatoryMessageError).not.toBeVisible();
        await expect(this.contactPage.welcomeMessage).toBeVisible();
    }

    async verifySuccessfulSubmission(firstName: string): Promise<void> {
        await expect(this.contactPage.feedbackAlert).toBeVisible();
        await expect(this.contactPage.successAlert).toBeVisible({timeout:30000});
        await expect(this.contactPage.successAlert).toContainText(`Thanks ${firstName}, we appreciate`)

    }

}
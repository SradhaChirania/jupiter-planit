import {Page,Locator} from '@playwright/test'

export class ContactPage {
    readonly page:Page;
    readonly welcomeMessage: Locator;
    readonly submitBtn: Locator
    readonly mandatoryFieldsError: Locator;
    readonly mandatoryForenameError: Locator;
    readonly mandatoryMessageError: Locator;
    readonly mandatoryEmailError:Locator;
    readonly forenameTextField: Locator;
    readonly emailTextField: Locator;
    readonly messageTextField: Locator;
    readonly surnameTextField: Locator;
    readonly telephone: Locator;
    readonly successAlert: Locator;
    readonly feedbackAlert: Locator;

    constructor(page:Page) {
        this.page = page;
        this.welcomeMessage = page.getByText('We welcome your feedback - tell it how it is');
        this.submitBtn = page.getByRole('link',{name:'Submit'});
        this.mandatoryFieldsError = page.getByText(/.*unless you complete the form correctly/i);
        this.mandatoryForenameError = page.getByText('Forename is required');
        this.mandatoryMessageError = page.getByText('Message is required');
        this.mandatoryEmailError = page.getByText('Email is required');
        this.forenameTextField = page.getByRole('textbox', {name:'Forename *'})
        this.emailTextField = page.getByRole('textbox', {name:'Email *'})
        this.messageTextField = page.getByRole('textbox', {name:'Message *'})
        this.surnameTextField = page.getByRole('textbox', {name:'Surname'})
        this.telephone = page.getByRole('textbox', {name:'Telephone'})
        this.successAlert = page.locator('.alert-success')
        this.feedbackAlert = page.getByRole('heading', { name: 'Sending Feedback' })
    }
}
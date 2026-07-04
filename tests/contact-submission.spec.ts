import { test, Browser, Page } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { HomePageSteps } from '../steps/home-page-steps';
import { ContactPage } from '../pages/contact-page';
import { ContactPageVerification } from '../verifications/contact-page-verifications';
import { ContactPageSteps } from '../steps/contact-page-steps';

test.describe('Contact Page Submission Tests', () => {
  let contactPage: ContactPage;
  let contactPageSteps: ContactPageSteps;
  let contactPageVerifications: ContactPageVerification;
  let homePageSteps: HomePageSteps;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    homePageSteps = new HomePageSteps(new HomePage(page));
    contactPage = await homePageSteps.navigateToContact();
    contactPageSteps = new ContactPageSteps(contactPage);
    contactPageVerifications = new ContactPageVerification(contactPage);
  });

  test('Verify contact page mandatory fields', async () => {
    await contactPageSteps.clickSubmitBtn();
    await contactPageVerifications.verifyMandatoryFeildError();
    await contactPageSteps.populateMandatoryFields();
    await contactPageVerifications.verifyMandatoryFeildErrorNotVisible();
  });

  // to run the test 5 times use the command npx playwright test --grep "Submit contact page" --repeat-each=5
  test('Submit contact page', async () => {
   const details = await contactPageSteps.populateMandatoryFields();
   await contactPageSteps.clickSubmitBtn();
   await contactPageVerifications.verifySuccessfulSubmission(details.firstName);
  });
});

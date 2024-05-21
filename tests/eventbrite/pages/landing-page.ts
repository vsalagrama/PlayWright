import { expect, type Page } from "@playwright/test";
import { globalConfig } from "../tests/testdata";
export class LandingPage {
    
    readonly page: Page
    constructor(page: Page) {
        this.page = page
    }
    async launchURL() {
        await this.navigateToURL(globalConfig.url);
        await this.waitForPageTitle(globalConfig.pageTitle, { timeout: 100000 });
        this.logSuccessfulLaunch();
    }
    private async navigateToURL(url: string): Promise<void> {
        await this.page.goto(globalConfig.url);
    }
    private async waitForPageTitle(title: string, options: { timeout: number }): Promise<void> {
        await expect(this.page).toHaveTitle(title, options);
    }
    private logSuccessfulLaunch(): void {
        console.log('URL successfully launched:', this.page.url());
    }

    async loadingStatus() {
        await expect(this.page.getByTestId('header-search-full').locator('div').first()).toBeVisible();
        console.log('Page loaded successfully');
    }
    async verifyAccessibleNames() {
        await this.verifyAccessibleNameByTestId('desktop-nav', 'Main Desktop');
        await this.verifyAccessibleNameByTestId('header-search-full', 'open search bar');
        await this.verifyAccessibleNameByRoleAndName('link', 'Find Events', 'Find Events');
        await this.verifyAccessibleNameByNestedRoleAndName('desktop-nav', 'link', 'Create Events', 'Create Events');
        await this.verifyAccessibleNameByRoleAndName('link', 'Log In', 'Log In');
        await this.verifyAccessibleNameByRoleAndName('link', 'Sign Up', 'Sign Up');
    }

    async verifyAccessibleNameByTestId(testId: string | RegExp, accessibleName: string | RegExp) {
        const locator = this.page.getByTestId(testId);
        await expect(locator).toHaveAccessibleName(accessibleName);
        console.log(`Success: Element with testId "${testId}" has accessible name "${accessibleName}".`);

    }
    
    async verifyAccessibleNameByRoleAndName(role: any, name: string, accessibleName: string | RegExp) {
        const locator = this.page.getByRole(role, { name });
        await expect(locator).toHaveAccessibleName(accessibleName);
        console.log(`Success: Element with role "${role}" and name "${name}" has accessible name "${accessibleName}".`);

    }
    
    async verifyAccessibleNameByNestedRoleAndName(parentTestId: string | RegExp, role: any, name: string, accessibleName: string | RegExp) {
        const parentLocator = this.page.getByTestId(parentTestId);
        const locator = parentLocator.getByRole(role, { name });
        await expect(locator).toHaveAccessibleName(accessibleName);
        console.log(`Success: Nested element with role "${role}" and name "${name}" within parent with testId "${parentTestId}" has accessible name "${accessibleName}".`);

    }
    async verifyRoles() {
        var locator = this.page.getByTestId('desktop-nav');
        await expect(locator).toHaveRole('navigation');
            
    }
    



}



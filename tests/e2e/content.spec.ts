import { test, expect } from '@playwright/test';

test.describe('Execution Platform Critical Content', () => {

    test('Retail Playbook with Decision Tree', async ({ page }) => {
        await page.goto('/domains/retail');
        await expect(page.getByRole('heading', { name: 'Retail: Fast Fashion vs Core Systems' })).toBeVisible();

        // Check Decision Tree Integration
        await expect(page.getByText('Decision Node: root')).toBeVisible();
        await expect(page.getByText('Is your current Mainframe blocking Black Friday scale?')).toBeVisible();

        // Test Interaction
        await page.getByText('Yes, we crash every year.').click();
        await expect(page.getByText('Decision Node: crash')).toBeVisible();
    });

    test('Telecom Playbook loads', async ({ page }) => {
        await page.goto('/domains/telecom');
        await expect(page.getByRole('heading', { name: 'Telecom: The CAPEX Trap' })).toBeVisible();
        await expect(page.getByText('Physics & Zoning Laws')).toBeVisible();
    });

    test('Failure Case: SAFe in Banking', async ({ page }) => {
        await page.goto('/failures/agile-failure');
        await expect(page.getByRole('heading', { name: 'Why SAFe Failed in a Bank Despite Executive Buy-in' })).toBeVisible();
        await expect(page.getByText('Dependency Gridlock')).toBeVisible();
    });

    test('Interactive Decision Tree Logic', async ({ page }) => {
        await page.goto('/domains/retail');

        // Navigate to a final outcome
        await page.getByText('No, it\'s just expensive.').click(); // -> cost
        await page.getByText('Yes').click(); // -> stay

        // Check Outcome Display
        await expect(page.getByText('Do Nothing')).toBeVisible();
        await expect(page.getByText('Rewriting solely for cost usually costs more than the savings.')).toBeVisible();

        // Restart
        await page.getByRole('button', { name: 'Restart Analysis' }).click();
        await expect(page.getByText('Is your current Mainframe blocking Black Friday scale?')).toBeVisible();
    });

});

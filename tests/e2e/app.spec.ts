import { test, expect } from '@playwright/test';

test.describe('Execution Platform E2E', () => {

    test('Homepage loads with correct branding', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle(/Execution Ledger/);
        await expect(page.getByAltText('Execution Ledger Logo')).toBeVisible();
        await expect(page.getByText('This is not a theory blog')).toBeVisible();
    });

    test('Navigation sidebar links work', async ({ page }) => {
        await page.goto('/');
        // Check Sidebar exists
        const sidebar = page.getByRole('navigation');
        await expect(sidebar).toBeVisible();

        // Click on "Waterfall" link
        await page.getByRole('link', { name: 'Waterfall (Legacy Reality)' }).click();

        // URL should change
        await expect(page).toHaveURL(/.*\/execution-models\/waterfall/);

        // Content should load
        await expect(page.getByRole('heading', { name: 'Waterfall (Legacy Reality)' })).toBeVisible();
    });

    test('Waterfall page has required components', async ({ page }) => {
        await page.goto('/execution-models/waterfall');

        // Decision Matrix
        await expect(page.getByText('Factor', { exact: true })).toBeVisible();
        await expect(page.getByText('Predictability')).toBeVisible();

        // Comparison Table
        await expect(page.getByText('Agile Fantasy')).toBeVisible();

        // Consequences Footer
        await expect(page.getByText('If you choose this model, accept these consequences.')).toBeVisible();
    });

    test('Agile page loads with content', async ({ page }) => {
        await page.goto('/execution-models/agile');
        await expect(page.getByRole('heading', { name: 'Agile (Scrum, Kanban, SAFe)' })).toBeVisible();
        await expect(page.getByText('Metric')).toBeVisible();
    });

});

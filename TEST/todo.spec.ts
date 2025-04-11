import { test, expect } from '@playwright/test';

test.describe('Todo App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Attendre que l'application soit chargée
    await page.waitForLoadState('networkidle');
    // Attendre que le champ de saisie soit visible
    await page.waitForSelector('input[placeholder="Add a new todo..."]');
  });

  test('should add a new todo', async ({ page }) => {
    // Remplir le champ de saisie
    await page.fill('input[placeholder="Add a new todo..."]', 'Nouvelle tâche');
    
    // Cliquer sur le bouton Add
    await page.click('button:has-text("Add")');
    
    // Vérifier que la nouvelle tâche est ajoutée
    await expect(page.getByText('Nouvelle tâche')).toBeVisible();
  });

  test('should delete a todo', async ({ page }) => {
    // Ajouter une tâche
    await page.fill('input[placeholder="Add a new todo..."]', 'Tâche à supprimer');
    await page.click('button:has-text("Add")');
    
    // Attendre que la tâche soit ajoutée
    await page.waitForSelector('text=Tâche à supprimer');
    
    // Supprimer la tâche
    await page.getByRole('button', { name: 'Delete' }).first().click();
    
    // Vérifier que la tâche a été supprimée
    await expect(page.getByText('Tâche à supprimer')).not.toBeVisible();
  });
}); 
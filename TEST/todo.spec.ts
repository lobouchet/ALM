import { test, expect } from '@playwright/test';

test.describe('Todo List App', () => {
  test('ajoute une nouvelle tâche', async ({ page }) => {
    // Aller à la page de l'application
    await page.goto('https://to-scooby-do-b1b9c.web.app/');
    
    // Remplir le champ de saisie
    await page.fill('input[type="text"]', 'Nouvelle tâche');
    
    // Cliquer sur le bouton Add
    await page.click('text=Add');
    
    // Vérifier que la tâche a été ajoutée
    await expect(page.getByText('Nouvelle tâche')).toBeVisible();
  });

  test('supprime une tâche', async ({ page }) => {
    // Aller à la page de l'application
    await page.goto('https://to-scooby-do-b1b9c.web.app/');
    
    // Ajouter une tâche
    await page.fill('input[type="text"]', 'Tâche à supprimer');
    await page.click('text=Add');
    
    // Vérifier que la tâche est présente
    await expect(page.getByText('Tâche à supprimer')).toBeVisible();
    
    // Cliquer sur le bouton Delete
    await page.click('text=Delete');
    
    // Vérifier que la tâche a été supprimée
    await expect(page.getByText('Tâche à supprimer')).not.toBeVisible();
  });

  test('ne peut pas ajouter une tâche vide', async ({ page }) => {
    // Aller à la page de l'application
    await page.goto('https://to-scooby-do-b1b9c.web.app/');
    
    // Cliquer sur le bouton Add sans remplir le champ
    await page.click('text=Add');
    
    // Vérifier que le message "No todos yet" est toujours présent
    await expect(page.getByText('No todos yet. Add one above!')).toBeVisible();
    
    // Vérifier que le compteur est toujours à 0
    await expect(page.getByText('0 of 0 completed')).toBeVisible();
  });
}); 
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { TopMenuPage } from '../pages/top-menu-page'

//Arrange
let homePage: HomePage;
let topMenuPage: TopMenuPage;


test.beforeEach( async ({page}, testInfo) => {
    console.log(testInfo.title);
    
    homePage = new HomePage(page);
    topMenuPage = new TopMenuPage(page);

    await page.goto('/');
})

// Act
test.describe('Smoke Test Suite', () => {
    test('has title', {
        tag: '@fast',
      }, async () => {
        // Assert
        await homePage.assertPageTitle();
      });
      
    test('get started link', async () => {
        await homePage.clickGetStarted();

        // Assert
        await homePage.assertPageTitle();
    });
      
    test('check Java page', async ({ page }) => {
        test.fail();
        await test.step('Get Started', async () => {
            await homePage.clickGetStarted();
            await homePage.assertPageTitle();
        });
        
        await test.step('Go to Java page', async () => {
            await topMenuPage.hoverNode();
            await topMenuPage.clickJava();
        });

        // Assert
        await test.step('Assert', async () => {
            await topMenuPage.assertPageUrl(/.*java/)
            await topMenuPage.assertNodeDescriptionNotVisible();
            await topMenuPage.assertJavaDescriptionVisible();
        })
    });
})



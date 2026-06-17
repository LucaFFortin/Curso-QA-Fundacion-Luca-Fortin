import { test, expect } from '@playwright/test'

const URL = "https://www.saucedemo.com/"
const USERNAME = "standard_user"
const PASSWORD = "secret_sauce"

test("Succesfull login", async ({page}) => {
    await page.goto(URL)

    await page.getByPlaceholder("Username").fill(USERNAME)

    await page.getByPlaceholder("Password").fill(PASSWORD)

    let button = page.getByRole("button")
    expect(button).toHaveText("Login")

    await button.click()

    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
})

test("Failed login, invalid password", async ({page}) => {
    await page.goto(URL)

    await page.getByPlaceholder("Username").fill(USERNAME)

    await page.getByPlaceholder("Password").fill("s")

    let button = page.getByRole("button")

    expect(button).toHaveText("Login")

    await button.click()

    let popup = page.getByRole("heading", {level: 3})
    
    await expect(popup).toHaveText("Epic sadface: Username and password do not match any user in this service")
})

test("Failed login, user locked out", async ({page}) => {
    await page.goto(URL)

    await page.getByPlaceholder("Username").fill("locked_out_user")

    await page.getByPlaceholder("Password").fill(PASSWORD)

    let button = page.getByRole("button")

    expect(button).toHaveText("Login")

    await button.click()

    let popup = page.getByRole("heading", {level: 3})
    
    await expect(popup).toHaveText("Epic sadface: Sorry, this user has been locked out.")
})
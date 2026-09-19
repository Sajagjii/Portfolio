import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const widths = [375, 430, 768, 1024, 1440];
for (const width of widths) {
  test(`homepage is accessible and fits at ${width}px`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Engineering student",
    );
    await page.evaluate(() => document.fonts.ready);
    const horizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    );
    expect(horizontalOverflow).toBe(false);
    const accessibility = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(accessibility.violations).toEqual([]);
    expect(errors).toEqual([]);
    await page.screenshot({ path: `.qa/home-${width}-viewport.png` });
    await page.screenshot({ path: `.qa/home-${width}.png`, fullPage: true });
  });
}

test("mobile navigation works by keyboard, closes on Escape and follows anchors", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByText("Skip to content", { exact: true }),
  ).toBeFocused();
  const toggle = page.getByRole("button", { name: "Open navigation" });
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("button", { name: "Close navigation" }),
  ).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Tab");
  await expect(
    page
      .getByRole("navigation")
      .getByRole("link", { name: "Work", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Contact", exact: true })
    .click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(
    page.getByRole("heading", { name: "Let’s talk." }),
  ).toBeInViewport();
  await toggle.click();
  await expect(
    page
      .getByRole("navigation")
      .getByRole("link", { name: "Contact", exact: true }),
  ).toHaveAttribute("aria-current", "location");
});

test("all internal targets resolve and external links are safe", async ({
  page,
  request,
}) => {
  await page.goto("/");
  const links = await page.locator("a").evaluateAll((anchors) =>
    anchors.map((anchor) => ({
      href: anchor.getAttribute("href")!,
      target: anchor.getAttribute("target"),
      rel: anchor.getAttribute("rel"),
    })),
  );
  for (const { href, target, rel } of links) {
    if (href.startsWith("http")) {
      expect(target).toBe("_blank");
      expect(rel).toContain("noopener");
      expect(rel).toContain("noreferrer");
    } else if (href.includes("#")) {
      expect(await page.locator(`[id="${href.split("#")[1]}"]`).count()).toBe(
        1,
      );
    }
  }
  for (const href of new Set(
    links
      .map((link) => link.href)
      .filter((href) => href.startsWith("/") && !href.includes("#")),
  )) {
    expect((await request.get(href)).ok(), href).toBe(true);
  }
  const contactLinks = page.locator("#contact a");
  await expect(contactLinks.first()).toHaveText("LinkedIn");
  await expect(page.locator(".footer-socials a").first()).toHaveText("GitHub");
});

test("project navigation, metadata and accessible detail pages", async ({
  page,
}) => {
  for (const slug of [
    "dynamic-class-scheduling",
    "agentic-ai",
    "creative-technology",
  ]) {
    await page.goto(`/projects/${slug}/`);
    const heading = await page.getByRole("heading", { level: 1 }).innerText();
    await expect(page).toHaveTitle(`${heading} — Sajag Makhija`);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      `${heading} — Sajag Makhija`,
    );
    const accessibility = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(accessibility.violations).toEqual([]);
    await page.setViewportSize({ width: 375, height: 812 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.getByRole("link", { name: "All selected work" }).click();
    await expect(page).toHaveURL(/\/#work$/);
  }
});

test("reduced motion and missing-project content stay intentional", async ({
  page,
}) => {
  await page.goto("/");
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  const nutri = page.getByRole("article", { name: "NutriFinder" });
  await expect(nutri).toContainText("Software / Application");
  await expect(nutri.locator("a")).toHaveCount(0);
  await expect(nutri).not.toContainText(/Firestore|TDEE|Flutter|calories/i);
  await expect(page.locator("#skills")).toContainText("Flutter");
  await expect(page.locator("#skills")).toContainText("Dart");
  const response = await page.goto("/projects/not-a-project/");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("link", { name: "Back to portfolio" }),
  ).toBeVisible();
});

test("content and navigation remain available without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 1440, height: 1000 },
  });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Ideas, made tangible." }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Explore Dynamic Class Scheduling System" })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Dynamic Class Scheduling System",
  );
  await context.close();
});

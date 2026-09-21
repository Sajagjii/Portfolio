import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = [
  "/",
  "/work/",
  "/lab/",
  "/about/",
  "/contact/",
  "/projects/dynamic-class-scheduling/",
  "/projects/agentic-ai/",
  "/projects/creative-technology/",
];
const widths = [320, 375, 430, 768, 1024, 1440];
for (const width of widths) {
  test(`homepage is accessible and fits at ${width}px`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "SAJAGMAKHIJA✳",
    );
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
    expect(errors).toEqual([]);
    await page.screenshot({ path: `.qa/home-${width}-viewport.png` });
    await page.screenshot({ path: `.qa/home-${width}.png`, fullPage: true });
  });
}
test("mobile menu supports keyboard, Escape, route changes and active states", async ({
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
      .getByRole("link", { name: "Index", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Contact", exact: true })
    .click();
  await expect(page).toHaveURL(/\/contact\/$/);
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "HAVE AN IDEA?",
  );
  await toggle.click();
  await expect(
    page
      .getByRole("navigation")
      .getByRole("link", { name: "Contact", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await page.setViewportSize({ width: 1024, height: 900 });
  await expect(
    page
      .getByRole("navigation")
      .getByRole("link", { name: "Work", exact: true }),
  ).toBeVisible();
  await page.setViewportSize({ width: 375, height: 812 });
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});
test("all routes, internal links, unique IDs and metadata resolve", async ({
  page,
  request,
}) => {
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /\S+/,
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      /\S+/,
    );
    const duplicates = await page.locator("[id]").evaluateAll((elements) => {
      const ids = elements.map((element) => element.id);
      return ids.filter((id, index) => ids.indexOf(id) !== index);
    });
    expect(duplicates).toEqual([]);
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
      } else if (href.startsWith("#")) {
        expect(await page.locator(`[id="${href.slice(1)}"]`).count()).toBe(1);
      } else if (href.startsWith("/")) {
        expect((await request.get(href)).ok(), href).toBe(true);
      }
    }
  }
});
test("every detail and section page is accessible across breakpoints", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const route of routes.slice(1)) {
    await page.goto(route);
    for (const width of [320, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${route} at ${width}px`,
      ).toBe(true);
    }
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
      route,
    ).toEqual([]);
  }
  expect(errors).toEqual([]);
});
test("project notes preserve content and provide the right return link", async ({
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
    await page
      .getByRole("link", {
        name:
          slug === "dynamic-class-scheduling"
            ? "All selected work"
            : "Back to lab",
      })
      .click();
    await expect(page).toHaveURL(
      slug === "dynamic-class-scheduling" ? /\/work\/$/ : /\/lab\/$/,
    );
  }
});
test("reduced motion, intentional missing content, and 404 work", async ({
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
  expect((await page.goto("/projects/not-a-project/"))?.status()).toBe(404);
  await expect(
    page.getByRole("link", { name: "Back to portfolio" }),
  ).toBeVisible();
});
test("content and mobile navigation work without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 375, height: 900 },
  });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page
      .getByRole("navigation")
      .getByRole("link", { name: "Lab", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Explore Dynamic Class Scheduling System" })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Dynamic Class Scheduling System",
  );
  await context.close();
});
test("normal motion is restrained and navigation does not produce client errors", async ({
  browser,
}) => {
  const context = await browser.newContext({
    reducedMotion: "no-preference",
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Lab", exact: true })
    .click();
  await expect(page).toHaveURL(/\/lab\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("LAB_/");
  expect(
    await page.evaluate(
      () =>
        document
          .getAnimations()
          .filter(
            (animation) =>
              animation.effect?.getTiming().iterations === Infinity,
          ).length,
    ),
  ).toBe(0);
  expect(errors).toEqual([]);
  await context.close();
});

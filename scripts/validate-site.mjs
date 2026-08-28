import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const errors = [];
const warnings = [];

function fail(message) {
  errors.push(message);
}

function warn(message) {
  warnings.push(message);
}

function existsPublicPath(value) {
  if (!value.startsWith("/")) return true;
  return fs.existsSync(path.join(root, "public", value.replace(/^\//, "")));
}

function normalizeInternalRoute(value) {
  if (!value || !value.startsWith("/") || value.startsWith("/assets/")) return null;
  const pathname = value.split(/[?#]/, 1)[0];
  if (!pathname) return null;
  if (pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

function routeFromPage(file) {
  let rel = file.replace(/^src\/pages\//, "").replace(/\\/g, "/");
  if (!/\.(astro|md|mdx)$/.test(rel)) return null;
  rel = rel.replace(/\.(astro|md|mdx)$/, "");
  if (rel.includes("[")) return null;
  if (rel === "index") return "/";
  if (rel.endsWith("/index")) rel = rel.slice(0, -6);
  return `/${rel.replace(/^\/+|\/+$/g, "")}/`;
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const pageFiles = walk(path.join(root, "src", "pages"))
  .map((file) => path.relative(root, file).replace(/\\/g, "/"));
const routes = new Set(pageFiles.map(routeFromPage).filter(Boolean));

const referenceDir = path.join(root, "src", "content", "references");
for (const file of walk(referenceDir).filter((f) => f.endsWith(".json"))) {
  const rel = path.relative(root, file).replace(/\\/g, "/");
  let data;
  try {
    data = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    fail(`${rel}: invalid JSON (${error.message})`);
    continue;
  }

  if (data.status === "published" && data.customer?.publicationApproved !== true) {
    fail(`${rel}: published reference requires customer.publicationApproved=true`);
  }

  if (data.layout === "case-study" && (!Array.isArray(data.sections) || data.sections.length === 0)) {
    fail(`${rel}: case-study layout requires at least one structured section`);
  }

  const sectionImages = Array.isArray(data.sections)
    ? data.sections.flatMap((section) => {
        if (section?.type === "mediaText" && section.image) return [section.image];
        if (section?.type === "gallery" && Array.isArray(section.images)) return section.images;
        return [];
      })
    : [];

  const images = [
    data.heroImage,
    ...(Array.isArray(data.gallery) ? data.gallery : []),
    ...sectionImages,
  ].filter(Boolean);

  for (const image of images) {
    if (!image.src || !existsPublicPath(image.src)) {
      fail(`${rel}: image does not exist in public/: ${image.src ?? "<missing>"}`);
    }
    if (!image.alt || image.alt.trim().length < 8) {
      fail(`${rel}: image requires meaningful alt text: ${image.src ?? "<unknown>"}`);
    }
  }

  const actionLinks = [
    ...(Array.isArray(data.heroActions) ? data.heroActions.map((x) => x.href) : []),
    ...(Array.isArray(data.closingCta?.actions) ? data.closingCta.actions.map((x) => x.href) : []),
  ];

  const links = [
    ...(Array.isArray(data.relatedServices) ? data.relatedServices.map((x) => x.href) : []),
    ...(Array.isArray(data.relatedReferences) ? data.relatedReferences : []),
    ...actionLinks,
  ].filter(Boolean);

  for (const href of links) {
    if (href.includes("https://www.avab.eu")) {
      fail(`${rel}: canonical/internal links must use https://avab.eu/ instead of www alias: ${href}`);
      continue;
    }
    const route = normalizeInternalRoute(href);
    if (route && !routes.has(route)) {
      fail(`${rel}: internal route does not exist: ${href}`);
    }
  }
}

function getAddedSourceLines() {
  const base = process.env.GITHUB_BASE_REF || "main";
  const candidates = [`origin/${base}`, base];
  for (const candidate of candidates) {
    try {
      return execFileSync("git", ["diff", "--unified=0", `${candidate}...HEAD`, "--", "src"], {
        cwd: root,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      });
    } catch {}
  }
  warn("Could not resolve base ref for added-line checks; content checks still ran.");
  return "";
}

const diff = getAddedSourceLines();
let currentFile = null;
for (const line of diff.split("\n")) {
  if (line.startsWith("+++ b/")) {
    currentFile = line.slice(6);
    continue;
  }
  if (!currentFile || !line.startsWith("+") || line.startsWith("+++")) continue;
  const added = line.slice(1);
  const sourceScope = /^(src\/(pages|components|layouts|content|data)\/)/.test(currentFile);
  if (sourceScope && added.includes("https://www.avab.eu")) {
    fail(`${currentFile}: new source code must use https://avab.eu/ instead of www alias`);
  }
  const standardPage = /^src\/pages\/(referenser|miljo|tjanster|kunskap)\/.+\.astro$/.test(currentFile);
  if (standardPage && /<style(?:\s|>)/.test(added)) {
    fail(`${currentFile}: new page-specific <style> blocks are forbidden for standard page types; use shared components/styles`);
  }
}

if (warnings.length) {
  console.warn("\nGuardrail warnings:");
  for (const message of warnings) console.warn(`- ${message}`);
}

if (errors.length) {
  console.error("\nGuardrail validation failed:");
  for (const message of errors) console.error(`- ${message}`);
  process.exit(1);
}

console.log("Guardrail validation passed.");

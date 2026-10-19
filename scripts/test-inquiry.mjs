import assert from "node:assert/strict";
import {handleInquiry} from "../functions/api/feature-inquiry.mjs";

const good = {
  name: "Ada",
  email: "ada@example.org",
  toolName: "Widget",
  website: "https://example.org",
  interest: "both",
  message: "Please tell us the rate.",
};

function post(body, headers = {}) {
  return new Request("https://brainchainlab.com/api/feature-inquiry", {
    method: "POST",
    headers: {"content-type": "application/json", accept: "application/json", ...headers},
    body: JSON.stringify(body),
  });
}

const unconfigured = await handleInquiry({request: post(good), env: {}});
assert.equal(unconfigured.status, 503);
assert.equal((await unconfigured.json()).fallback, "mailto");

const store = new Map();
const saved = await handleInquiry({
  request: post(good),
  env: {INQUIRIES: {async put(key, value) { store.set(key, value); }}},
});
assert.equal(saved.status, 200);
assert.equal(store.size, 1);
const record = JSON.parse([...store.values()][0]);
assert.equal(record.toolName, "Widget");
assert.equal(record.email, "ada@example.org");

const invalid = await handleInquiry({request: post({...good, email: "nope"}), env: {}});
assert.equal(invalid.status, 400);

const honeypot = await handleInquiry({
  request: post({...good, company_website: "https://spam.example"}),
  env: {},
});
assert.equal(honeypot.status, 200);
assert.equal(store.size, 1);

let forwarded;
const originalFetch = globalThis.fetch;
globalThis.fetch = async (url, init) => {
  forwarded = {url, body: JSON.parse(init.body)};
  return new Response(null, {status: 204});
};
const hooked = await handleInquiry({
  request: post({...good, toolName: "Hooked"}),
  env: {INQUIRY_WEBHOOK_URL: "https://hooks.example/in"},
});
assert.equal(hooked.status, 200);
assert.equal(forwarded.url, "https://hooks.example/in");
assert.equal(forwarded.body.toolName, "Hooked");
globalThis.fetch = originalFetch;

console.log("inquiry function ok");

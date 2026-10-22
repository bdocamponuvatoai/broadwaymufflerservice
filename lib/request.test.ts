import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  buildMailto,
  buildMessage,
  buildSubject,
  emptyRequest,
  localDateString,
  validateField,
  validateStep,
  type RequestData,
} from "./request.ts";

const now = new Date(2026, 9, 23, 10, 0, 0);

const complete: RequestData = {
  service: "catalytic-converters",
  year: "1967",
  make: " Ford ",
  model: "Mustang",
  concern: "Loud roar on start-up since last week.",
  name: "Alex Rivera",
  email: "alex@example.com",
  phone: "(925) 555-0100",
  contact: "Phone",
  date: "2026-10-24",
};

describe("validateStep", () => {
  it("reports every missing vehicle field on an empty step 1", () => {
    const errors = validateStep(0, emptyRequest, now);
    assert.deepEqual(Object.keys(errors).sort(), ["concern", "make", "model", "service", "year"]);
  });

  it("reports missing contact fields on an empty step 2 but not the optional ones", () => {
    const errors = validateStep(1, emptyRequest, now);
    assert.deepEqual(Object.keys(errors).sort(), ["email", "name", "phone"]);
  });

  it("accepts a complete request on both steps", () => {
    assert.deepEqual(validateStep(0, complete, now), {});
    assert.deepEqual(validateStep(1, complete, now), {});
  });

  it("returns no errors for an unknown step", () => {
    assert.deepEqual(validateStep(5, emptyRequest, now), {});
  });
});

describe("validateField", () => {
  const check = (field: keyof RequestData, value: string) => validateField(field, { ...complete, [field]: value }, now);

  it("requires a plausible four-digit year", () => {
    assert.ok(check("year", "67"));
    assert.ok(check("year", "1899"));
    assert.ok(check("year", "2029"));
    assert.equal(check("year", "2028"), undefined);
    assert.equal(check("year", "1932"), undefined);
  });

  it("requires a description of at least 10 characters after trimming", () => {
    assert.ok(check("concern", "   rattle   "));
    assert.equal(check("concern", "rattle at idle"), undefined);
  });

  it("validates email shape", () => {
    assert.ok(check("email", "alex@"));
    assert.ok(check("email", "alex example.com"));
    assert.equal(check("email", "alex@example.com"), undefined);
  });

  it("requires at least 10 phone digits", () => {
    assert.ok(check("phone", "555-0100"));
    assert.equal(check("phone", "925.555.0100"), undefined);
  });

  it("allows an empty date but rejects past dates", () => {
    assert.equal(check("date", ""), undefined);
    assert.equal(check("date", "2026-10-23"), undefined);
    assert.ok(check("date", "2026-10-22"));
  });
});

describe("localDateString", () => {
  it("pads month and day", () => {
    assert.equal(localDateString(new Date(2026, 0, 5)), "2026-01-05");
  });
});

describe("message building", () => {
  const message = buildMessage(complete, "Catalytic converter service", "Broadway Muffler Service");

  it("builds a subject from the trimmed vehicle", () => {
    assert.equal(buildSubject(complete), "Service request: 1967 Ford Mustang");
  });

  it("includes every detail the visitor entered", () => {
    for (const expected of [
      "Hello Broadway Muffler Service,",
      "Service: Catalytic converter service",
      "Vehicle: 1967 Ford Mustang",
      "Your request: Loud roar on start-up since last week.",
      "Name: Alex Rivera",
      "Email: alex@example.com",
      "Phone: (925) 555-0100",
      "Contact by: Phone",
      "Preferred day: 2026-10-24",
    ]) {
      assert.ok(message.includes(expected), `missing: ${expected}`);
    }
  });

  it("asks to discuss availability when no day is chosen", () => {
    const text = buildMessage({ ...complete, date: "" }, "Help me decide", "Broadway Muffler Service");
    assert.ok(text.includes("Preferred day: Please discuss availability"));
  });

  it("never claims a booking or confirmation", () => {
    assert.ok(message.includes("not a confirmed appointment"));
    const withoutDisclaimer = message.replace("not a confirmed appointment", "");
    assert.doesNotMatch(withoutDisclaimer, /\b(booked|confirmed|reserved|scheduled|guaranteed)\b/i);
  });

  it("encodes subject and body into a mailto link", () => {
    const href = buildMailto("shop@example.com", "Service request: 1967 Ford Mustang", "Line one\n\nA & B?");
    assert.equal(
      href,
      "mailto:shop@example.com?subject=Service%20request%3A%201967%20Ford%20Mustang&body=Line%20one%0A%0AA%20%26%20B%3F",
    );
  });
});

// Pure request-form logic. No imports, so `node --test` runs it directly.
// The form prepares an email draft only: nothing is sent, stored or booked.

export type ContactPreference = "Email" | "Phone" | "Either";

export type RequestData = {
  service: string;
  year: string;
  make: string;
  model: string;
  concern: string;
  name: string;
  email: string;
  phone: string;
  contact: ContactPreference;
  date: string;
};

export type FieldName = keyof RequestData;
export type RequestErrors = Partial<Record<FieldName, string>>;

export const emptyRequest: RequestData = {
  service: "",
  year: "",
  make: "",
  model: "",
  concern: "",
  name: "",
  email: "",
  phone: "",
  contact: "Either",
  date: "",
};

export const stepFields: readonly (readonly FieldName[])[] = [
  ["service", "year", "make", "model", "concern"],
  ["name", "email", "phone", "contact", "date"],
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Today's date as YYYY-MM-DD in the visitor's local time zone. */
export function localDateString(now: Date): string {
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

export function validateField(field: FieldName, data: RequestData, now: Date = new Date()): string | undefined {
  const value = data[field].trim();
  switch (field) {
    case "service":
      return value ? undefined : "Choose a service, or pick “Help me decide”.";
    case "year": {
      if (!value) return "Enter the vehicle’s year.";
      const year = Number(value);
      if (!/^\d{4}$/.test(value) || year < 1900 || year > now.getFullYear() + 2) {
        return `Enter a four-digit year between 1900 and ${now.getFullYear() + 2}.`;
      }
      return undefined;
    }
    case "make":
      return value ? undefined : "Enter the make, for example Ford.";
    case "model":
      return value ? undefined : "Enter the model, for example Mustang.";
    case "concern":
      return value.length >= 10 ? undefined : "Add a short description of at least 10 characters.";
    case "name":
      return value ? undefined : "Enter your name.";
    case "email":
      if (!value) return "Enter your email address.";
      return EMAIL_PATTERN.test(value) ? undefined : "Enter an email address like name@example.com.";
    case "phone": {
      if (!value) return "Enter a phone number.";
      return value.replace(/\D/g, "").length >= 10 ? undefined : "Enter a phone number with at least 10 digits.";
    }
    case "contact":
      return undefined;
    case "date":
      if (!value) return undefined;
      return value >= localDateString(now) ? undefined : "Choose today or a future date.";
  }
}

export function validateStep(step: number, data: RequestData, now: Date = new Date()): RequestErrors {
  const errors: RequestErrors = {};
  for (const field of stepFields[step] ?? []) {
    const message = validateField(field, data, now);
    if (message) errors[field] = message;
  }
  return errors;
}

export function vehicleLabel(data: RequestData): string {
  return [data.year, data.make, data.model]
    .map((part) => part.trim())
    .filter(Boolean)
    .join(" ");
}

export function reviewGroups(data: RequestData, serviceLabel: string) {
  return [
    {
      title: "Your vehicle",
      rows: [
        ["Service", serviceLabel],
        ["Vehicle", vehicleLabel(data)],
        ["Your request", data.concern.trim()],
      ],
    },
    {
      title: "Your contact details",
      rows: [
        ["Name", data.name.trim()],
        ["Email", data.email.trim()],
        ["Phone", data.phone.trim()],
        ["Contact by", data.contact],
        ["Preferred day", data.date || "Please discuss availability"],
      ],
    },
  ] as const;
}

export function buildSubject(data: RequestData): string {
  return `Service request: ${vehicleLabel(data)}`;
}

export function buildMessage(data: RequestData, serviceLabel: string, businessName: string): string {
  const groups = reviewGroups(data, serviceLabel)
    .map(({ title, rows }) => [title, ...rows.map(([label, value]) => `${label}: ${value}`)].join("\n"))
    .join("\n\n");

  return [
    `Hello ${businessName},`,
    "I would like to discuss the following service request.",
    groups,
    "Please let me know your availability and the next step. Thank you.",
    "I understand this is a request, not a confirmed appointment.",
  ].join("\n\n");
}

export function buildMailto(to: string, subject: string, body: string): string {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

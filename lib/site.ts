// Business facts and navigation: the single source of truth.
// Provenance for every value is recorded in docs/content-sources.md.

export const site = {
  name: "Broadway Muffler Service",
  shortName: "Broadway Muffler",
  description:
    "Muffler and exhaust repair, catalytic converters, custom exhaust fabrication and classic-car exhaust work on North Main Street in Walnut Creek, California.",
  phone: {
    display: "(925) 933-4373",
    href: "tel:+19259334373",
    e164: "+19259334373",
  },
  email: "bdwymuffler@comcast.net",
  address: {
    street: "2596 N Main St",
    city: "Walnut Creek",
    region: "CA",
    postalCode: "94597",
    country: "US",
  },
  directionsUrl:
    "https://www.google.com/maps/search/?api=1&query=Broadway+Muffler+Service%2C+2596+N+Main+St%2C+Walnut+Creek%2C+CA+94597",
  yelpUrl: "https://www.yelp.com/biz/broadway-muffler-service-walnut-creek",
  hoursNote: "Call to confirm current hours.",
} as const;

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

export const addressLines = [
  site.address.street,
  `${site.address.city}, ${site.address.region} ${site.address.postalCode}`,
];

export const navigation = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Our work" },
  { href: "/about", label: "The shop" },
  { href: "/visit", label: "Visit" },
] as const;

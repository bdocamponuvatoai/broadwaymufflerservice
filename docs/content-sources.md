# Content sources

Every business fact on the site, where it came from, and what was deliberately left off. Re-check before launch and before any sales conversation.

Broadway Muffler Service has **no live website**. Don't reuse or link any former site. Facts come from details supplied directly to us and from public listings.

Last checked: 2026-10-23.

## Facts on the site

All of these live in `lib/site.ts` (contact details) and `lib/content.ts` (services, FAQs).

| Fact                           | Value                                                          | Source                                                                                                                              |
| ------------------------------ | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Business name                  | Broadway Muffler Service                                       | Supplied; matches every listing                                                                                                     |
| Address                        | 2596 N Main St, Walnut Creek, CA 94597                         | Supplied; matches Roadtrippers and iExit listings                                                                                   |
| Phone                          | (925) 933-4373                                                 | Supplied; matches Roadtrippers listing                                                                                              |
| Email                          | bdwymuffler@comcast.net                                        | Supplied                                                                                                                            |
| Muffler and exhaust repair     | Service                                                        | Business name and category on every listing; review photo caption "fixed exhaust damage caused by transport company" (Roadtrippers) |
| Catalytic converters           | Service                                                        | Review, May 2026: catalytic converter replaced on a 2006 Prius (Roadtrippers)                                                       |
| Classic and specialty vehicles | Service                                                        | Review, Nov 2025: work on "modern import or domestic" and vintage cars (Roadtrippers); classic vehicles in the shop's Yelp photos   |
| Custom exhaust fabrication     | Service                                                        | Fabricated stainless pipework in the shop's Yelp photos                                                                             |
| Yelp listing                   | https://www.yelp.com/biz/broadway-muffler-service-walnut-creek | Linked, never quoted                                                                                                                |

Sources:

- Roadtrippers listing: https://maps.roadtrippers.com/us/walnut-creek-ca/services/broadway-muffler-service
- Yelp listing: https://www.yelp.com/biz/broadway-muffler-service-walnut-creek (blocks automated retrieval; check in a browser)
- Yellow Pages: https://www.yellowpages.com/walnut-creek-ca/mip/broadway-muffler-service-482231267
- Chamber of Commerce: https://www.chamberofcommerce.com/business-directory/california/walnut-creek/muffler-shop/2397605-broadway-muffler-service

## Left off the site: questions for the owner

| Claim found in public listings                     | Why it's off                    | Ask the owner                                                            |
| -------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------ |
| Hours (Roadtrippers: Mon–Fri 8 am–4 pm)            | Listings disagree               | What are your current hours? The site says "call to confirm" until then. |
| "John" (named in several reviews)                  | Not confirmed as owner or staff | Who runs the shop, and may we name you?                                  |
| Founded 1950 (gift-card listing only)              | Single promotional source       | When did the shop open, and under current ownership since when?          |
| Brakes (gift-card listing only)                    | Not supported elsewhere         | Do you still do brakes, or exhaust only?                                 |
| Facebook page (linked from Roadtrippers)           | Not verified as theirs          | Is there an official Facebook page to link?                              |
| Ratings and review counts                          | Change over time                | None. The site links to Yelp instead of quoting it.                      |
| Licence, warranty, guarantees, pricing, turnaround | Promises customers hold them to | Any warranty or guarantee you want stated? Your BAR registration number? |

## Photos

| File                                     | Source                                                                                                         | Status                 |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `assets/images/classic-pickup.webp`      | Yelp photo, `source-assets/yelp/classic-pickup.jpg`; bottom strip cropped to remove a customer's licence plate | **Rights unconfirmed** |
| `assets/images/exhaust-fabrication.webp` | Yelp photo, `source-assets/yelp/exhaust-fabrication.jpg`                                                       | **Rights unconfirmed** |
| `assets/images/classic-mustang.webp`     | Yelp photo, `source-assets/yelp/classic-mustang.jpg`                                                           | **Rights unconfirmed** |
| Five service images                      | AI-generated; see `docs/image-generation.md`                                                                   | Final assets           |

Yelp photos are often uploaded by customers, not the business. **Launch is blocked** until the owner confirms the shop owns these photos or supplies their own. Original Yelp CDN URLs:

- classic-pickup: https://s3-media0.fl.yelpcdn.com/bphoto/adOxUAix3HFS3Dyj5_IebA/o.jpg
- classic-mustang: https://s3-media0.fl.yelpcdn.com/bphoto/_W6lqQs3rtp3QPkxOUShQw/o.jpg
- exhaust-fabrication: https://s3-media0.fl.yelpcdn.com/bphoto/aRwbbccr6CFVszC2vTdGKA/o.jpg

## Removed from the original build

- Two customer quotes retyped from Yelp (David E., Aug 2025; Garik A., Jul 2025). Reviews are linked, never retyped.
- The ChatGPT preview URL in the structured data.

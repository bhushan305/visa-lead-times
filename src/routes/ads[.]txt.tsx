import { createFileRoute } from "@tanstack/react-router";

/**
 * /ads.txt — IAB authorized digital sellers list.
 *
 * Required by Google AdSense and every other ad network to verify that the
 * publisher (us) has authorized them to sell inventory on this domain.
 * Format spec: https://iabtechlab.com/wp-content/uploads/2017/09/IABOpenRTB_Ads.txt_Public_Spec_V1-0-2.pdf
 *
 * Each row: <ad-system-domain>, <publisher-account-id>, <relationship>, <certification-authority-id>
 *   - DIRECT  = direct contract with the seller
 *   - RESELLER = reselling on the publisher's behalf
 *
 * Add additional rows when you sign up for Ezoic, Mediavine, etc.
 */
export const Route = createFileRoute("/ads.txt")({
  loader: () => {
    const body = [
      "# AdSense",
      "google.com, pub-2935901629293366, DIRECT, f08c47fec0942fa0",
    ].join("\n");
    throw new Response(body, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=86400",
      },
    });
  },
  component: () => null,
});

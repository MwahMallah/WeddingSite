"use server";

export interface RSVPFormData {
    name: string;
    attending: "yes" | "no";
    drinks: string[];
}

/**
 * Server action called on form submit.
 * Currently a stub — wire up to submitToGoogleSheets() when ready.
 *
 * Google Sheets integration options:
 *  A) Google Apps Script web app (simplest — no auth library needed):
 *     Deploy a GAS web app that accepts POST and appends a row.
 *     Store the web app URL in GOOGLE_SCRIPT_URL env var.
 *
 *  B) Google Sheets API via service account (most reliable):
 *     Install `googleapis`, create a service account, share the sheet with it.
 *     Store credentials in GOOGLE_SERVICE_ACCOUNT_JSON + GOOGLE_SHEET_ID env vars.
 */
export async function submitRSVP(formData: FormData): Promise<void> {
    const data: RSVPFormData = {
        name: formData.get("name") as string,
        attending: formData.get("attending") as "yes" | "no",
        drinks: formData.getAll("drinks") as string[],
    };

    const scriptUrl = process.env.GOOGLE_SCRIPT_URL; // Put your Web App URL in .env.local

    try {
        await fetch(scriptUrl!, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            mode: 'no-cors' // Important for Google Script redirects
        });
        console.log("RSVP Submitted to Sheets");
    } catch (err) {
        console.error("Failed to submit RSVP", err);
    }
}

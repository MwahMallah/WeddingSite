import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/rsvp
 *
 * Alternative REST endpoint (use this if you prefer fetch() over server actions).
 *
 * --- Option A: Google Apps Script ---
 * 1. In Google Sheets → Extensions → Apps Script, paste a doPost(e) handler
 *    that calls sheet.appendRow([name, attending, drinks]).
 * 2. Deploy as a Web App (Anyone can access).
 * 3. Add GOOGLE_SCRIPT_URL=<web app url> to .env.local
 *
 * --- Option B: Google Sheets API (googleapis) ---
 * 1. npm install googleapis
 * 2. Create a service account in Google Cloud Console.
 * 3. Share your sheet with the service account email.
 * 4. Add GOOGLE_SERVICE_ACCOUNT_JSON and GOOGLE_SHEET_ID to .env.local
 */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, attending, drinks } = body;

        if (!name || !attending) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        console.log("[RSVP API stub] received:", { name, attending, drinks });

        // TODO: Option A — Google Apps Script
        // await fetch(process.env.GOOGLE_SCRIPT_URL!, {
        //     method: "POST",
        //     body: JSON.stringify({ name, attending, drinks }),
        // });

        // TODO: Option B — googleapis
        // const auth = new google.auth.GoogleAuth({ ... });
        // const sheets = google.sheets({ version: "v4", auth });
        // await sheets.spreadsheets.values.append({ ... });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("[RSVP API] error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

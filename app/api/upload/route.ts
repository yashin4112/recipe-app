// import { NextApiRequest, NextApiResponse } from "next";
// import fs from "fs";
// import FormData from "form-data";
// import axios from "axios";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     console.log("req come")
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }

//   try {
//     const authtoken = process.env.CONTENTSTACK_MANAGEMENT_TOKEN;
//     const apiKey = process.env.CONTENTSTACK_API_KEY;

//     const filePath = "/Users/yash.shinde/Downloads/spidy.png"; 
//     const file = fs.createReadStream(filePath);

//     const formData = new FormData();
//     formData.append("asset[upload]", file);
//     formData.append("asset[description]", "description");
//     formData.append("asset[title]", "ironman2");

//     const headers = {
//       api_key: apiKey,
//       authorization: authtoken,
//       ...formData.getHeaders(),
//     };

//     const response = await axios.post("https://api.contentstack.io/v3/assets", formData, { headers });

//     res.status(200).json({ success: true, data: response.data });
//   } catch (error) {
//     console.error("Error uploading asset:", error);
//     res.status(500).json({ error: "Failed to upload asset" });
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import FormData from "form-data";
import axios from "axios";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData(); // Get form data
        const file = formData.get("file") as Blob; // Extract file
        const base = formData.get("base")

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        //@ts-ignore
        const tempPath = `/tmp/${file.name}`; // Save to temp folder

        fs.writeFileSync(tempPath, buffer); // Store file temporarily

        // Upload to Contentstack
        const contentstackFormData = new FormData();
        contentstackFormData.append("asset[upload]", fs.createReadStream(tempPath));
        // contentstackFormData.append("asset[upload]", file);

        const response = await axios.post(
            "https://api.contentstack.io/v3/assets",
            contentstackFormData,
            {
                headers: {
                    api_key: process.env.CONTENTSTACK_API_KEY!,
                    authorization: process.env.CONTENTSTACK_MANAGEMENT_TOKEN!,
                    ...contentstackFormData.getHeaders(),
                },
            }
        );

        console.log("uid ",response.data)

        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }

    
}



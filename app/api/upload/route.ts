
// import { NextRequest, NextResponse } from "next/server";
// import fs from "fs";
// import path from "path";
// import FormData from "form-data";
// import axios from "axios";
// import { ChartNoAxesColumnIcon } from "lucide-react";

// export async function POST(req: NextRequest) {

//     try {
//         const formData = await req.formData(); // Get form data
//         const file = formData.get("file") as Blob; // Extract file

//         if (!file) {
//             return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
//         }

//         const buffer = Buffer.from(await file.arrayBuffer());
//         const uploadDir = path.join(process.cwd(), "uploads"); // Store in project directory

//         // Ensure the 'uploads' directory exists
//         if (!fs.existsSync(uploadDir)) {
//             fs.mkdirSync(uploadDir, { recursive: true });
//         }

//         //@ts-ignore
//         const filePath = path.join(uploadDir, file.name); // Set file path in the directory

//         fs.writeFileSync(filePath, buffer); // Save file

//         // Upload to Contentstack
//         const contentstackFormData = new FormData();
//         contentstackFormData.append("asset[upload]", fs.createReadStream(filePath));

//         const response = await axios.post(
//             "https://api.contentstack.io/v3/assets",
//             contentstackFormData,
//             {
//                 headers: {
//                     api_key: process.env.CONTENTSTACK_API_KEY!,
//                     authorization: process.env.CONTENTSTACK_MANAGEMENT_TOKEN!,
//                     ...contentstackFormData.getHeaders(),
//                 },
//             }
//         );

//         return NextResponse.json(response.data);
//     } catch (error) {
//         console.error("Upload error:", error);
//         return NextResponse.json({ error: "Upload failed" }, { status: 500 });
//     }
// }


import { NextRequest, NextResponse } from "next/server";
import FormData from "form-data";
import axios from "axios";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as Blob; // Extract file
        const localUrl = URL.createObjectURL(file); 
        console.log("gshgshs",localUrl)

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer()); // Convert file to Buffer

        // Prepare FormData for Contentstack
        const contentstackFormData = new FormData();

        //@ts-ignore
        contentstackFormData.append("asset[upload]", buffer, file.name); // Directly attach buffer

        const response = await axios.post(
            "https://api.contentstack.io/v3/assets",
            contentstackFormData,
            {
                headers: {
                    api_key: process.env.CONTENTSTACK_API_KEY!,
                    authorization: process.env.CONTENTSTACK_MANAGEMENT_TOKEN!,
                    ...contentstackFormData.getHeaders(), // Attach correct headers
                },
            }
        );

        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}

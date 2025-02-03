// helpers/uploadAsset.ts

import fs from "fs";
import FormData from "form-data";
import axios from "axios";

export async function uploadAssetToContentstack(file: Blob) {
    try {
        // Step 1: Convert the file to buffer and save it temporarily
        const buffer = Buffer.from(await file.arrayBuffer());
        //@ts-ignore
        const tempPath = `/tmp/${file.name}`;

        // Write the file to a temporary location
        fs.writeFileSync(tempPath, buffer);

        // Step 2: Upload the file to Contentstack
        const contentstackFormData = new FormData();
        contentstackFormData.append("asset[upload]", fs.createReadStream(tempPath));

        const headers = {
            api_key: process.env.CONTENTSTACK_API_KEY!,
            authorization: process.env.CONTENTSTACK_MANAGEMENT_TOKEN!,
            ...contentstackFormData.getHeaders(),
        };

        const assetResponse = await axios.post(
            "https://api.contentstack.io/v3/assets",
            contentstackFormData,
            { headers }
        );

        // Return the asset details
        return {
            assetUID: assetResponse.data.asset.uid,
            asset: assetResponse.data.asset,
        };
    } catch (error) {
        console.error("Error uploading asset:", error);
        return { error: "Failed to upload asset" };
    }
}

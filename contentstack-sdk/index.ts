import * as Utils from "@contentstack/utils";
import ContentstackLivePreview from "@contentstack/live-preview-utils";
import getConfig from "next/config";
import contentstack from '@contentstack/management'
const fs = require("fs");
const axios = require("axios");
import FormData from "form-data";

import {
  customHostUrl,
  initializeContentStackSdk,
  isValidCustomHostUrl,
} from "./utils";
import { RecipeProps, UploadRecipeProps } from "@/typescript/layout";

type GetEntry = {
  contentTypeUid: string;
  referenceFieldPath: string[] | undefined;
  jsonRtePath: string[] | undefined;
};

type GetEntryByUrl = {
  entryUrl: string | undefined;
  contentTypeUid: string;
  referenceFieldPath: string[] | undefined;
  jsonRtePath: string[] | undefined;
};

const { publicRuntimeConfig } = getConfig();
const envConfig = process.env.CONTENTSTACK_API_KEY
  ? process.env
  : publicRuntimeConfig;

let customHostBaseUrl = envConfig.CONTENTSTACK_API_HOST as string;

customHostBaseUrl = customHostBaseUrl? customHostUrl(customHostBaseUrl): '';

// SDK initialization
const Stack = initializeContentStackSdk();

// set host url only for custom host or non prod base url's
if (!!customHostBaseUrl && isValidCustomHostUrl(customHostBaseUrl)) {
  Stack.setHost(customHostBaseUrl);
}

// Setting LP if enabled
ContentstackLivePreview.init({
  //@ts-ignore
  stackSdk: Stack,
  clientUrlParams:{
    host: envConfig.CONTENTSTACK_APP_HOST,
  },
  ssr:false,
})?.catch((err) => console.error(err));

export const { onEntryChange } = ContentstackLivePreview;

const renderOption = {
  span: (node: any, next: any) => next(node.children),
};

/**
 *
 * fetches all the entries from specific content-type
 * @param {* content-type uid} contentTypeUid
 * @param {* reference field name} referenceFieldPath
 * @param {* Json RTE path} jsonRtePath
 *
 */
export const getEntry = ({
  contentTypeUid,
  referenceFieldPath,
  jsonRtePath,
}: GetEntry) => {
  return new Promise((resolve, reject) => {
    const query = Stack.ContentType(contentTypeUid).Query();
    if (referenceFieldPath) query.includeReference(referenceFieldPath);
    query
      .toJSON()
      .find()
      .then(
        (result) => {
          jsonRtePath &&
            Utils.jsonToHTML({
              entry: result,
              paths: jsonRtePath,
              renderOption,
            });
          resolve(result);
        },
        (error) => {
          reject(error);
        }
      );
  });
};

const authtoken = envConfig.CONTENTSTACK_MANAGEMENT_TOKEN;
const apiKey = envConfig.CONTENTSTACK_API_KEY;

export async function uploadAssetToContentstack() {
  try {
    const url = `https://api.contentstack.io/v3/assets`;
    const file = fs.createReadStream("/Users/yash.shinde/Downloads/spidy.png");
    const formData = new FormData();
    formData.append("asset[upload]", file);
    formData.append("asset[description]", "description");
    formData.append("asset[title]", "ironman2");

    const headers = {
      api_key: apiKey,
      authorization: authtoken,
      "Content-Type": "multipart/form-data",
      ...formData.getHeaders()
    };

    const response = await axios.post(url, formData, { headers });

    // console.log("Asset uploaded successfully:", response.data);
    return response.data

    // const contentstackClient = contentstack.client({ authtoken: authtoken });
    // // Prepare the asset object
    // const asset = {
    //   upload: "/Users/yash.shinde/Downloads/Royal Defender Large.jpeg",
    //   title: "ironamn",      
    // };

    // console.log("sasdd",contentstackClient)

    // // Upload the asset to Contentstack
    // const response = await contentstackClient
    //   .stack({ api_key: apiKey })
    //   .asset()
    //   .create(asset);

    // Log the response from Contentstack
    // console.log('Asset created successfully:', response);
  } catch (error) {
    // Handle any errors that occur during the asset upload
    console.error('Error uploading asset:', error);
  }
}

export async function createEntryWithAsset(entryData: UploadRecipeProps) {
  try {
    // const uploadedAsset = await uploadAssetToContentstack(filePath, title);

    //@ts-ignore
    // entryData.recipe_image.uid = uploadedAsset.uid;  // Adjust based on how you reference the asset

    // Now, create the entry with the image attached
    const contentstackClient = contentstack.client({ authtoken: authtoken });
    const response = await contentstackClient
      .stack({ api_key: apiKey })
      .contentType('recipe')  
      .entry()
      .create({ entry: entryData });

    // return response;
  } catch (error) {
    console.error('Error creating entry with asset:', error);
  }
}

/**
 *fetches specific entry from a content-type
 *
 * @param {* content-type uid} contentTypeUid
 * @param {* url for entry to be fetched} entryUrl
 * @param {* reference field name} referenceFieldPath
 * @param {* Json RTE path} jsonRtePath
 * @returns
 */
export const getEntryByUrl = ({
  contentTypeUid,
  entryUrl,
  referenceFieldPath,
  jsonRtePath,
}: GetEntryByUrl) => {
  return new Promise((resolve, reject) => {
    const blogQuery = Stack.ContentType(contentTypeUid).Query();
    if (referenceFieldPath) blogQuery.includeReference(referenceFieldPath);
    blogQuery.toJSON();
    const data = blogQuery.where("url", `${entryUrl}`).find();
    data.then(
      (result) => {
        jsonRtePath &&
          Utils.jsonToHTML({
            entry: result,
            paths: jsonRtePath,
            renderOption,
          });
        resolve(result[0]);
      },
      (error) => {
        console.error(error);
        reject(error);
      }
    );
  });
};

import { BlobServiceClient } from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";
import { serverEnv } from "@/lib/config/server-env";

export const getBlobServiceClient = () => {
  const credential = new DefaultAzureCredential();
  return new BlobServiceClient(serverEnv.STORAGE_ACCOUNT_URL, credential);
};

export const listBlobContainers = async () => {
  const client = getBlobServiceClient();
  const containers: string[] = [];

  for await (const container of client.listContainers()) {
    containers.push(container.name);
  }

  return containers;
};

import { baseUrl } from "api/baseUrl";

export function downloadLink(fileHash: string) {
  return baseUrl + "/files/download/" + fileHash;
}

import { Schema } from "utils/schema";
import { baseUrl } from "./baseUrl";

export interface IClient {
  getSchema(): Promise<Schema>;
  getResources(
    resource: string,
    count: number,
    offset: number
  ): Promise<{ count: number; items: any[] }>;
  getResource(resource: string, key: string): Promise<any>;
  createResource(resource: string, value: any): Promise<string>;
  updateResource(resource: string, key: string, value: any): Promise<boolean>;
  deleteResource(resource: string, key: string): Promise<boolean>;
}

export const client: IClient = {
  getSchema: async function (): Promise<Schema> {
    const resp = await fetch(baseUrl + "/schema", {
      method: "GET",
      credentials: "include",
    });
    return resp.json();
  },
  getResources: async function (
    resource: string,
    count: number = 10,
    offset: number = 0
  ): Promise<{ count: number; items: any[] }> {
    const resp = await fetch(
      baseUrl + "/" + resource + `?count=${count}&offset=${offset}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    return resp.json();
  },
  getResource: async function (resource: string, key: string): Promise<any> {
    const resp = await fetch(baseUrl + "/" + resource + "/" + key, {
      method: "GET",
      credentials: "include",
    });
    return resp.json();
  },
  createResource: async function (
    resource: string,
    value: any
  ): Promise<string> {
    const resp = await fetch(baseUrl + "/" + resource, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(value),
    });
    const [key] = await resp.json();
    return key;
  },
  updateResource: async function (
    resource: string,
    key: string,
    value: any
  ): Promise<boolean> {
    const resp = await fetch(baseUrl + "/" + resource + "/" + key, {
      credentials: "include",
      method: "PUT",
      body: JSON.stringify(value),
    });
    return resp.status === 200;
  },
  deleteResource: async function (
    resource: string,
    key: string
  ): Promise<boolean> {
    const resp = await fetch(baseUrl + "/" + resource + "/" + key, {
      credentials: "include",
      method: "DELETE",
    });
    return resp.status === 200;
  },
};

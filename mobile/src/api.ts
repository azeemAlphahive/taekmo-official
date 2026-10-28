import { API_URL } from "./config";

async function postJson<T>(
  path: string,
  body: Record<string, unknown>,
): Promise<{ ok: boolean; status: number; data: T }> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  let data = {} as T;
  try {
    data = (await res.json()) as T;
  } catch {
    /* ignore */
  }
  return { ok: res.ok, status: res.status, data };
}

export type VerifyPanelResult = {
  status?: "authentic";
  productName?: string;
  model?: string;
  barcode?: string;
  serialNumber?: string;
  productType?: string;
  palletNo?: string;
  category?: string;
  categoryLabel?: string;
  power?: string;
  pmax?: string;
  ff?: string;
  voc?: string;
  isc?: string;
  vpm?: string;
  ipm?: string;
  image?: string;
  imageAlt?: string;
  productHref?: string;
  note?: string;
};

export type VerifyResponse = {
  status?: string;
  message?: string;
  code?: string;
  result?: VerifyPanelResult;
};

export function verifyProduct(code: string) {
  return postJson<VerifyResponse>("/api/verify", { code });
}

export function sendContact(input: {
  name: string;
  email: string;
  message: string;
}) {
  return postJson<{
    message?: string;
    emailSkipped?: boolean;
    emailSent?: boolean;
  }>("/api/contact", input);
}

export function subscribeNewsletter(email: string) {
  return postJson<{
    message?: string;
    alreadySubscribed?: boolean;
    emailSkipped?: boolean;
  }>("/api/newsletter", { email });
}

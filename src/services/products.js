import data from "../Data/mock.json";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export async function getProducts() {
  await delay(500);
  return Array.isArray(data) ? data : [];
}

export async function getProductById(id) {
  await delay(400);
  const list = Array.isArray(data) ? data : [];
  return list.find((p) => String(p.id) === String(id)) || null;
}

export const descopeClient = async (
  path: string,
  method = "GET",
  data?: any,
): Promise<any> => {
  const response = await fetch(`https://api.descope.com/v1/mgmt/${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.DESCOPE_PROJECT_ID}:${process.env.DESCOPE_MANAGEMENT_KEY}`,
    },
    body: data ? JSON.stringify(data) : undefined,
  })
  return await response.json()
}

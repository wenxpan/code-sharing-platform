export const descopeClient = async (
  path: string,
  data = {},
  method = "POST",
) => {
  const response = await fetch(`https://api.descope.com/v1/mgmt/${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.DESCOPE_PROJECT_ID}:${process.env.DESCOPE_MANAGEMENT_KEY}`,
    },
    body: JSON.stringify(data),
  })
  return await response.json()
}

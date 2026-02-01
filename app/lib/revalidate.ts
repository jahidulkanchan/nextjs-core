export const revalidatePathClient = async (path: string) => {
  const res = await fetch('/api/revalidate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ path }),
  })

  if (!res.ok) {
    throw new Error('Revalidation failed')
  }
}

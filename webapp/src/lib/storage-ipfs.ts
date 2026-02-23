export async function pinMarkdownToIpfs(payload: {
  title?: string;
  contentMarkdown: string;
  authorAddress: string;
}) {
  const jwt = process.env.PINATA_JWT;
  if (!jwt) return null;

  try {
    const body = {
      pinataContent: {
        title: payload.title || "Untitled",
        contentMarkdown: payload.contentMarkdown,
        authorAddress: payload.authorAddress.toLowerCase(),
        createdAt: new Date().toISOString(),
      },
      pinataMetadata: {
        name: `vibepost-${Date.now()}`,
      },
    };

    const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.IpfsHash as string;
  } catch {
    return null;
  }
}

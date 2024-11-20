export async function onRequest({ request, env }) {
  const isLocal = request.url === "http://localhost:8788/api/account/register";
  const workerUrl = isLocal
    ? "http://localhost:8787"
    : "https://weightliftr-worker.williamjonescodes.workers.dev";
  const url = `${workerUrl}/api/register`;
  console.log("url", url);

  const requestBody = await request.json();
  const { email, password } = requestBody;

  if (!email || !password) {
    return new Response(
      JSON.stringify({ error: "Missing email or password" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-email": email,
      "x-password": password,
    },
  };

  try {
    const response = await fetch(url, init);
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log("errror", error);
    return new Response(JSON.stringify({ error: "Failed to register user" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

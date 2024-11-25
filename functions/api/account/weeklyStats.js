export async function onRequest(context) {
  console.log(context.request.url);
  const isLocal =
    context.request.url === "http://localhost:8788/api/account/weeklyStats";

  const workerUrl = isLocal
    ? "http://localhost:8787"
    : "https://weightliftr-worker.williamjonescodes.workers.dev";

  const url = `${workerUrl}/api/weekly-stats`;

  const init = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: context.request.headers.get("Authorization"),
    },
  };

  try {
    const response = await fetch(url, init);
    const data = await response.json();
    console.log(data);

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ error: "Failed to get weekly stats" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

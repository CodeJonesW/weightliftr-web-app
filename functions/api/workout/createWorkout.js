export async function onRequest(context) {
  console.log("Creating workout... api", context.request.headers);
  const isLocal =
    context.request.url === "http://localhost:8788/api/workout/createWorkout";

  console.log(context.request.headers.get("Authorization"));

  const workerUrl = isLocal
    ? "http://localhost:8787"
    : "https://tube-script-ai-worker.williamjonescodes.workers.dev";

  const url = `${workerUrl}/api/workout`;

  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: context.request.headers.get("Authorization"),
    },
    body: JSON.stringify({}),
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
    return new Response(JSON.stringify({ error: "Failed to create workout" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

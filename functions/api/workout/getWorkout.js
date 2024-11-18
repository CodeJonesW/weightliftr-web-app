export async function onRequest(context) {
  const isLocal =
    context.request.url === "http://localhost:8788/api/workout/getWorkout";

  const body = await context.request.json();
  const { workout_id } = body;

  const workerUrl = isLocal
    ? "http://localhost:8787"
    : "https://tube-script-ai-worker.williamjonescodes.workers.dev";

  const url = `${workerUrl}/api/workout?workout_id=${workout_id}`;

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
    return new Response(JSON.stringify({ error: "Failed to create workout" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

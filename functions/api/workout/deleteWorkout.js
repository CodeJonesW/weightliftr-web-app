export async function onRequest(context) {
  console.log("Creating workout... api", context.request.headers);
  const isLocal =
    context.request.url === "http://localhost:8788/api/workout/deleteWorkout";

  console.log(context.request.headers.get("Authorization"));
  const body = await context.request.json();
  const { workout_id } = body;

  const workerUrl = isLocal
    ? "http://localhost:8787"
    : "https://weightliftr-worker.williamjonescodes.workers.dev";

  const url = `${workerUrl}/api/workout`;

  const init = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: context.request.headers.get("Authorization"),
    },
    body: JSON.stringify({ workout_id }),
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

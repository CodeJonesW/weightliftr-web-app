export async function onRequest(context) {
  console.log("createExercise.js onRequest", context.request.url);
  const isLocal =
    context.request.url === "http://localhost:8788/api/exercise/createExercise";

  const workerUrl = isLocal
    ? "http://localhost:8787"
    : "https://weightliftr-worker.williamjonescodes.workers.dev";

  const url = `${workerUrl}/api/exercise`;
  const body = await context.request.json();
  const { workout_id, exercise } = body;

  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: context.request.headers.get("Authorization"),
    },
    body: JSON.stringify({
      workout_id,
      exercise,
    }),
  };

  try {
    const response = await fetch(url, init);
    const data = await response.json();
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

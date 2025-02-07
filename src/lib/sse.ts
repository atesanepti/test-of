const makeStream = async (
  fetcher: () => Promise<unknown>
): Promise<ReadableStream<unknown>> => {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        while (true) {
          // Fetch updated match odds & score from the external API
          const events = await fetcher();
          // Send updated data to the client
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(events)}\n\n`)
          );

          await new Promise((resolve) => setTimeout(resolve, 10000));
        }
      } catch {
        controller.close();
      }
    },
  });

  return stream;
};

export default makeStream;

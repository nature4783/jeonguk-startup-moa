export async function GET() {
  return Response.json({ data: [] });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));

  return Response.json({
    data: {
      publicListingId: body.publicListingId,
      added: true,
    },
  });
}

export async function DELETE(request: Request) {
  const body = await request.json().catch(() => ({}));

  return Response.json({
    data: {
      publicListingId: body.publicListingId,
      deleted: true,
    },
  });
}

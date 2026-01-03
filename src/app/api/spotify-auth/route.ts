const client_id = process.env.SPOTIFY_CLIENT_ID;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;


export async function GET(request: Request) {

  const state = crypto.randomUUID();
  const scope = 'user-read-private user-read-email streaming user-read-playback-state user-modify-playback-state';

  // Debug: log what we're reading
  console.log('SPOTIFY_REDIRECT_URI:', redirect_uri);

  return Response.redirect('https://accounts.spotify.com/authorize?' +
    new URLSearchParams({
      response_type: 'code',
      client_id: client_id || '',
      scope: scope,
      redirect_uri: redirect_uri || '',
      state: state || '',
    }).toString(),
  );
}
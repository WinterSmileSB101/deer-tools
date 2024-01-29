import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// import { Server } from 'socket.io';

// const io = new Server(3000);

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/about/:path*',
// };

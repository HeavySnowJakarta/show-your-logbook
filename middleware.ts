import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/applets/recent_qsos')) {
        const response = NextResponse.next();
        
        // Allowed headers for iFrame embedding.
        response.headers.set(
            'Content-Security-Policy',
            "frame-ancestors 'self' *"
        );
        response.headers.set('X-Frame-Options', 'ALLOWALL');
        response.headers.set('Access-Control-Allow-Origin', '*');
        
        return response;
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: '/applets/:path*',
};

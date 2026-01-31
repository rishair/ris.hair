import type { RequestHandler } from './$types';
import { env as privateEnv } from '$env/dynamic/private';

export const GET: RequestHandler = async ({ params, platform, request, fetch, getClientAddress, url }) => {
	const path = params.path;
	// Extract tag from tracker param: 't' -> null, 't-abc' -> 'abc'
	const tag = params.tracker === 't' ? null : params.tracker.slice(2);

	// Use Cloudflare env in production, fall back to SvelteKit env for local dev
	const cfEnv = platform?.env as { RESEND_API_KEY?: string; NOTIFICATION_EMAIL?: string; NOTIFICATION_FROM?: string } | undefined;
	const RESEND_API_KEY = cfEnv?.RESEND_API_KEY || privateEnv.RESEND_API_KEY;
	const NOTIFICATION_EMAIL = cfEnv?.NOTIFICATION_EMAIL || privateEnv.NOTIFICATION_EMAIL;
	const NOTIFICATION_FROM = cfEnv?.NOTIFICATION_FROM || privateEnv.NOTIFICATION_FROM || 'notifications@ris.hair';

	// Send email notification
	if (RESEND_API_KEY && NOTIFICATION_EMAIL) {
		const userAgent = request.headers.get('user-agent') || 'Unknown';
		const referer = request.headers.get('referer') || 'Direct';

		// Get IP address - use SvelteKit's getClientAddress, fallback to headers
		let ip = 'Unknown';
		try {
			ip = getClientAddress();
		} catch {
			ip = request.headers.get('cf-connecting-ip') ||
				request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
				request.headers.get('x-real-ip') ||
				'Unknown';
		}

		// Get Cloudflare geo data if available
		const cf = (platform as { cf?: { country?: string; city?: string; region?: string } } | undefined)?.cf;
		const country = cf?.country || 'Unknown';
		const city = cf?.city || 'Unknown';
		const region = cf?.region || '';

		// Build URLs
		const baseUrl = `${url.protocol}//${url.host}`;
		const resourceUrl = `${baseUrl}/${path}`;

		// Build subject line
		const subject = tag ? `[${tag}] Link opened: ${path}` : `Link opened: ${path}`;

		// Fire and forget - don't block the redirect
		fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${RESEND_API_KEY}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				from: NOTIFICATION_FROM,
				to: NOTIFICATION_EMAIL,
				subject,
				html: `
					<h2>Link Opened</h2>
					${tag ? `<p><strong>Tag:</strong> ${tag}</p>` : ''}
					<p><strong>Path:</strong> <a href="${resourceUrl}">/${path}</a></p>
					<p><strong>IP Address:</strong> ${ip}</p>
					<p><strong>Location:</strong> ${city}${region ? ', ' + region : ''}, ${country}</p>
					<p><strong>Referer:</strong> ${referer}</p>
					<p><strong>User Agent:</strong> ${userAgent}</p>
					<p><strong>Time:</strong> ${new Date().toISOString()}</p>
					<br/>
					<p><a href="${resourceUrl}" style="display:inline-block;padding:10px 20px;background:#006b56;color:white;text-decoration:none;border-radius:4px;">View Resource</a></p>
				`
			})
		}).catch(err => {
			console.error('Failed to send notification:', err);
		});
	}

	// Redirect to the actual resource
	return new Response(null, {
		status: 302,
		headers: { Location: `/${path}` }
	});
};

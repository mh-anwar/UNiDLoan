/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'www.linkedin.com',
				port: '',
				pathname: '**',
			},
		],
	},
};
export default nextConfig;


import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'sans': ['Space Grotesk', 'Inter', 'ui-sans-serif', 'system-ui'],
				'grotesk': ['Space Grotesk', 'sans-serif'],
				'inter': ['Inter', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				verdash: {
					dark: '#0A0E1E',
					white: '#FFFFFF',
					blue: '#1042F6',
					cyan: '#00FFB0',
					coral: '#FF6F1B',
					red: '#FF3871',
					error: '#FF3871',
					success: '#00FFB0',
					info: '#00AEEF',
					divider: '#2A2E42',
					disabled: '#7A7A7A',
					'input-bg': '#161A30',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'verdash-slide-up': {
					from: {
						transform: 'translateY(20px)',
						opacity: '0'
					},
					to: {
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
				'verdash-fade-in': {
					from: { opacity: '0' },
					to: { opacity: '1' }
				},
				'verdash-scale-in': {
					from: {
						opacity: '0',
						transform: 'scale(0.9)'
					},
					to: {
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				'verdash-gradient': {
					'0%': { 'background-position': '0% 50%' },
					'50%': { 'background-position': '100% 50%' },
					'100%': { 'background-position': '0% 50%' }
				},
				'verdash-pulse': {
					'0%, 100%': {
						opacity: '1',
						transform: 'scale(1)'
					},
					'50%': {
						opacity: '0.8',
						transform: 'scale(1.05)'
					}
				},
				'verdash-glow': {
					'0%, 100%': {
						'box-shadow': '0 0 20px rgba(0, 255, 176, 0.3)'
					},
					'50%': {
						'box-shadow': '0 0 30px rgba(0, 255, 176, 0.6), 0 0 50px rgba(16, 66, 246, 0.3)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'verdash-slide-up': 'verdash-slide-up 0.6s ease-out',
				'verdash-fade-in': 'verdash-fade-in 0.4s ease-out',
				'verdash-scale-in': 'verdash-scale-in 0.3s ease-out',
				'verdash-gradient': 'verdash-gradient 3s ease infinite',
				'verdash-pulse': 'verdash-pulse 2s ease-in-out infinite',
				'verdash-glow': 'verdash-glow 2s ease-in-out infinite',
			},
			backgroundImage: {
				'verdash-gradient': 'linear-gradient(135deg, #1042F6 0%, #00FFB0 100%)',
				'verdash-gradient-hover': 'linear-gradient(135deg, #1042F6 0%, #00FFB0 50%, #FF6F1B 100%)',
				'verdash-gradient-negative': 'linear-gradient(135deg, #FF3871 0%, #FF6F1B 100%)',
				'verdash-glass': 'rgba(10, 14, 30, 0.6)',
			},
			backdropBlur: {
				'verdash': '8px',
			},
			boxShadow: {
				'verdash': '0 4px 30px rgba(0, 0, 0, 0.4)',
				'verdash-hover': '0 8px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(16, 66, 246, 0.2)',
				'verdash-glow': '0 0 20px rgba(16, 66, 246, 0.3), 0 0 40px rgba(0, 255, 176, 0.2)',
				'verdash-input': '0 0 0 2px rgba(0, 255, 176, 0.2), 0 0 15px rgba(0, 255, 176, 0.3)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

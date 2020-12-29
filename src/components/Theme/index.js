import {useState, useEffect} from 'react'
import {useTheme} from 'next-themes'

const Theme = () => {
	const [mounted, setMounted] = useState(false)
	const {theme, setTheme} = useTheme()

	// When mounted on client, now we can show the UI
	useEffect(() => {
		const getCurrentTheme = e => {
			setTheme(e.matches ? 'dark' : 'light')
		}
		setTheme(
			window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light',
		)
		setMounted(true)
		window
			.matchMedia('(prefers-color-scheme: dark)')
			.addEventListener('change', getCurrentTheme)
		return window
			.matchMedia('(prefers-color-scheme: dark)')
			.removeEventListener('change', getCurrentTheme)
	}, [])

	if (!mounted) return null
	return (
		<div>
			The current theme is: {theme}
			<button onClick={() => setTheme('light')}>Light Mode</button>
			<button onClick={() => setTheme('dark')}>Dark Mode</button>
		</div>
	)
}

export default Theme

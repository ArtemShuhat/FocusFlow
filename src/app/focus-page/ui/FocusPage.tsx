import { getRandomQuotes } from '../model/get-random-quotes'
import { focusQuotes } from '../model/quotes'
import { QuoteCard } from './QuoteCard'

export function FocusPage() {
	const randomQuotes = getRandomQuotes(focusQuotes, 4)

	const featuredQuote = randomQuotes[0]
	const gridQuotes = randomQuotes.slice(1)

	return (
		<>
			<header className='flex justify-between items-center mx-8 mt-4'>
				<div className='flex items-center gap-2'>
					<img src='/logo.png' alt='logo-FocusFlow' className='w-10 h-10'/>
					<h1 className='font-mono text-2xl font-semibold'>
						<span className='text-white'>Focus</span>Flow
					</h1>
				</div>
				<div className='flex items-center gap-1'>
					<p className='font-menlo font-medium text-sm tracking-widest text-muted'>
						ATTENTION PROTECTED
					</p>
					<div className='h-2 w-2 rounded-full bg-orangeActive' />
				</div>
			</header>
			<main className='mx-auto mt-20 max-w-[1280px] px-8'>
				<section className='grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 items-start'>
					<div className='flex flex-col gap-y-4'>
						<div className='flex gap-3 items-center'>
							<div className='h-2 w-2 rounded-full bg-orangeActive' />
							<p className='font-menlo font-medium text-sm tracking-widest'>
								SITE BLOCKED
							</p>
						</div>

						<p className='font-medium text-7xl text-white'>Stay focused</p>

						<p className='font-normal text-2xl text-muted'>
							Keep doing what you're doing.
						</p>

						<div className='w-12 h-0.5 bg-yellow-500 my-4' />

						<p className='font-normal text-xl text-muted max-w-[420px]'>
							This website is blocked so you can protect your attention and keep
							momentum.
						</p>
					</div>

					{featuredQuote && <QuoteCard quote={featuredQuote} />}
				</section>

				<section className='grid grid-cols-3 gap-6 mt-8'>
					{gridQuotes.map(quote => (
						<QuoteCard key={quote.id} quote={quote} />
					))}
				</section>
			</main>
		</>
	)
}

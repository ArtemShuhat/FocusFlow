import type { FocusQuote } from '../model/quotes'

type QuoteCardProps = {
	quote: FocusQuote
}

export function QuoteCard({ quote }: QuoteCardProps) {
	return (
		<div className='rounded-2xl border border-white/10 p-8 min-h-[260px] flex flex-col justify-between'>
			<div>
				<p className='text-orangeActive text-4xl mb-8'>“</p>
				<p className='text-white text-3xl leading-snug italic font-serif'>
					{quote.text}
				</p>
			</div>

			<p className='mt-10 font-menlo text-sm tracking-widest text-orangeActive uppercase'>
				— {quote.author}
			</p>
		</div>
	)
}
	
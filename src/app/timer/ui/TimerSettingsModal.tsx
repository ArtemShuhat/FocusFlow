import { useId, useState, type SyntheticEvent } from 'react'
import type { TimerSettings } from '../model/types'
import { MINUTE_MS } from '../model/constants'
import { Button } from '@/shared/ui/Button'
import {
	ChevronDown,
	ChevronUp,
	Coffee,
	Crosshair,
	SlidersHorizontal,
	TreePine,
	Volume2,
	X
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

interface TimerSettingsProps {
	isOpen: boolean
	settings: TimerSettings
	onClose: () => void
	onSubmit: (settings: TimerSettings) => Promise<void>
}

export function TimerSettingsModal({
	isOpen,
	settings,
	onClose,
	onSubmit
}: TimerSettingsProps) {
	const titleId = useId()
	const descriptionId = useId()
	const [soundVolume, setSoundVolume] = useState(settings.soundVolume)
	const [focusMinutes, setFocusMinutes] = useState(
		settings.durations.focus / MINUTE_MS
	)
	const [longBreakMinutes, setLongBreakMinutes] = useState(
		settings.durations.longBreak / MINUTE_MS
	)
	const [shortBreakMinutes, setShortBreakMinutes] = useState(
		settings.durations.shortBreak / MINUTE_MS
	)
	const [isSubmitting, setIsSubmitting] = useState(false)

	async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
		event.preventDefault()

		setIsSubmitting(true)

		try {
			await onSubmit({
				soundVolume,
				durations: {
					focus: focusMinutes * MINUTE_MS,
					longBreak: longBreakMinutes * MINUTE_MS,
					shortBreak: shortBreakMinutes * MINUTE_MS
				}
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5 backdrop-blur-[2px]'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.05 }}
				>
					<motion.form
						role='dialog'
						aria-modal='true'
						aria-labelledby={titleId}
						aria-describedby={descriptionId}
						onSubmit={handleSubmit}
						className='relative max-h-[92vh] w-[390px] max-w-full overflow-y-auto rounded-[28px] border border-orangeActive/45 bg-[#171310] px-6 py-7 shadow-[0_24px_70px_rgba(0,0,0,0.65),0_0_36px_rgba(242,166,24,0.12)]'
						initial={{ opacity: 0, y: 6 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 6 }}
						transition={{ duration: 0.05, ease: 'easeOut' }}
					>
						<button
							type='button'
							aria-label='Close timer settings modal'
							onClick={onClose}
							className='absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-muted transition hover:bg-white/5 hover:text-white cursor-pointer'
						>
							<X className='h-6 w-6' />
						</button>

						<div className='mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-orangeActive/35 bg-orangeActive/10 text-orangeActive shadow-[0_0_24px_rgba(242,166,24,0.22)]'>
							<SlidersHorizontal className='h-7 w-7' />
						</div>

						<div className='mt-4 text-center'>
							<h2 id={titleId} className='text-2xl font-bold text-white'>
								Timer settings
							</h2>
							<p id={descriptionId} className='mt-2 text-sm text-muted'>
								Adjust sound and session durations.
							</p>
						</div>

						<section className='mt-6' aria-labelledby='sound-volume-title'>
							<h3
								id='sound-volume-title'
								className='text-base font-semibold text-white'
							>
								Sound volume
							</h3>
							<div className='mt-3 flex items-center gap-4'>
								<Volume2 className='h-6 w-6 shrink-0 text-muted' />
								<input
									aria-label='Sound volume'
									type='range'
									min='0'
									max='100'
									step='1'
									value={soundVolume}
									onChange={event => setSoundVolume(Number(event.target.value))}
									className='h-2 flex-1 cursor-pointer appearance-none rounded-full bg-transparent accent-orangeActive [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-orangeActive [&::-moz-range-thumb]:bg-white [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-thumb]:mt-[-6px] [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-orangeActive [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_0_14px_rgba(242,166,24,0.35)]'
									style={{
										background: `linear-gradient(to right, #f2a618 0%, #f2a618 ${soundVolume}%, rgba(255,255,255,0.16) ${soundVolume}%, rgba(255,255,255,0.16) 100%)`
									}}
								/>
							</div>
							<div className='mt-4 flex items-center justify-between gap-2'>
								<p className='text-sm text-muted'>
									Set the volume for timer alerts and notifications.
								</p>
								<span className='shrink-0 text-sm font-bold text-orangeActive'>
									{soundVolume}%
								</span>
							</div>
						</section>

						<section aria-labelledby='session-durations-title' className='mt-6'>
							<h3
								id='session-durations-title'
								className='text-base font-semibold text-white'
							>
								Session durations
							</h3>
							<p className='text-sm text-muted mt-1'>
								Set how long each part of your session lasts.
							</p>

							<div className='mt-5 space-y-4'>
								<DurationField
									id='focus-duration'
									icon={<Crosshair className='h-5 w-5' />}
									label='Focus time'
									value={focusMinutes}
									onChange={setFocusMinutes}
								/>
								<DurationField
									id='short-break-duration'
									icon={<Coffee className='h-5 w-5' />}
									label='Short break'
									value={shortBreakMinutes}
									onChange={setShortBreakMinutes}
								/>
								<DurationField
									id='long-break-duration'
									icon={<TreePine className='h-5 w-5' />}
									label='Long break'
									value={longBreakMinutes}
									onChange={setLongBreakMinutes}
								/>
							</div>
						</section>

						<div className='mt-7 grid grid-cols-2 gap-4'>
							<Button
								type='button'
								variant='secondary'
								size='md'
								onClick={onClose}
								className='border-white/35 bg-transparent normal-case hover:bg-white/5'
							>
								Cancel
							</Button>
							<Button
								type='submit'
								variant='primary'
								size='md'
								disabled={isSubmitting}
								className='normal-case hover:brightness-95'
							>
								{isSubmitting ? 'Saving...' : 'Save'}
							</Button>
						</div>
					</motion.form>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

interface DurationFieldProps {
	id: string
	icon: React.ReactNode
	label: string
	value: number
	onChange: (value: number) => void
}

function DurationField({
	id,
	icon,
	label,
	value,
	onChange
}: DurationFieldProps) {
	function updateValue(nextValue: number) {
		onChange(Math.min(180, Math.max(0, nextValue)))
	}

	return (
		<div className='flex items-center justify-between gap-4 pb-4 last:border-b-0 last:pb-0'>
			<div className='flex min-w-0 items-center gap-4'>
				<div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-orangeActive/45 bg-orangeActive/10 text-orangeActive'>
					{icon}
				</div>
				<div className='min-w-0'>
					<label htmlFor={id} className='text-base font-medium text-white'>
						{label}
					</label>
				</div>
			</div>

			<div className='flex h-10 w-[110px] shrink-0 items-center rounded-2xl border border-orangeActive/70 bg-black/10 px-3 text-white'>
				<input
					id={id}
					type='number'
					min='0'
					max='180'
					step='1'
					value={value}
					onChange={event => updateValue(Number(event.target.value))}
					className='w-full appearance-none bg-transparent text-lg font-medium outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
				/>
				<span className='mr-2 text-sm text-white/80'>min</span>
				<div className='flex flex-col'>
					<button
						type='button'
						aria-label={`Increase ${label}`}
						onClick={() => updateValue(value + 1)}
						className='text-muted transition hover:text-white cursor-pointer'
					>
						<ChevronUp className='h-4 w-4' />
					</button>
					<button
						type='button'
						aria-label={`Decrease ${label}`}
						onClick={() => updateValue(value - 1)}
						className='text-muted transition hover:text-white cursor-pointer'
					>
						<ChevronDown className='h-4 w-4' />
					</button>
				</div>
			</div>
		</div>
	)
}

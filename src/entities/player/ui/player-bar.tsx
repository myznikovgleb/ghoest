import { usePlayerStore } from '../model'

const PlayerBar = () => {
  const keys = usePlayerStore((state) => state.items.keys)

  return (
    <section className="fixed right-0 top-0 z-10 m-8 flex h-16 w-36 items-center justify-center gap-2 rounded-full bg-black/60">
      <img src="ui/preview_key.png" className="size-12" />
      <span className="text-2xl font-semibold text-white/80">x{keys}</span>
    </section>
  )
}

export { PlayerBar }

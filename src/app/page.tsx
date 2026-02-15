export default function TestPage() {
  return (
    <main className="space-y-8 p-8">
      <h1 className="font-headline text-4xl font-bold">AceAgency Design System Test</h1>
      <section>
        <h2 className="font-subheading mb-4 text-2xl">Brand Colors</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="bg-electric-violet rounded p-4 text-white">Electric Violet</div>
          <div className="bg-burgundy rounded p-4 text-white">Burgundy</div>
          <div className="bg-electric-mint text-brand-black rounded p-4">Electric Mint</div>
          <div className="bg-cobalt-blue rounded p-4 text-white">Cobalt Blue</div>
          <div className="bg-brand-black rounded p-4 text-white">Brand Black</div>
          <div className="bg-brand-grey text-brand-black rounded p-4">Brand Grey</div>
        </div>
      </section>
      <section>
        <h2 className="font-subheading mb-4 text-2xl">Typography</h2>
        <p className="font-headline text-xl">Glacial Indifference (Headlines)</p>
        <p className="font-subheading text-xl">Red Hat Display (Subheadings)</p>
        <p className="font-body text-xl">Poppins (Body Text)</p>
        <p className="font-secondary text-xl">Anton (Secondary Headlines)</p>
      </section>
    </main>
  )
}

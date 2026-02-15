export default function TestPage() {
  return (
    <main className="p-8 space-y-8">
      <h1 className="font-headline text-4xl font-bold">AceAgency Design System Test</h1>
      <section>
        <h2 className="font-subheading text-2xl mb-4">Brand Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-electric-violet text-white p-4 rounded">Electric Violet</div>
          <div className="bg-burgundy text-white p-4 rounded">Burgundy</div>
          <div className="bg-electric-mint text-brand-black p-4 rounded">Electric Mint</div>
          <div className="bg-cobalt-blue text-white p-4 rounded">Cobalt Blue</div>
          <div className="bg-brand-black text-white p-4 rounded">Brand Black</div>
          <div className="bg-brand-grey text-brand-black p-4 rounded">Brand Grey</div>
        </div>
      </section>
      <section>
        <h2 className="font-subheading text-2xl mb-4">Typography</h2>
        <p className="font-headline text-xl">Glacial Indifference (Headlines)</p>
        <p className="font-subheading text-xl">Red Hat Display (Subheadings)</p>
        <p className="font-body text-xl">Poppins (Body Text)</p>
        <p className="font-secondary text-xl">Anton (Secondary Headlines)</p>
      </section>
    </main>
  )
}

import type React from "react"
const About: React.FC = () => {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">About Ndangira</h1>
      <section className="mt-4">
        <h2 className="text-2xl">What We Do</h2>
        <p>We help users report and search for lost documents.</p>
      </section>
      <section className="mt-4">
        <h2 className="text-2xl">How We Help</h2>
        <p>Our platform provides a simple and efficient way to manage lost documents.</p>
      </section>
    </main>
  )
}

export default About

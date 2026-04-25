import { useState } from "react"
import { Link } from "react-router"

const faqItems = [
  {
    question: "Who can join the NextGen Robotics Competition?",
    answer:
      "Students and young innovators can participate through school teams, clubs, or independent groups based on the category requirements.",
  },
  {
    question: "How do we register a team?",
    answer:
      "Go to Teams Zone and use the registration form. Fill in team details, member information, and select the competition category.",
  },
  {
    question: "Can we participate in multiple categories?",
    answer:
      "Yes. A team can register in multiple categories, but each category should have a clear submission and meet all technical rules.",
  },
  {
    question: "Where can we find rules and technical requirements?",
    answer:
      "All regulations are available on the Regulations page, including category-specific details, restrictions, and judging criteria.",
  },
  {
    question: "How are winners selected?",
    answer:
      "Winners are selected by a judging panel and referees based on category scoring systems, technical performance, and innovation quality.",
  },
  {
    question: "How can sponsors or volunteers contact the team?",
    answer:
      "Use the Contact page to reach organizers. You can also apply as a volunteer using the registration link provided there.",
  },
]

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number>(0)

  const toggleItem = (index: number) => {
    setOpenIndex((current) => (current === index ? -1 : index))
  }

  return (
    <section className="min-h-screen bg-slate-50 px-4 pb-16 pt-24 sm:px-6 sm:pt-28">
      <div className="mx-auto max-w-5xl">
        <header className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 px-6 py-8 text-white shadow-lg sm:px-8">
          <p className="text-xs font-semibold tracking-[0.25em] text-blue-100 uppercase">Support Center</p>
          <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">Frequently Asked Questions</h1>
          <p className="mt-3 max-w-3xl text-sm text-blue-100 sm:text-base">
            Quick answers for teams, schools, mentors, and partners preparing for the NextGen Robotics Competition.
          </p>
        </header>

        <div className="mt-8 space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <article key={item.question} className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                >
                  <h2 className="text-base font-semibold text-slate-900 sm:text-lg">{item.question}</h2>
                  <span className="text-xl font-semibold text-blue-600">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && <p className="px-5 pb-5 text-slate-600 sm:px-6 sm:pb-6">{item.answer}</p>}
              </article>
            )
          })}
        </div>

        <div className="mt-10 rounded-2xl border border-blue-100 bg-blue-50 px-6 py-6 text-center">
          <h3 className="text-xl font-semibold text-blue-900">Need more help?</h3>
          <p className="mt-2 text-slate-600">If your question is not listed here, reach out to the organizing team directly.</p>
          <Link
            to="/contact"
            className="mt-4 inline-flex rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Contact Organizers
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FAQ

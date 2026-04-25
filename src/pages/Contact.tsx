const Contact = () => {
  return (
    <section className="min-h-screen bg-slate-50 px-4 pb-16 pt-24 sm:px-6 sm:pt-28">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 px-6 py-10 text-white shadow-lg sm:px-8">
          <p className="text-xs font-semibold tracking-[0.25em] text-blue-100 uppercase">Support</p>
          <h1 className="mt-2 font-display text-3xl font-bold sm:text-5xl">Contact Us</h1>
          <p className="mt-3 max-w-2xl text-sm text-blue-100 sm:text-base">
            We would love to hear from you. Reach out for competition questions, sponsorship, volunteering, or general support.
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold text-slate-800 mb-5">Get in Touch</h2>
            
            <div className="space-y-5">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Email</p>
                <a href="mailto:nextgenazer@gmail.com" className="text-base font-semibold text-blue-600 hover:text-blue-700">nextgenazer@gmail.com</a>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Phone</p>
                <p className="text-base font-semibold text-slate-800">+994 55 718 68 58</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Address</p>
                <p className="text-base font-semibold text-slate-800">Baku, Azerbaijan</p>
              </div>
            </div>

            {/* Volunteer Link */}
            <div className="mt-8 pt-5 border-t border-slate-200">
              <p className="text-sm text-slate-600 mb-3">Want to become a volunteer?</p>
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSd1sDtuykGlYbrVnl3HDxb6VryI7hzCmgc2W2q6LqPfrJ8IbQ/viewform?usp=publish_editor" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold transition hover:bg-blue-700 text-white"
              >
                Volunteer Registration
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold text-slate-800 mb-5">Send us a Message</h2>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Name</label>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Message</label>
                <textarea 
                  placeholder="Your Message" 
                  rows={4}
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none resize-none"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
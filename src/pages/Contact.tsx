const Contact = () => {
  return (
    <section className="min-h-screen bg-white px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mt-10">
          <p className="text-sm font-bold tracking-[0.2em] text-blue-600 uppercase">NextGen Robotics Competition</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-slate-800 sm:text-4xl">Contact Us</h1>
          <p className="mt-3 text-slate-600 max-w-xl mx-auto mb-6">We would love to hear from you! Whether you have questions about the competition, want to become a sponsor, or just want to say hello, feel free to reach out to us.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
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
                className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
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
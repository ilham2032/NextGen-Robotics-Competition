const Contact = () => {
  return (
    <div className="mt-25">
     <h1 className="font-display text-4xl lg:text-5xl font-bold text-blue-600 text-center">Contact Us</h1>
     <div className="flex justify-between mt-26">
      <div className="ml-8">
        <h2 className="font-display text-3xl lg:text-5xl font-bold text-blue-600">Get in Touch</h2>
          <p className="text-slate-600 mt-4 text-sm lg:text-base max-w-2xl">We would love to hear from you! Whether you have questions about the competition, want to become a sponsor, or just want to say hello, feel free to reach out to us.</p>
        <div>
        <h3 className="font-display text-xl lg:text-2xl font-bold text-black pb-8 pt-8">Email: <a href="mailto:info@yourcompany.com">info@yourcompany.com</a></h3>

        <h3 className="font-display text-xl lg:text-2xl font-bold text-black pb-8">Phone: 
          +994 55 718 68 58
        </h3>

        <h3 className="font-display text-xl lg:text-2xl font-bold text-black pb-8">
          Address:
          123 Robotics Ave, Tech City, Azerbaijan
        </h3>
        </div>
      </div>

      <div className="mr-8">
        <h2 className="font-display text-3xl lg:text-5xl font-bold text-blue-600">Send us a Message</h2>
        <div>
          <form action="nextgenazer@gmail.com">
            <input type="text" placeholder="Your Name" className="w-full border border-gray-300 rounded-md p-3 mt-4"/>
            <input type="email" placeholder="Your Email" className="w-full border border-gray-300 rounded-md p-3 mt-4"/>
            <textarea placeholder="Your Message" className="w-full border border-gray-300 rounded-md p-3 mt-4 h-32"></textarea>
            <button type="submit" className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">Send Message</button>
          </form>
        </div>
      </div>

      </div>
      
      <h3 className="text-center font-bold font-display text-black text-3xl lg:text-2xl mt-24">Want to become volunteer in NextGen Robotics Competition? Visit: <a  href='https://docs.google.com/forms/d/e/1FAIpQLSd1sDtuykGlYbrVnl3HDxb6VryI7hzCmgc2W2q6LqPfrJ8IbQ/viewform?usp=publish-editor' className="text-blue-600 hover:underline">Volunteer Page</a></h3>
    </div>
  )
}

export default Contact
import React from 'react'

const About = () => {
    return (
        <div className="md:max-w-[50vw] max-w-[80vw] mx-auto p-4 mb-32">
            <h1 className="md:text-8xl text-5xl font-bold text-center my-8 text-[#222222]">Our Story</h1>
            <p className="text-lg text-wrap text-center font-medium mb-12 mx-4">
                We believe everyone is a creator. Our goal is to help a million people earn from their creativity by 2030.
            </p>
            <div className="text-lg text-gray-700 mb-8">
                <span className='text-[55px] text-black float-left pr-2 leading-none'>W</span>
                <p>
                    hen we started designing Buy Me a Coffee in 2024, our goal was to remove all the complexities and give creators a simple way to get paid and connect with their fans. But simple wasn&apos;t enough. Creators needed a product that was meaningful and enjoyable to use. This meant designing a payment platform that doesn&apos;t feel transactional—starting with the name itself.
                </p>
            </div>
            <p className="text-lg para-start text-gray-700 my-8">
                Where did the idea come from? Our founders, Jijo Sunny and Joseph Sunny, were creators who lived on a moderate advertising income from their creative gigs. Although $500 per month is what you pay for a gym membership in San Francisco, it&apos;s enough to make a living in many parts of the world. If it weren&apos;t for those AdSense checks, there would be no Buy Me a Coffee.
            </p>
            <p className="text-lg text-gray-700 my-8">
                That said, advertising model and algorithms have become too unreliable to pay creators what they&apos;re worth. It is far more reliable to build a direct relationship with the audience. Buy Me a Coffee gives fans a meaningful way to express gratitude to creators. Creators can also offer exclusive content and community access for their biggest fans.
            </p>
            <p className="text-lg text-gray-700 my-8">Sip sip hooray.</p>
            <img width='250' src="https://cdn.buymeacoffee.com/assets/img/homepage/images/bmc-team.png" alt="" />
        </div>
    )
}

export default About

export const metadata = {
    title: 'About - Buy Me a Coffee',
}

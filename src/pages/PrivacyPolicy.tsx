import React from 'react';
import { useTranslation } from 'react-i18next';

const PrivacyPolicy: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-white text-gray-900 py-8 md:py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8 mt-20">{t('Privacy Policy')}</h1>
        <p className="text-xs md:text-sm text-gray-600 mb-6 md:mb-8 text-center">{t('Effective Date')}: April 28, 2026</p>

        <section className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">1. {t('Introduction')}</h2>
          <p className="leading-relaxed text-sm md:text-base">
            NextGen Robotics Competition ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or participate in our robotics competition events.
          </p>
        </section>

        <section className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">2. {t('Information We Collect')}</h2>
          <h3 className="text-lg md:text-xl font-medium mb-2">{t('Personal Information')}</h3>
          <p className="leading-relaxed mb-3 md:mb-4 text-sm md:text-base">
            We may collect personal information such as your name, email address, phone number, and affiliation when you register for the competition, create an account, or contact us.
          </p>
          <h3 className="text-lg md:text-xl font-medium mb-2">{t('Usage Data')}</h3>
          <p className="leading-relaxed text-sm md:text-base">
            We collect information about how you access and use our website, including IP addresses, browser types, pages viewed, and time spent on our site.
          </p>
        </section>

        <section className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">3. {t('How We Use Your Information')}</h2>
          <ul className="list-disc list-inside leading-relaxed text-sm md:text-base">
            <li>To provide and maintain our services</li>
            <li>To communicate with you about the competition</li>
            <li>To process registrations and manage participant accounts</li>
            <li>To improve our website and services</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">4. {t('Information Sharing')}</h2>
          <p className="leading-relaxed text-sm md:text-base">
            We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy or required by law.
          </p>
        </section>

        <section className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">5. {t('Data Security')}</h2>
          <p className="leading-relaxed text-sm md:text-base">
            We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>
        </section>

        <section className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">6. {t('Your Rights')}</h2>
          <p className="leading-relaxed text-sm md:text-base">
            You have the right to access, update, or delete your personal information. Contact us if you wish to exercise these rights.
          </p>
        </section>

        <section className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">7. {t('Changes to This Policy')}</h2>
          <p className="leading-relaxed text-sm md:text-base">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">8. {t('Contact Us')}</h2>
          <p className="leading-relaxed text-sm md:text-base">
            If you have any questions about this Privacy Policy, please contact us at privacy@nextgenrobotics.com.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
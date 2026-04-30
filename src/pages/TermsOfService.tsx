import React from 'react';
import { useTranslation } from 'react-i18next';

const TermsOfService: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-white text-gray-900 py-8 md:py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8 mt-20 text-blue-800">{t('Terms of Service')}</h1>
        <p className="text-xs md:text-sm text-gray-600 mb-6 md:mb-8 text-center">{t('Effective Date')}: April 28, 2026</p>

        <section className="mb-6 md:mb-8 p-4 md:p-6 bg-gray-50 rounded-lg shadow-sm">
          <h2 className="text-lg md:text-2xl font-semibold mb-3 md:mb-4 text-blue-700">1. {t('Acceptance of Terms')}</h2>
          <p className="leading-relaxed text-sm md:text-base">
            By accessing and using the NextGen Robotics Competition website and services, you accept and agree to be bound by the terms and provision of this agreement.
          </p>
        </section>

        <section className="mb-6 md:mb-8 p-4 md:p-6 bg-gray-50 rounded-lg shadow-sm">
          <h2 className="text-lg md:text-2xl font-semibold mb-3 md:mb-4 text-blue-700">2. {t('Description of Service')}</h2>
          <p className="leading-relaxed text-sm md:text-base">
            NextGen Robotics Competition provides an online platform for robotics competition registration, information sharing, and community engagement. Our services include website access, event registration, and related communications.
          </p>
        </section>

        <section className="mb-6 md:mb-8 p-4 md:p-6 bg-gray-50 rounded-lg shadow-sm">
          <h2 className="text-lg md:text-2xl font-semibold mb-3 md:mb-4 text-blue-700">3. {t('User Responsibilities')}</h2>
          <ul className="list-disc list-inside leading-relaxed text-sm md:text-base">
            <li>Provide accurate and complete information during registration</li>
            <li>Maintain the confidentiality of your account credentials</li>
            <li>Comply with all applicable laws and regulations</li>
            <li>Respect the rights of other users and participants</li>
            <li>Use the platform for lawful purposes only</li>
          </ul>
        </section>

        <section className="mb-6 md:mb-8 p-4 md:p-6 bg-gray-50 rounded-lg shadow-sm">
          <h2 className="text-lg md:text-2xl font-semibold mb-3 md:mb-4 text-blue-700">4. {t('Intellectual Property')}</h2>
          <p className="leading-relaxed text-sm md:text-base">
            All content on this website, including text, graphics, logos, and software, is the property of NextGen Robotics Competition or its licensors and is protected by copyright and other intellectual property laws.
          </p>
        </section>

        <section className="mb-6 md:mb-8 p-4 md:p-6 bg-gray-50 rounded-lg shadow-sm">
          <h2 className="text-lg md:text-2xl font-semibold mb-3 md:mb-4 text-blue-700">5. {t('Limitation of Liability')}</h2>
          <p className="leading-relaxed text-sm md:text-base">
            NextGen Robotics Competition shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our services.
          </p>
        </section>

        <section className="mb-6 md:mb-8 p-4 md:p-6 bg-gray-50 rounded-lg shadow-sm">
          <h2 className="text-lg md:text-2xl font-semibold mb-3 md:mb-4 text-blue-700">6. {t('Termination')}</h2>
          <p className="leading-relaxed text-sm md:text-base">
            We reserve the right to terminate or suspend your account and access to our services at our sole discretion, without prior notice, for conduct that we believe violates these terms or is harmful to other users.
          </p>
        </section>

        <section className="mb-6 md:mb-8 p-4 md:p-6 bg-gray-50 rounded-lg shadow-sm">
          <h2 className="text-lg md:text-2xl font-semibold mb-3 md:mb-4 text-blue-700">7. {t('Governing Law')}</h2>
          <p className="leading-relaxed text-sm md:text-base">
            These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which NextGen Robotics Competition operates, without regard to its conflict of law provisions.
          </p>
        </section>

        <section className="p-4 md:p-6 bg-gray-50 rounded-lg shadow-sm">
          <h2 className="text-lg md:text-2xl font-semibold mb-3 md:mb-4 text-blue-700">8. {t('Contact Information')}</h2>
          <p className="leading-relaxed text-sm md:text-base">
            If you have any questions about these Terms of Service, please contact us at legal@nextgenrobotics.com.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;